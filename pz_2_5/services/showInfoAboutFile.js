let fs = require("fs");
const UtilService = require("./utilService");
const path = require("path");


class ShowInfoAboutFile {
    showFileInfo(currentPath){
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if(stats.isFile()) {
                console.log(file.blue)
            }
        })
        const file_name = UtilService.getInput("Enter filename: ")

        if (fs.existsSync(path.resolve(currentPath, file_name))) {
            const stats = fs.statSync(path.resolve(currentPath, file_name));
            console.log("Going to get file info!");
            console.log(`File size: ${stats.size} bytes`);
            console.log(`Last modified: ${stats.mtime}`);
            console.log(`Created at: ${stats.birthtime}`);
            console.log(`Is directory: ${stats.isDirectory()}`);
            console.log(`Is file: ${stats.isFile()}`);
        }
        else {
            console.log("There is no such  file in that catalog")
            return null
        }
        return file_name
    }
}

module.exports = new ShowInfoAboutFile()