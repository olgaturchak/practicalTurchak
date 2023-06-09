
const UtilService = require("./utilService");
const fs = require("fs");
const path = require("path");

class DeleteFileService{
    deleteFile(currentPath) {
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if (stats.isFile()) {
                console.log(file.blue)
            }
        })
        const file_name = UtilService.getInput("Enter file name you want to delete: ")
        if (fs.existsSync(path.resolve(currentPath, file_name))) {
            const confirm = UtilService.getInput(`Are you sure to delete ${file_name}?(y/n)`)
            if (confirm === "y") {
                fs.unlink(path.resolve(currentPath, file_name), function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            }else {
                return null
            }
        } else {
            console.log("There is no such file in that directory")
            return null
        }
        return file_name
    }
}
module.exports = new DeleteFileService()