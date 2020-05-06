from googletrans import Translator
import io
import speech_recognition as sr
import wave


def stringToAudio():
    print('aqui')
    microfone = sr.Recognizer()
    with sr.Microphone() as source:
        # Chama a funcao de reducao de ruido disponivel na speech_recognition
        microfone.adjust_for_ambient_noise(source)
        # Avisa ao usuario que esta pronto para ouvir
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
