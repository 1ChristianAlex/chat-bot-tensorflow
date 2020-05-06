/* eslint-disable @typescript-eslint/no-empty-function */
import { resolve } from 'path';
import { Writer } from 'wav';
import { createWriteStream } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

const audioPath = resolve(__dirname, '../audios');

export const writeBlob = async (blob: ArrayBuffer): Promise<string> => {
  return new Promise((res, rej) => {
    const newFilePath = resolve(audioPath, 'audio.webm');

    const readable = createWriteStream(newFilePath);
    readable.write(Buffer.from(blob));

    const fileWriter = new Writer();
    fileWriter.pipe(readable);

    readable.on('ready', function () {
      fileWriter.end();
      return res(newFilePath);
    });
  });
};
