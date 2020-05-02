"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natural_1 = require("natural");
class WordProcessing extends natural_1.WordTokenizer {
    constructor(intentsJson, StopWords) {
        super();
        this.intentsJson = intentsJson;
        this.StopWords = StopWords;
        this.words = [];
        this.intents = [];
        this.sents = [];
        this.outputs = [];
        this.stemmed = [];
        this.training = [];
        this.outputTraing = [];
        this.tokenizeIntents();
        this.filterStopWords();
        this.StemmedWords();
        this.bagWordsRender();
    }
    tokenizeIntents() {
        this.intentsJson.intents.forEach((block) => {
            const { tag } = block;
            if (!this.intents.includes(tag)) {
                this.intents.push(tag);
            }
            block.patterns.forEach((pattern) => {
                const tokenizePattens = this.tokenize(pattern);
                this.words = [...new Set([...this.words, ...tokenizePattens])];
                this.sents.push(tokenizePattens);
                this.outputs.push(tag);
            });
        });
    }
    filterStopWords() {
        if (this.words.length > 0) {
            this.words = this.words.filter((word) => !this.StopWords.includes(word));
        }
    }
    StemmedWords() {
        const stemmed = this.words.map((word) => {
            return natural_1.PorterStemmerPt.stem(word).toLowerCase();
        });
        this.stemmed = [...new Set([...this.stemmed, ...stemmed])].sort();
    }
    bagWordsRender() {
        const outputEmpty = Array(this.intents.length);
        for (let index = 0; index < outputEmpty.length; index++) {
            outputEmpty[index] = 0;
        }
        const bag = [];
        this.sents.forEach((sen, index) => {
            const stemmedWordsSents = sen.map((wordItem) => natural_1.PorterStemmerPt.stem(wordItem).toLowerCase());
            this.stemmed.forEach((stemmedWord) => {
                if (stemmedWordsSents.includes(stemmedWord)) {
                    bag.push(1);
                }
                else {
                    bag.push(0);
                }
            });
            const outputRow = [...outputEmpty];
            outputRow[this.intents.indexOf(this.outputs[index])] = 1;
            this.training.push(bag);
            this.outputTraing.push(outputRow);
        });
    }
}
exports.default = WordProcessing;
//# sourceMappingURL=WordProcessing.js.map