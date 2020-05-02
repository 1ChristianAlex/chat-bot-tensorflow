export interface IIntentsJson {
    intents: [{
        tag: string;
        patterns: string[];
        responses: string[];
        context_set: string;
    }];
}
