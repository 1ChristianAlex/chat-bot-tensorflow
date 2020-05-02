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
    console.log([this.outputs.length, this.training.length]);

    const input = tf.input({
      shape: [this.outputs.length, this.training.length],
    });

    const x = tf.layers
      .reshape({ targetShape: [this.outputs.length * this.training.length] })
      .apply(input);
    const y = tf.layers
      .dense({ units: 8, activation: 'softmax' })
      .apply(x) as tf.SymbolicTensor;
    const model = tf.model({ inputs: input, outputs: y });

    const xTraining = tf.tensor(this.training);
    const yTraining = tf.tensor(this.outputs);

    model.compile({
      optimizer: 'sgd',
      loss: 'meanSquaredError',
    });

    await model.fit(xTraining, yTraining, {
      batchSize: 10,
      epochs: 1,
    });

    this.model = model;

    return this.model;
  }
}
