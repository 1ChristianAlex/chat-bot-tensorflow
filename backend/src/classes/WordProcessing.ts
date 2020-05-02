import { IIntentsJson } from 'Interfaces/IIntents';
import { WordTokenizer, PorterStemmerPt } from 'natural';

export default class WordProcessing extends WordTokenizer {
  constructor(private intentsJson: IIntentsJson, private StopWords: string[]) {
    super();
    this.tokenizeIntents();
    this.filterStopWords();
    this.StemmedWords();
    this.bagWordsRender();
  }

  public words: string[] = [];
  public intents: string[] = [];
  public sents = [];
  public outputs: string[] = [];
  public stemmed: string[] = [];

  public training: number[][] = [];
  public outputRow: number[][] = [];

  public tokenizeIntents(): void {
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

  private filterStopWords(): void {
    if (this.words.length > 0) {
      this.words = this.words.filter((word) => !this.StopWords.includes(word));
    }
  }

  private StemmedWords(): void {
    const stemmed = this.words.map((word) => {
      return PorterStemmerPt.stem(word).toLowerCase();
    });
    this.stemmed = [...new Set([...this.stemmed, ...stemmed])].sort();
  }

  private bagWordsRender(): void {
    const outputEmpty = Array(this.intents.length);
    for (let index = 0; index < outputEmpty.length; index++) {
      outputEmpty[index] = 0;
    }

    const bag: number[] = [];
    this.sents.forEach((sen, index) => {
      const stemmedWordsSents: string[] = sen.map((wordItem) =>
        PorterStemmerPt.stem(wordItem).toLowerCase()
      );

      this.stemmed.forEach((stemmedWord) => {
        if (stemmedWordsSents.includes(stemmedWord)) {
          bag.push(1);
        } else {
          bag.push(0);
        }
      });

      const outputRow = [...outputEmpty];
      outputRow[this.intents.indexOf(this.outputs[index])] = 1;

      this.training.push(bag);

      this.outputRow.push(outputRow);
    });
  }
}
