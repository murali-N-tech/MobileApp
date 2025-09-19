import cv2
import mediapipe as mp
import numpy as np

# Import the new Task components
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

def extract_keypoints_from_video(video_path: str) -> list:
    """
    Extracts pose keypoints from a video file using the new MediaPipe Tasks API.

    Args:
        video_path (str): The local path to the video file.

    Returns:
        list: A list of landmark data for each frame where a pose is detected.
    """
    if not video_path:
        return []

    # --- Setup the new PoseLandmarker ---
    # Create a PoseLandmarker object by loading the pre-trained model.
    base_options = python.BaseOptions(model_asset_path='pose_landmarker_heavy.task')
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        output_segmentation_masks=True)
    landmarker = vision.PoseLandmarker.create_from_options(options)
    # --- End of setup ---

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return []
        
    all_frame_landmarks = []

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        # Convert the OpenCV frame (BGR) to RGB, then create a MediaPipe Image object.
        frame_rgb = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
        
        # Process the frame to find pose landmarks.
        detection_result = landmarker.detect(mp_image)
        
        # The result may contain multiple detected poses. We'll take the first one.
        if detection_result.pose_landmarks:
            # Get landmarks for the first detected person in the frame.
            all_frame_landmarks.append(detection_result.pose_landmarks[0]) 
        else:
            all_frame_landmarks.append(None)
            
    cap.release()
    print(f"Extracted keypoints from {len(all_frame_landmarks)} frames.")
    return all_frame_landmarks