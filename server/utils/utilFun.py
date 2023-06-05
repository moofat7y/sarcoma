import sys
import numpy as np
from io import BytesIO
from PIL import Image
import cv2
from keras.applications.nasnet import preprocess_input

def read_file_as_image(data) -> np.ndarray:
    img = np.array(Image.open(BytesIO(data)))

    # img = cv2.imread(image)
    img = cv2.resize(img, (96, 96))
    img = preprocess_input(img)
    img = np.expand_dims(img, axis=0)
    return img


sys.modules[read_file_as_image]= {read_file_as_image}