import { tfLearn, clientBagWords } from '../classes';
import { tensor2d } from '@tensorflow/tfjs';

const tfl = new tfLearn();
const Chat = (mensageInput: string) => {
  const bagInput = clientBagWords(mensageInput, tfl.stemmed);
  const tensorToPreditc = tensor2d(bagInput);
  console.log(tensorToPreditc);
  const predictMl = tfl.model.predict(tensorToPreditc);
  console.log(predictMl);
};

export { Chat };
