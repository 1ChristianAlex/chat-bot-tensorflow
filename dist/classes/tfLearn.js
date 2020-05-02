"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(require("@tensorflow/tfjs"));
const utils_1 = require("../utils");
const index_1 = require("./index");
class TFLearn extends index_1.WordProcessing {
    constructor() {
        super(utils_1.JsonLoader.loadIntentsFile(), utils_1.JsonLoader.loadStopWords());
        this.createNeural();
    }
    async createNeural() {
        const input = tf.input({
            shape: [this.outputTraing.length, this.training.length],
        });
        const x = tf.layers
            .reshape({
            targetShape: [this.outputTraing.length * this.training.length],
        })
            .apply(input);
        const y = tf.layers
            .dense({ units: 3, activation: 'softmax' })
            .apply(x);
        const model = tf.model({ inputs: input, outputs: y });
        const xTraining = tf.tensor(this.training);
        const yTraining = tf.tensor(this.outputTraing);
        model.compile({
            optimizer: 'sgd',
            loss: 'meanSquaredError',
        });
        await model.fit(xTraining, yTraining, {
            batchSize: 10,
            epochs: 1,
        });
        this.model = model;
        return this.model;
    }
}
exports.default = TFLearn;
//# sourceMappingURL=tfLearn.js.map