import * as tf from '@tensorflow/tfjs';
import { JsonLoader } from '../utils';
import { WordProcessing } from './index';

export default class TFLearn extends WordProcessing {
  public model: tf.LayersModel;

  constructor() {
    super(JsonLoader.loadIntentsFile(), JsonLoader.loadStopWords());

    this.createNeural();
  }

  private async createNeural() {
    const model = tf.sequential();
    // const input = tf.input({
    //   shape: [this.outputRow.length, this.training.length],
    // });

    const y = tf.layers.dense({
      units: this.outputRow[0].length,
      activation: 'softmax',
      inputShape: [this.training[0].length],
    });

    model.add(y);

    const xTraining = tf.tensor2d(this.training);
    const yTraining = tf.tensor2d(this.outputRow);
    console.log(xTraining);

    model.compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
    });

    await model
      .fit(xTraining, yTraining, {
        batchSize: 10,
        epochs: 1,
      })
      .then(function () {
        console.log('Model loaded');
      });
    this.model = model;

    return this.model;
  }
}
