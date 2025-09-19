import os
from fastapi import FastAPI, BackgroundTasks, HTTPException, Header
from pydantic import BaseModel, HttpUrl
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Import utilities and analyzers
from utils import video_processing, pose_estimation
from analyzers.squat_analyzer import SquatAnalyzer
from analyzers.jump_analyzer import JumpAnalyzer
from analyzers.sprint_analyzer import SprintAnalyzer

# --- App Initialization ---
app = FastAPI(
    title="Multi-Sport Analysis ML Service",
    description="An API for analyzing athletic performance from video.",
    version="1.0.0"
)

WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")

# --- Pydantic Models for Request/Response ---
class AnalysisRequest(BaseModel):
    video_url: HttpUrl
    sport: str
    webhook_url: HttpUrl
    # Include the webhook_secret for security
    webhook_secret: str

# --- Sport Analyzer Mapping ---
ANALYZER_MAPPING = {
    "squat": SquatAnalyzer,
    "jump": JumpAnalyzer,
    "sprint": SprintAnalyzer,
}

# --- Background Task Definition ---
def run_analysis_and_notify(request: AnalysisRequest):
    """
    This function runs in the background. It downloads the video,
    runs the appropriate analysis, and sends the results to the webhook.
    """
    local_video_path = None
    results = {}
    try:
        # Security check
        if request.webhook_secret != WEBHOOK_SECRET:
            raise PermissionError("Invalid webhook secret provided.")

        # 1. Download video
        local_video_path = video_processing.download_video(str(request.video_url))
        if not local_video_path:
            raise ValueError("Failed to download video from URL.")

        # 2. Extract pose keypoints
        keypoints = pose_estimation.extract_keypoints_from_video(local_video_path)
        if not any(keypoints): # Check if any frame has landmarks
            raise ValueError("Could not detect a person in the video.")

        # 3. Route to the correct analyzer
        analyzer_class = ANALYZER_MAPPING.get(request.sport)
        if not analyzer_class:
            raise ValueError(f"Sport '{request.sport}' is not supported.")

        analyzer_instance = analyzer_class(keypoints)
        results = analyzer_instance.analyze()
        print(f"Analysis complete for sport '{request.sport}'.")

    except Exception as e:
        print(f"ERROR during processing: {e}")
        results = {
            "approved": False,
            "score": 0,
            "feedback": f"An internal error occurred: {e}",
            "metrics": {},
        }
    finally:
        # 4. Post results back to the MERN backend webhook
        try:
            requests.post(str(request.webhook_url), json=results, timeout=15)
            print(f"Successfully posted results to webhook: {request.webhook_url}")
        except requests.exceptions.RequestException as e:
            print(f"CRITICAL: Failed to notify webhook {request.webhook_url}. Error: {e}")

        # 5. Clean up the downloaded video file
        if local_video_path:
            video_processing.cleanup_file(local_video_path)

# --- API Endpoints ---
@app.post("/analyze")
async def analyze_video(request: AnalysisRequest, background_tasks: BackgroundTasks):
    """
    Accepts a video analysis request, adds it to a background task queue,
    and returns an immediate confirmation response.
    """
    background_tasks.add_task(run_analysis_and_notify, request)
    return {"message": "Analysis request received and is being processed."}

@app.get("/health", summary="Health Check")
def health_check():
    """Simple health check endpoint to confirm the service is running."""
    return {"status": "ok", "message": "ML Service is healthy."}