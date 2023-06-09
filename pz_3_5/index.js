const express = require('express');
const {mongoose} = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const todoRoutes = require("./routes/todos")
const mysql = require("mysql");

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    allowProtoPropertiesByDefault: true
});

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


const port = 8000;

app.use(express.urlencoded({extended: true}))
app.use(todoRoutes)
app.use(express.static(path.join(__dirname, 'public')))

const connection = mysql.createConnection({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "sample_training",
    password: "1111"
});

connection.connect((err) => {
    if (err) {
        console.error('Помилка підключення до бази даних:', err);
        return;
    }

    console.log('Підключено до бази даних MySQL');
});



const start = async () => {


    mongoose.connect('mongodb://127.0.0.1:27017/sample_training', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

    app.listen(port, () => {
        console.log('Server started on port 9000');
    });
}

start()