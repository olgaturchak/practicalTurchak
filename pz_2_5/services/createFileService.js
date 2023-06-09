
const fs = require('fs');
const EventEmitter = require('events');
const UtilService = require("./utilService");
const path = require("path");


class createFileService {

    createFile(currentPath){
        const file_name = UtilService.getInput("Enter new filename: ")
        if(file_name === "") {
            return this.createFile(currentPath)
        }
        fs.writeFileSync(path.resolve(currentPath, file_name), '');
        return file_name
    }
}

module.exports = new createFileService()