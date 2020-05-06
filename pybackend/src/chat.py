from src.bagClient import bag_of_words
from src.wordPrecess import WordsProcess
import numpy as np
from src.tensor import createNeural
from src.loadJson import getIntents, getStopWords
import random


neuralModel = createNeural()
wordsProce = WordsProcess()
jsonIntent = getIntents()


def chat(text: str):
    bag_usuario = bag_of_words(text, wordsProce.stemmed_words)
    results = neuralModel.predict([bag_usuario])
    if np.max(results) > 0.25 and np.min(results) < 0.20:
        results_index = np.argmax(results)
        tag = wordsProce.intents[results_index]
        resultReposnse = ''
        print(np.max(results))
        print(np.min(results))
        print(results)
        for tg in jsonIntent["intents"]:
            if tg['tag'] == tag:
                resultReposnse = tg['responses']

        return random.choice(resultReposnse)
    else:
        return 'Não entendi'
