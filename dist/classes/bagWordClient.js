"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = require("natural");
const clientBagWords = (toTokenize, words) => {
    const bag = Array(words.length);
    for (let index = 0; index < bag.length; index++) {
        bag[index] = 0;
    }
    const tokenizer = new natural_1.WordTokenizer();
    const wordsTokenizer = tokenizer.tokenize(toTokenize);
    const wordsStemmed = wordsTokenizer.map((words) => natural_1.PorterStemmerPt.stem(words.toLowerCase()));
    wordsStemmed.forEach((stemmed) => {
        words.forEach((word, i) => {
            if (stemmed === word) {
                bag[i] = 1;
            }
        });
    });
    return Array.from(bag);
};
exports.default = { clientBagWords };
//# sourceMappingURL=bagWordClient.js.map