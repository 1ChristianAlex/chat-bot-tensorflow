import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IIntentsJson } from '../Interfaces/IIntents';

const intentsFile = resolve(__dirname, '../data/intents copy.json');
const stopwords = resolve(__dirname, '../data/stopwords.json');

const loadIntentsFile = (): IIntentsJson => {
  const jsonFile: IIntentsJson = JSON.parse(
    readFileSync(intentsFile).toString()
  );
  return jsonFile;
};
const loadStopWords = (): string[] => {
  const jsonFile: string[] = JSON.parse(readFileSync(stopwords).toString());
  return jsonFile;
};

export default { loadIntentsFile, loadStopWords };
