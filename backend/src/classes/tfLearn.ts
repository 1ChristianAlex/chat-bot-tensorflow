import * as tf from '@tensorflow/tfjs';
import { JsonLoader } from '../utils';
import { WordProcessing } from './index';

export default class TFLearn extends WordProcessing {
  constructor() {
    super(JsonLoader.loadIntentsFile(), JsonLoader.loadStopWords());
  }

  public async createNeural(): Promise<tf.Sequential> {
    const input = tf.layers.dense({
      units: 90,
      useBias: true,
      inputShape: [this.training[0].length],
    });

    const output = tf.layers.dense({
      units: this.outputRow[0].length,
      activation: 'softmax',
      useBias: true,
    });

    const model = tf.sequential();

    model.add(input);
    model.add(output);
    model.add(
      tf.layers.dense({
        units: this.outputRow[0].length,
        activation: 'linear',
        useBias: true,
      })
    );

    const xTraining = tf.tensor2d(this.training, [
      this.training.length,
      this.training[0].length,
    ]);
    const yTraining = tf.tensor2d(this.outputRow);

    model.compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
    });

    // await model.fit(xTraining, yTraining, {
    //   batchSize: 8,
    //   epochs: 30,
    // });
    await model.fit(xTraining, yTraining, {
      batchSize: 10,
      epochs: 50,
    });

    return model;
  }
}
