const UtilService = require("./utilService")
const fs = require("fs");
const path = require("path");


class ChangeDirectoryService {
    changeDirectoryService(currentPath) {
        console.log("Поточна директорія:", currentPath.red)
        let isExit = false
        this.showDirectories(currentPath)
        const input = UtilService.getInput("Choose options(back, directoryName, exit):")
        switch (input) {
            case "back":
                try {
                    currentPath = path.dirname(currentPath)
                } catch (e) {
                    console.log("End of the path")
                }
                break;
            case "exit":
                isExit = true
                break
        }

        if(fs.existsSync(path.resolve(currentPath, input))) {
            currentPath = path.resolve(currentPath, input)
        }

        if (!isExit) {
            currentPath = this.changeDirectoryService(currentPath)
        }
            return currentPath

    }

    showDirectories(currentPath) {
        const files = UtilService.getAllFilesFromPath(currentPath);

        files.forEach((file) => {
            const stats = fs.statSync(path.resolve(currentPath, file))
            if (stats.isDirectory()) {
                console.log(file.green)
            }
        })
    }
}

module.exports = new ChangeDirectoryService()