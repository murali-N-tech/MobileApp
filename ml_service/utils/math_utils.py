import numpy as np

def calculate_angle(a, b, c) -> float:
    """
    Calculates the angle between three points (e.g., joints).
    'b' is the vertex of the angle.
    Points a, b, and c should be tuples or lists of (x, y) or (x, y, z).
    """
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.arccos(cosine_angle)

    return np.degrees(angle)