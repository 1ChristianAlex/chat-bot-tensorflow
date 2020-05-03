import json as js


def getIntents():
    with open("F:/Projetos/chatbot-node/pybackend/src/data/intents.json") as file:
        data = js.load(file)
        return data


def getStopWords():
    with open("F:/Projetos/chatbot-node/pybackend/src/data/stopwords.json") as file:
        data = js.load(file)
        return data
