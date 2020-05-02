"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const classes_1 = require("./classes/");
const tfl = new classes_1.tfLearn();
const readLine = (textMensage) => {
    const commandInterface = readline_1.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, reject) => {
        commandInterface.question(textMensage, (input) => {
            resolve(input);
            commandInterface.close();
        });
    });
};
//# sourceMappingURL=main.js.map