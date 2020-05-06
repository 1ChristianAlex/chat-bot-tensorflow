import argparse
import speech_recognition as sr
import sys
import json

parser = argparse.ArgumentParser()
parser.add_argument('--path', help='foo help')
args = parser.parse_args()


def micReconigi(path):
    microfone = sr.Recognizer()
    audio = sr.WavFile(path)
    with audio as source:
        audioData = microfone.record(source)
        frase = microfone.recognize_google(audioData, language='pt-BR')
        print(frase)


# micReconigi(vars(args)['path'])

micReconigi('F:/Projetos/chatbot-node/backend/src/audios/audio.wav')
