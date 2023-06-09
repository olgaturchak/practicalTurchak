
let fs = require("fs");
const UtilService = require("./utilService");
const path = require("path");
class CreateDirectoryService {
    createDirectory(currentPath){
        const dir_name = UtilService.getInput("Enter new directory name: ")
        if (dir_name === ""){
            return this.createDirectory(currentPath)
        }
        fs.mkdirSync(path.resolve(currentPath, dir_name));
        return dir_name
    }
}
module.exports = new CreateDirectoryService()