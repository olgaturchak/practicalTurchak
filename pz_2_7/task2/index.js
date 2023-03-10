const rl = require("readline-sync")
const fs = require("fs");

const PATH_FILE = "capital_country.csv"

const gameData = {
    startTime: null,
    questionsTotal: 0,
    correctAnswers: 0,
    userName: null,
    level: null
};
const levelMap = new Map()

async function game() {
    getLevelLog()
    let gameArr = await readCsv()
    startGame()
    gameArr = shuffleArray(gameArr)
    playGame(gameArr)
    writeFileEveyAttempt()
    writeLevelLog()
}

async function readCsv() {
    try {
        const buffer = fs.readFileSync(PATH_FILE);
        const rows = buffer.toString().split("\n");
        const headers = rows[0].replace("\r", "").split(",");

        const arr = [];
        for (let i = 1; i < rows.length; i++) {
            const splitedRow = rows[i].replace("\r", "").split(",");
            const newObj = {};
            for (let j = 0; j < headers.length; j++) {
                newObj[headers[j]] = splitedRow[j];
            }

            arr.push(newObj);
        }
        return arr;
    } catch (e) {
        console.log(e.message);
    }
}

function playGame(questions) {
    gameData.correctAnswers = 0
    for (let i = 0; i < questions.length; i++) {
        const {question, answer1, answer2, answer3, answer4, correctAnswer, partsWorld} = questions[i]
        const questionText = `${question}? ${answer1} / ${answer2} / ${answer3} / ${answer4}`;
        console.log(questionText)
        switch (partsWorld) {
            case "Європа":
                gameData.level = "Перший рівень"
                levelMap.get("Перший рівень").questions += 1
                console.log("Рівень: перший")
                break
            case "Азія":
                gameData.level = "Другий рівень"
                levelMap.get("Другий рівень").questions += 1
                console.log("Рівень: другий")
                break
            case "Південна Америка":
                gameData.level = "Третій рівень"
                levelMap.get("Третій рівень").questions += 1
                console.log("Рівень: третій")
                break
            case "Африка":
                gameData.level = "Четвертий рівень"
                levelMap.get("Четвертий рівень").questions += 1
                console.log("Рівень: четвертий")
                break
        }
        const answer = getInput()
        if (questions[i]["answer" + answer] === correctAnswer) {
            gameData.correctAnswers++;
            levelMap.get(gameData.level).correct += 1
            console.log("Правильно!");
        } else {
            console.log("Не правильно!");
            gameData.questionsTotal = i + 1
            console.log(`Задано питань: ${gameData.questionsTotal}, правильних відповідей: ${gameData.correctAnswers}!`);
            return
        }
    }
    console.log(`Вітаємо! Ви виграли! Задано питань: ${questions.length}, правильних відповідей: ${gameData.correctAnswers}!`);
}

function getInput(min = 1, max = 4, text = "Введіть число від 1 до 4") {
    console.log(text);
    const number = parseInt(rl.prompt())
    return (number > 0 && number < 5) ? number : getInput()
}

function shuffleArray(arr) {
    for (let i = arr.length; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    return arr
}

function startGame() {
    gameData.startTime = new Date();
    console.log('Гра розпочалася!');
    console.log('Введіть ваше ім\'я:');
    gameData.userName = rl.prompt()

}

function writeFileEveyAttempt() {
    const now = new Date();
    const dateString = now.toLocaleDateString('uk-UA');
    const timeString = now.toLocaleTimeString('uk-UA');
    const logString = `${dateString} ${timeString}, Користувач: ${gameData.userName}, Задано запитань: ${gameData.questionsTotal}, Правильних відповідей: ${gameData.correctAnswers}.\n`;
    fs.appendFile('user.log', logString, (err) => {
        if (err) {
            console.error(`Помилка запису в файл: ${err}`);
        } else {
            console.log('Результат гри збережено в файл user.log');
        }
    });
}

function getLevelLog() {
    const buffer = fs.readFileSync("level.log");
    const strs = buffer.toString().split("\n")
    for (let str of strs) {
        const result = str.match("(.+ рівень).*Задано:(\\d+), Правильних:(\\d+)")
        if (result)
            levelMap.set(result[1], {questions: parseInt(result[2]), correct: parseInt(result[3])})
    }
}

function writeLevelLog() {
    let logString = ""

    for (let key of levelMap.keys()) {
        const level = levelMap.get(key)
        logString += `${key} – Задано:${level.questions}, Правильних:${level.correct},\n`
    }

    fs.writeFile('level.log', logString, (err) => {
        if (err) {
            console.error(`Помилка запису в файл: ${err}`);
        } else {
            console.log('Результат гри збережено в файл level.log');
        }
    });
}

game()



