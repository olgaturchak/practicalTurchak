
const UtilService = require("./utilService");
const fs = require("fs");
const path = require("path");

class RenameDirectoryService {

    renameDirectory(currentPath) {
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if (stats.isDirectory()) {
                console.log(file.green)
            }
        })
        const old_dir_name = UtilService.getInput("Enter dir name you want to rename: ")
        const new_dir_name = UtilService.getInput("Enter new dir name: ")
        if (fs.existsSync(path.resolve(currentPath, old_dir_name))) {

            const confirm = UtilService.getInput(`Are you sure to rename ${old_dir_name} to ${new_dir_name}?(y/n)`)
            if (confirm === "y") {
                fs.renameSync(path.resolve(currentPath, old_dir_name), path.resolve(currentPath, new_dir_name));
            }
            else{
                return null
            }
        }else {
            console.log("There is no such  directory in that directory")
            return null
        }
        return new_dir_name

    }
}
module.exports = new RenameDirectoryService()