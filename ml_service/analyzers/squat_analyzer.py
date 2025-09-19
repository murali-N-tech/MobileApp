# Import the pose solution to get the landmark definitions
from mediapipe.python.solutions import pose as mp_pose
from .base_analyzer import BaseAnalyzer
from .repetition_counter import RepetitionCounter
from utils.math_utils import calculate_angle

class SquatAnalyzer(BaseAnalyzer):
    """Analyzes squat performance for repetitions and form."""

    def analyze(self) -> dict:
        # Indices for landmarks are now accessed from the imported pose solution
        hip = mp_pose.PoseLandmark.LEFT_HIP.value
        knee = mp_pose.PoseLandmark.LEFT_KNEE.value
        ankle = mp_pose.PoseLandmark.LEFT_ANKLE.value
        shoulder = mp_pose.PoseLandmark.LEFT_SHOULDER.value

        # Initialize repetition counter
        # Thresholds are based on normalized y-coordinates (0.0 top, 1.0 bottom)
        counter = RepetitionCounter(hip, enter_threshold=0.7, exit_threshold=0.6)

        min_knee_angle = 180.0
        max_back_angle = 0.0
        feedback_messages = []

        # landmarks are a list of landmark objects
        for frame_landmarks in self.landmarks:
            counter.update(frame_landmarks)

            # Calculate knee angle for depth
            knee_angle = calculate_angle(
                (frame_landmarks[hip].x, frame_landmarks[hip].y),
                (frame_landmarks[knee].x, frame_landmarks[knee].y),
                (frame_landmarks[ankle].x, frame_landmarks[ankle].y)
            )
            min_knee_angle = min(min_knee_angle, knee_angle)

            # Calculate back angle (hip-shoulder relative to vertical) for posture
            hip_y = frame_landmarks[hip].y
            shoulder_y = frame_landmarks[shoulder].y
            back_angle = abs(hip_y - shoulder_y) * 100 # Simple metric for lean
            max_back_angle = max(max_back_angle, back_angle)


        # Scoring and Feedback Logic
        reps = counter.count
        depth_ok = min_knee_angle < 100 # Good depth is below 100 degrees
        posture_ok = max_back_angle < 25 # Check for excessive forward lean

        if not depth_ok:
            feedback_messages.append("Try to go deeper to reach at least parallel.")
        if not posture_ok:
            feedback_messages.append("Keep your chest up and back straight.")
        if reps == 0:
            feedback_messages.append("No full repetitions were detected.")
        else:
            feedback_messages.append(f"Great work on completing {reps} reps!")

        score = (int(depth_ok) * 50) + (int(posture_ok) * 50)

        return {
            "approved": score >= 75 and reps > 0,
            "score": score,
            "feedback": " ".join(feedback_messages),
            "metrics": {
                "repetitions": reps,
                "min_knee_angle": round(min_knee_angle, 2),
                "max_forward_lean_metric": round(max_back_angle, 2)
            }
        }

