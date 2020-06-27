from googletrans import Translator
import speech_recognition as sr
import wave


def stringToAudio():
    microfone = sr.Recognizer()
    with sr.Microphone() as source:
        microfone.adjust_for_ambient_noise(source)
        audio = microfone.listen(source)
        frase = microfone.recognize_google(audio, language='pt-BR')
        translator = Translator()
        detect = translator.detect(frase)
        t = translator.translate(
            frase, dest='pt', src=detect.lang)
        print(t)
        return t.pronunciation


def TranslateText(textToTranslate, language):
    translator = Translator()
    detect = translator.detect(textToTranslate)
    t = translator.translate(
        textToTranslate, dest=language, src=detect.lang)
    return t.text
