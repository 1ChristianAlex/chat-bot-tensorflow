from googletrans import Translator
import io
from pydub import AudioSegment


def stringToAudio(blob: bytes):
    # s = io.BytesIO(blob)
    # audio = AudioSegment.from_raw(
    #     s, sample_width, frame_rate, channels).export(filename, format='wav')

    with open('myfile.wav', mode='bx') as f:
        f.write(blob)

    return blob


def TranslateText(textToTranslate, language):
    translator = Translator()
    detect = translator.detect(textToTranslate)
    t = translator.translate(
        textToTranslate, dest=language, src=detect.lang)
    return t.text
