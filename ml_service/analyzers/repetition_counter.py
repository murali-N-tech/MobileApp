class RepetitionCounter:
    """A class to count repetitions based on the vertical movement of a keypoint."""

    def __init__(self, landmark_index: int, enter_threshold: float, exit_threshold: float):
        self.landmark_index = landmark_index
        self.enter_threshold = enter_threshold
        self.exit_threshold = exit_threshold
        self.count = 0
        self.state = "up"  # Can be 'up' or 'down'

    def update(self, landmarks):
        """Update the counter with the landmarks of a new frame."""
        if landmarks:
            y_coord = landmarks[self.landmark_index].y
            if self.state == "up" and y_coord > self.enter_threshold:
                self.state = "down"
            elif self.state == "down" and y_coord < self.exit_threshold:
                self.state = "up"
                self.count += 1
        return self.count