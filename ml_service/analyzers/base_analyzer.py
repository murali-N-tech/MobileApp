from abc import ABC, abstractmethod

class BaseAnalyzer(ABC):
    """Abstract base class for all sport analyzers."""

    def __init__(self, keypoints_data: list):
        if not keypoints_data:
            raise ValueError("Keypoints data cannot be empty.")
        self.keypoints_data = keypoints_data
        # The new API returns the list of landmarks directly, so we filter out None values
        self.landmarks = [lm for lm in keypoints_data if lm]

    @abstractmethod
    def analyze(self) -> dict:
        """
        Main analysis method to be implemented by each specific sport analyzer.
        Should return a dictionary with the analysis results.
        """
        pass
