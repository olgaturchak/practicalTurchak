
const fs = require("fs")
const readline = require('readline-sync');
const colors = require('colors');
const MenuService = require("./services/menuService")
const UtilService = require("./services/utilService")
const ShowDirectoryService = require("./services/showDirectoryService")
const ChangeDirectoryService = require("./services/changeDirectoryService")
const ShowInfoAboutFile = require("./services/showInfoAboutFile")
const CreateFileService = require("./services/createFileService")
const CreateDirectoryService = require("./services/createDirectoryService")
const ShowFileService = require("./services/showFileService")
const RenameFileService = require("./services/renameFileService")
const RenameDirectoryService = require("./services/renameDirectoryService")
const DeleteFileService = require("./services/deleteFileService")
const DeleteDirectoryService = require("./services/deleteDirectoryService")
const EditFileService = require("./services/editFileService")
const EmitService = require("./services/emitService")

let currentPath = __dirname


function main() {
    console.log("Поточна директорія:", currentPath.red)
    MenuService.printMainMenu()
    const input = UtilService.getInput("Choose option:")
    switch (parseInt(input)) {
        case 1:
            ShowDirectoryService.showDirectoryStorages(currentPath)
            break
        case 2:
            try {
                currentPath = ChangeDirectoryService.changeDirectoryService(currentPath)
                EmitService.emmiter.emit("change directory", currentPath)
            } catch (e) {
                console.log(e.message)
            }
            break
        case 3:
            const file_name = CreateFileService.createFile(currentPath)
            EmitService.emmiter.emit("create file", currentPath, file_name)

            break
        case 4:
            const dir_name = CreateDirectoryService.createDirectory(currentPath)
            EmitService.emmiter.emit("create directory", currentPath, dir_name)
            break
        case 5:
            ShowFileService.showFileStorage(currentPath)
            EmitService.emmiter.emit("show files", currentPath)

            break
        case 6:
            const fil_name = EditFileService.editFile(currentPath)
            if(fil_name !== null) {
                EmitService.emmiter.emit("edit file", currentPath, fil_name)
            }
            break
        case 7:
            const new_file_name = RenameFileService.renameFile(currentPath)
            if(new_file_name !== null) {
                EmitService.emmiter.emit("rename file", currentPath, new_file_name)
            }
            break
        case 8:
            const new_dir_name = RenameDirectoryService.renameDirectory(currentPath)
            if(new_dir_name !== null) {
                EmitService.emmiter.emit("rename directory", currentPath, new_dir_name)
            }
            break
        case 9:
            const del_file = DeleteFileService.deleteFile(currentPath)
            if(del_file !== null){
                EmitService.emmiter.emit("delete file", currentPath, del_file)
            }
            break
        case 10:
            const del_directory = DeleteDirectoryService.deleteDirectory(currentPath)
            if(del_directory !== null) {
                EmitService.emmiter.emit("delete directory", currentPath, del_directory)
            }
            break
        case 11:
            const fl_n = ShowInfoAboutFile.showFileInfo(currentPath)
            if(fl_n !== null) {
                EmitService.emmiter.emit("show info about file", currentPath, fl_n)
            }
            break
        case 12:
            console.log("Goodbye")
            process.exit()
            break
        default:
            main()
    }

    main()
}

main()
