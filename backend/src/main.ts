import { createInterface } from 'readline';
import { tfLearn } from './classes/';
import app from './server/socket.io';

// const tfl = new tfLearn();

// const neural = tfl.model.predict;

const readLine = (textMensage: string): Promise<string> => {
  const commandInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    commandInterface.question(textMensage, (input) => {
      resolve(input);
      commandInterface.close();
    });
  });
};

app();
