import * as tf from '@tensorflow/tfjs';
import { JsonLoader } from '../utils';
import { WordProcessing } from './index';
export default class TFLearn extends WordProcessing {
  constructor() {
    super(JsonLoader.loadIntentsFile(), JsonLoader.loadStopWords());
    this.createNeural();
  }
  private model: tf.Sequential;
  private loadModel = false;

  public async createNeural(): Promise<tf.Sequential> {
    if (this.loadModel === false) {
      const input = tf.layers.dense({
        units: 1,
        inputShape: [this.training[0].length],
      });

      const layers = 1;

      const output = tf.layers.dense({
        units: this.outputRow[0].length,
        activation: 'softmax',
      });

      const model = tf.sequential();

      model.add(input);
      for (let index = 0; index < layers; index++) {
        model.add(
          tf.layers.dense({
            units: 16,
          })
        );
      }
      model.add(output);

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
        epochs: 100,
      });

      this.model = model;
      this.loadModel = true;
      console.log('Model Loaded');
      return model;
    }

    return this.model;
  }
}
