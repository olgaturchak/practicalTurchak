
const readline = require("readline-sync");
const fs = require("fs");

class UtilService {
    getInput(text) {
        const input = readline.question(text)
        return input
    }

    getAllFilesFromPath(currentPath) {
        const files = fs.readdirSync(currentPath);
        return files
    }
}

module.exports = new UtilService()