from googletrans import Translator
import io
from pydub import AudioSegment


def stringToAudio(blob: bytes):
    with open('myfile.wav') as f:
        f.write(blob)

    return blob


def TranslateText(textToTranslate, language):
    translator = Translator()
    detect = translator.detect(textToTranslate)
    t = translator.translate(
        textToTranslate, dest=language, src=detect.lang)
    return t.text
