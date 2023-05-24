const querystring = require('querystring');
const fs = require("fs");

class PagesController{
    async login(req, res, next) {
        res.render("login")
    }

    async test(req, res, next){

        const testQuestions = JSON.parse(fs.readFileSync('./data/test.json', 'utf8'));
        console.log(req.body)
        const name = req.body.username
        const surname = req.body.userSurname
        res.render('test', {questions: testQuestions, name:name, surname:surname})

    }
    async result(req, res, next) {
        const testQuestions = JSON.parse(fs.readFileSync('./data/test.json', 'utf8'));

        const name = req.body.name;
        const surname = req.body.surname;

        const obj = req.body;
        const userAnswers = Object.values(obj);
        console.log(userAnswers);
        let count = 0
        for (let i = 0; i < testQuestions.length; i++) {
            if(testQuestions[i].correct === userAnswers[i]){
                count++
            }

        }
        console.log(count)

        res.render("result", {results : testQuestions, answers: userAnswers, count: count, name, surname})
    }

    async saveResultsMiddleware(req, res, next) {
        console.log(1)
        const testQuestions = JSON.parse(fs.readFileSync('./data/test.json', 'utf8'));

        const name = req.body.name;
        const surname = req.body.surname;
        const count = req.body.count;
        const countQuest = testQuestions.length


        const game = {name: name, surname: surname, total: countQuest, correct: count}


        let previousResults = [];
        try {
            const data = fs.readFileSync('results.json', 'utf8');
            previousResults = JSON.parse(data);
        } catch (err) {
            console.error('Помилка при зчитуванні попередніх результатів: ', err);
        }

        // Додавання поточних результатів до попередніх
        previousResults.push(game);

        console.log("Results")
        for (let i = 0; i < previousResults.length; i++) {
            console.log(previousResults[i])
        }

        // Збереження результатів у файлі
        fs.writeFile('results.json', JSON.stringify(previousResults), (err) => {

            if (err) {
                console.error('Помилка при збереженні результатів: ', err);
                // Обробка помилки
                return res.status(500).json({ error: 'Помилка при збереженні результатів' });
            }
            // Успішне збереження результатів
            console.log('Результати тесту збережено');
            // Продовжуємо обробку запиту
        });
        res.redirect("/")
    }

}



module.exports = new PagesController()