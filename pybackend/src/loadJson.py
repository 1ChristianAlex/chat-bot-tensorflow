import json as js


def getIntents():
    with open("F:/Projetos/chatbot-node/pybackend/src/data/intents-servete.json") as file:
        data = js.load(file)
        return data


def getStopWords():
    with open("F:/Projetos/chatbot-node/pybackend/src/data/stopwords.json") as file:
        data = js.load(file)
        return data
