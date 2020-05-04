import json as js
import io


def getIntents():
    with io.open("F:/Projetos/chatbot-node/pybackend/src/data/intents-servete.json", mode="r", encoding="utf-8") as file:

        data = js.load(file)
        return data


def getStopWords():
    with io.open("F:/Projetos/chatbot-node/pybackend/src/data/intents-servete.json", mode="r", encoding="utf-8") as file:

        data = js.load(file)
        return data
