import numpy as np
from nltk.stem.rslp import RSLPStemmer
import nltk
import unicodedata
nltk.download('rslp')
# ingles
nltk.download('punkt')


def bag_of_words(s, words):
    stemer = RSLPStemmer()

    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return np.array(bag)
