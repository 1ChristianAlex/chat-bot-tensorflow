import { IIntentsJson } from 'Interfaces/IIntents';
import { WordTokenizer } from 'natural';
export default class WordProcessing extends WordTokenizer {
    private intentsJson;
    private StopWords;
    constructor(intentsJson: IIntentsJson, StopWords: string[]);
    words: string[];
    intents: string[];
    sents: any[];
    outputs: string[];
    stemmed: string[];
    training: any[];
    outputTraing: any[];
    tokenizeIntents(): void;
    private filterStopWords;
    private StemmedWords;
    private bagWordsRender;
}
