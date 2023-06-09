
const {EventEmitter} = require("events");

class EmitService{
    constructor() {
        this.emmiter = new EventEmitter()
        this.init()
    }

    init() {
        this.emmiter.on("change directory", (changedDirectory) => {
            console.log("Directory is changed", changedDirectory.gray)
        })
        this.emmiter.on("create file", (path, filename) => {
            console.log(`File ${filename.blue} was created by path ${path.red}`)
        })
        this.emmiter.on("create directory", (path, dirname) => {
            console.log(`Directory ${dirname.green} was created by path ${path.red}`)
        })
        this.emmiter.on("delete directory", (path, dirname) => {
            console.log(`Directory ${dirname.green} was deleted. Now you are in path ${path.red}`)
        })
        this.emmiter.on("delete file", (path, filename) => {
            console.log(`File ${filename.blue} was deleted. Now you are in path ${path.red}`)
        })
        this.emmiter.on("rename directory", (path, new_dir_name) => {
            console.log(`Directory was renamed. New name is ${new_dir_name.green}`)
        })
        this.emmiter.on("rename file", (path, new_file_name) => {
            console.log(`File was renamed. New name is ${new_file_name.blue}`)
        })
        this.emmiter.on("show info about file", (path, file_name) => {
            console.log(`Information about file ${file_name.blue} was shown`)
        })
        this.emmiter.on("show files", (path) => {
            console.log(`Directory storage by path ${path.red} was shown`)
        })
        this.emmiter.on("edit file", (path, filename) => {
            console.log(`File ${filename.blue} was edited. Now you are in path ${path.red}`)
        })
    }
}
module.exports = new EmitService()