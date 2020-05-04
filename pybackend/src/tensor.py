import tflearn as tfl
import tensorflow as tf
from src.wordPrecess import WordsProcess
import numpy as np


def createNeural():
    wordsProcess = WordsProcess()
    # reiniciando os dados
    tf.reset_default_graph()
    xtraining = np.array(wordsProcess.training)
    yTraining = np.array(wordsProcess.outputRow)
    # camada de entrada
    net = tfl.input_data(shape=[None, len(xtraining[0])])
    # oito neuronios por camada oculta
    net = tfl.fully_connected(net, 30)
    # camada de saida
    net = tfl.fully_connected(
        net, len(yTraining[0]), activation="softmax")
    #
    net = tfl.regression(net)

    # criando o modelo
    model = tfl.DNN(net)
    model.fit(xtraining, yTraining, n_epoch=30,
              batch_size=10, show_metric=True)
    return model
