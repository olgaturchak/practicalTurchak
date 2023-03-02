const fs = require("fs")
const UtilService = require("./utilService");
const path = require("path");

class RenameFileService {
    renameFile(currentPath) {
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if (stats.isFile()) {
                console.log(file.blue)
            }
        })
        const old_file_name = UtilService.getInput("Enter file name you want to rename: ")
        const new_file_name = UtilService.getInput("Enter new file name: ")
        if (fs.existsSync(path.resolve(currentPath, old_file_name))) {

            const confirm = UtilService.getInput(`Are you sure to rename ${old_file_name} to ${new_file_name}?(y/n)`)
            if (confirm === "y") {
                fs.renameSync(path.resolve(currentPath, old_file_name), path.resolve(currentPath, new_file_name));
            }else{
                return null
            }
        } else {
            console.log("There is no such  file in that catalog")
            return null
        }
        return new_file_name
    }

}

module.exports = new RenameFileService()