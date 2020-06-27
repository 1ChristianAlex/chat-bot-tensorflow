import tflearn as tfl
from src.wordPrecess import WordsProcess
import numpy as np


def createNeural():
    wordsProcess = WordsProcess()
    xtraining = np.array(wordsProcess.training)
    yTraining = np.array(wordsProcess.outputRow)
    net = tfl.input_data(shape=[None, len(xtraining[0])])
    net = tfl.fully_connected(net, 30)
    net = tfl.fully_connected(
        net, len(yTraining[0]), activation="softmax")
    net = tfl.regression(net)

    model = tfl.DNN(net)
    model.fit(xtraining, yTraining, n_epoch=30,
              batch_size=10, show_metric=True)
    return model
