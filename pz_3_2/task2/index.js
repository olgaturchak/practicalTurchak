const express = require('express');
const bodyParser = require('body-parser');
const router = require("./router/router")

const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)

app.set('view engine', 'ejs')

const start = async () => {
    app.listen(port, () => {
        console.log(`Example app listening at ${port}`);
    });
}

start()