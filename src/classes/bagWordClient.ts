import { WordTokenizer, PorterStemmerPt } from 'natural';

const clientBagWords = (toTokenize: string, words: string[]) => {
  const bag = Array(words.length);
  for (let index = 0; index < bag.length; index++) {
    bag[index] = 0;
  }
  const tokenizer = new WordTokenizer();

  const wordsTokenizer = tokenizer.tokenize(toTokenize);
  const wordsStemmed = wordsTokenizer.map((words) =>
    PorterStemmerPt.stem(words.toLowerCase())
  );

  wordsStemmed.forEach((stemmed) => {
    words.forEach((word, i) => {
      if (stemmed === word) {
        bag[i] = 1;
      }
    });
  });

  return Array.from(bag);
};

export default { clientBagWords };
