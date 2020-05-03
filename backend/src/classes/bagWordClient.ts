import { WordTokenizer, PorterStemmerPt } from 'natural';

const clientBagWords = (toTokenize: string, words: string[]): number[][] => {
  const tokenize = new WordTokenizer();
  const outputEmpty = Array(words.length);
  for (let index = 0; index < outputEmpty.length; index++) {
    outputEmpty[index] = 0;
  }
  const sWords = tokenize.tokenize(toTokenize);

  const stmed = sWords.map((w) => PorterStemmerPt.stem(w));

  stmed.forEach((se) => {
    words.forEach((w, i) => {
      if (se === w) {
        outputEmpty[i] = 1;
      }
    });
  });

  const bag = Array.from([outputEmpty]);

  console.log(stmed);
  return bag;
};

export { clientBagWords };
