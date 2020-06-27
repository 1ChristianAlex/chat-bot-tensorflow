import { WordTokenizer, PorterStemmerPt } from 'natural';

const clientBagWords = (toTokenize: string, words: string[]): number[][] => {
  const tokenize = new WordTokenizer();

  const bag = Array(words.length);

  for (let index = 0; index < bag.length; index++) {
    bag[index] = 0;
  }
  const sWords = tokenize.tokenize(toTokenize);

  const stmed = [
    ...new Set([...sWords.map((w) => PorterStemmerPt.stem(w.toLowerCase()))]),
  ].sort();

  stmed.forEach((se) => {
    words.forEach((w, i) => {
      if (se === w) {
        bag[i] = 1;
      }
    });
  });

  return [bag];
};

export { clientBagWords };
