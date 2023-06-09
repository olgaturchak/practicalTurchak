
const fs = require("fs");
const path = require("path");
const UtilService = require("./utilService")

class ShowDirectoryService {
    showDirectoryStorages(currentPath) {
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if(stats.isFile()) {
                console.log(file.blue)
            } else {
                console.log(file.green)
            }
        })
    }
}
module.exports = new ShowDirectoryService()