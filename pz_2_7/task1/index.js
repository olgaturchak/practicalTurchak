const rl = require("readline-sync")
const fs = require("fs");
const path = require("path");

readCsv()

function readCsv() {
    new Promise(async (resolve, reject) => {
        console.log("Enter file name:")
        const pathFile = rl.prompt()
        resolve(pathFile)
    })
        .then((pathFile) => {
            console.log(pathFile)
            if (!fs.existsSync(pathFile)) {
                throw Error("There is not correct path")
            }
            if (path.parse(pathFile).ext !== ".csv") {
                throw Error("There is not .csv file")
            }

            return pathFile
        })
        .then((pathFile) => {
            const buffer = fs.readFileSync(pathFile);
            const rows = buffer.toString().split("\n")
            const headers = rows[0]
                .replaceAll(" ", "")
                .replace("\r", "")
                .split(",")

            const arr = []
            for (let i = 1; i < rows.length; i++) {
                const splitedRow = rows[i]
                    .replaceAll(" ", "")
                    .replace("\r", "")
                    .split(",")
                const newObj = {}
                for (let j = 0; j < headers.length; j++) {
                    newObj[headers[j]] = splitedRow[j]
                }

                arr.push(newObj)
            }
            return arr

        })
        .then((arr) => {
            fs.writeFileSync("arr.js", `const arr = ${JSON.stringify(arr)}`)
        })
        .catch((e) => {
            console.log(e.message)
            console.log("Do you want to try again?(y/n)")
            const answer = rl.prompt()
            if (answer === "y") {
                readCsv()
            }
        })


}

