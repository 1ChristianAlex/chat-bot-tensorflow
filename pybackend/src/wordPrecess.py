from src.loadJson import getIntents, getStopWords
from nltk.stem.rslp import RSLPStemmer
import nltk
nltk.download('rslp')
# ingles
nltk.download('punkt')


class WordsProcess:

    words = []
    intents = []
    sents = []
    outputs = []
    stemmed_words = []
    training = []
    outputRow = []
    data = getIntents()
    stopWords = getStopWords()

    def __init__(self):
        self.loadIntents()
        self.loadStopWords()
        self.loadStemmedWords()
        self.loadBag()

    def loadIntents(self):
        for intent in self.data["intents"]:

            tag = intent['tag']

            if tag not in self.intents:
                self.intents.append(tag)

                for pattern in intent["patterns"]:
                    wrds = nltk.word_tokenize(pattern, language='portuguese')
                    self.words.extend(wrds)
                    self.sents.append(wrds)
                    self.outputs.append(tag)

    def loadStopWords(self):
        self.words = [
            pAntiga for pAntiga in self.words if pAntiga not in self.stopWords]

    def loadStemmedWords(self):
        stemer = RSLPStemmer()
        self.stemmed_words = [stemer.stem(w.lower()) for w in self.words]
        self.stemmed_words = sorted(list(set(self.stemmed_words)))

    def loadBag(self):
        stemer = RSLPStemmer()

        outputEmpty = [0 for _ in range(len(self.intents))]

        for x, frase in enumerate(self.sents):

            bag = []
            wds = [stemer.stem(k.lower()) for k in frase]
            for w in self.stemmed_words:
                if w in wds:
                    bag.append(1)
                else:
                    bag.append(0)

            outputRow = outputEmpty[:]
            outputRow[self.intents.index(self.outputs[x])] = 1

            self.training.append(bag)
            self.outputRow.append(outputRow)
