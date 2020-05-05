import { writeFile } from 'fs';
import { resolve } from 'path';

const audioPath = resolve(__dirname, '../audios');

export const writeBlob = async (blob: ArrayBuffer) => {
  writeFile(resolve(audioPath, 'audio.wav'), Buffer.from(blob), (err) => {
    console.log(err);
  });
};
