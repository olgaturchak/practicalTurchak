
const UtilService = require("./utilService");
const fs = require("fs");
const path = require("path");

class DeleteDirectoryService {
    deleteDirectory(currentPath) {
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if (stats.isDirectory()) {
                console.log(file.green)
            }
        })
        const dir_name = UtilService.getInput("Enter dir name you want to delete: ")
        if (fs.existsSync(path.resolve(currentPath, dir_name))) {
            const confirm = UtilService.getInput(`Are you sure to delete ${dir_name}?(y/n)`)
            if (confirm === "y") {
                fs.rmdirSync(path.resolve(currentPath, dir_name));
            } else {
                return null
            }
        } else {
            console.log("There is no such  directory in that directory")
            return null
        }
        return dir_name
    }
}

module.exports = new DeleteDirectoryService()