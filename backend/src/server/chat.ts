import { tfLearn, clientBagWords } from '../classes';
import { tensor2d, Tensor, tensor } from '@tensorflow/tfjs';

const tfl = new tfLearn();
const Chat = async (mensageInput: string) => {
  return new Promise(async (res, rej) => {
    const model = await tfl.createNeural();
    const bagInput = clientBagWords(mensageInput, tfl.stemmed);

    const tensorToPreditc = tensor2d(bagInput, [
      bagInput.length,
      bagInput[0].length,
    ]);

    const predictMl = model.predict(tensorToPreditc) as Tensor;

    const arrayRes = predictMl.dataSync();
    let max = 0;
    let indexMax = 0;
    Array.from(arrayRes).forEach((item, index) => {
      if (item > max) {
        max = item;
        indexMax = index;
      }
    });

    const tag = tfl.intents[indexMax];

    tfl.intentsJson.intents.map((inte) => {
      if (inte.tag === tag) {
        const respo =
          inte.responses[
            Math.floor(Math.random() * (inte.responses.length - 0))
          ];
        res(respo);
      }
    });
  });
};

export { Chat };
