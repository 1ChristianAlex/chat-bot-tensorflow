"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const intentsFile = path_1.resolve(__dirname, '../data/intents.json');
const stopwords = path_1.resolve(__dirname, '../data/stopwords.json');
const loadIntentsFile = () => {
    const jsonFile = JSON.parse(fs_1.readFileSync(intentsFile).toString());
    return jsonFile;
};
const loadStopWords = () => {
    const jsonFile = JSON.parse(fs_1.readFileSync(stopwords).toString());
    return jsonFile;
};
exports.default = { loadIntentsFile, loadStopWords };
//# sourceMappingURL=JsonLoader.js.map