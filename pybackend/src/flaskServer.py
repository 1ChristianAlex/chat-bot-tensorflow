from flask import Flask, request
from flask_cors import CORS
from src.chat import chat
from src.googleTranslate import stringToAudio
import json

app = Flask(__name__)
CORS(app)


@app.route("/mensage", methods=['POST'])
def postMensage():
    return json.dumps({'data': chat(request.form['mensage'])})


@app.route("/start-audio", methods=['POST'])
def postAudioStart():
    if request.form['mensage']:
        audioSpeach = stringToAudio()

    return json.dumps({'data': chat(audioSpeach), 'pergunta': audioSpeach})


# @app.route("/audio", methods=['POST'])
# def postAudio():

#     audio = request.files['audio'].read()
#     audioSpeach = stringToAudio(audio)
#     textRes = chat(audioSpeach)
#     return json.dumps({'data': 'textRes'})


HOST = 'localhost'
PORT = 5555
