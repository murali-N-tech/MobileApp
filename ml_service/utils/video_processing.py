import os
import uuid
import requests

def download_video(url: str, download_folder: str = "temp_videos") -> str | None:
    """
    Downloads a video from a given URL to a local temporary file.
    Returns the local file path of the downloaded video.
    """
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()

        unique_filename = f"{uuid.uuid4()}.mp4"
        local_filepath = os.path.join(download_folder, unique_filename)

        with open(local_filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        print(f"Video downloaded successfully to {local_filepath}")
        return local_filepath
    except requests.exceptions.RequestException as e:
        print(f"Error downloading video: {e}")
        return None

def cleanup_file(filepath: str):
    """Deletes the specified file from the filesystem."""
    if filepath and os.path.exists(filepath):
        os.remove(filepath)
        print(f"Cleaned up temporary file: {filepath}")