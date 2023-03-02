const UtilService = require("./utilService");
const fs = require("fs");
const path = require("path");

class EditFileService{
    editFile(currentPath){
        const files = UtilService.getAllFilesFromPath(currentPath)
        console.log("Вміст директорії:", currentPath.red)
        files.forEach(file => {
            const stats = fs.statSync(path.resolve(currentPath, file));
            if (stats.isFile()) {
                console.log(file.blue)
            }
        })
        const file_name = UtilService.getInput("Enter file name you want to edit: ")
        if (fs.existsSync(path.resolve(currentPath, file_name))) {
            const confirm = UtilService.getInput(`Are you sure to edit ${file_name}?(y/n)`)
            if (confirm === "y") {
                let isExit = false
                const input = UtilService.getInput("Choose option (add information / replace information / delete information / exit): ")
                switch (input){
                    case "add information":
                        this.addInfoInFile(currentPath, file_name)
                        break
                    case "replace information":
                        this.replaceInfoInFile(currentPath, file_name)
                        break
                    case "delete information":
                        this.deleteInfoInFile(currentPath, file_name)
                        break
                    case "exit":
                        isExit = true
                        break
                    default:
                        break
                }
                if (!isExit) {
                    this.editFile(currentPath)
                }
            }else{
                return null
            }
        } else {
            console.log("There is no such file in that directory")
            return null
        }
        return file_name
    }

    addInfoInFile(currentPath, file_name){
        const added_info = UtilService.getInput("Enter text: ")
        try {
            fs.appendFileSync(path.resolve(currentPath, file_name), added_info);
            console.log('Text was written');
        } catch (err) {
            console.error(err);
        }
    }


    replaceInfoInFile(currentPath, file_name) {
        let fileContent = fs.readFileSync(path.resolve(currentPath, file_name), "utf-8");
        const old_info = UtilService.getInput("Enter text: ")
        const new_info = UtilService.getInput("Enter text: ")

        fileContent = fileContent.replace(old_info, new_info);
        fs.writeFileSync(path.resolve(currentPath, file_name), fileContent);
        console.log('Text was changed.');

    }

    deleteInfoInFile(currentPath, file_name){
        let fileContent = fs.readFileSync(path.resolve(currentPath, file_name), "utf-8");
        const old_info = UtilService.getInput("Enter text: ")

        fileContent = fileContent.replace(old_info, '');
        fs.writeFileSync(path.resolve(currentPath, file_name), fileContent);
        console.log('Text were deleted.');

    }

}
module.exports = new EditFileService()