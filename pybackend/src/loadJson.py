from src.webscrapping import saveProductListIntents
import json as js
import io
import os

dir = os.path.dirname(__file__)
intents = os.path.join(dir, 'data/intents-servete.json')


def getIntents():
    saveProductListIntents()
    with io.open(intents, mode="r", encoding="utf-8") as file:

        data = js.load(file)
        return data


def getStopWords():
    with io.open(intents, mode="r", encoding="utf-8") as file:

        data = js.load(file)
        return data
