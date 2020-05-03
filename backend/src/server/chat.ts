import { tfLearn, clientBagWords } from '../classes';
import { tensor2d } from '@tensorflow/tfjs';

const tfl = new tfLearn();
const Chat = (mensageInput: string) => {
  const bagInput = clientBagWords(mensageInput, tfl.stemmed);
  const predictMl = tfl.model.predict(tensor2d(bagInput));

  console.log(predictMl);
};

export { Chat };
