import pytesseract as ocr
from PIL import Image
import io


def getFraseImagem(imageFile):
    phrase = ocr.image_to_string(Image.open(io.BytesIO(imageFile)), lang='por')
    return phrase
