
let fs = require("fs");
const UtilService = require("./utilService");
const path = require("path");

class ShowFileService{
    showFileStorage(currentPath){
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if(stats.isFile()) {
                console.log(file.blue)
            }
        })
        const file_name = UtilService.getInput("Enter file name you want to open: ")
        if (fs.existsSync(path.resolve(currentPath, file_name))) {
            console.log("Going to open file!");
            try {
                const data = fs.readFileSync(path.resolve(currentPath, file_name), 'utf8');
                console.log(data.yellow);
            }catch (err){
                console.error("err")
            }
            console.log("opened File successfully!");
        }
        else {
            console.log("There is no such  file in that catalog")
        }
    }
}
module.exports = new ShowFileService()