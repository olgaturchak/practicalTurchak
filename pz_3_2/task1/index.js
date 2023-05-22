const express = require('express');
const fs = require('fs');
const app = express();


    // Маршрут для отримання головної сторінки
    app.get('/', (req, res) => {
           res.sendFile(__dirname + '/index.html');
    });

    app.post('/submit', (req, res) => {
        const clientIP = req.ip; // отримати IP-адрес клієнта
        const clientPort = req.socket.remotePort; // отримати порт клієнта
        const currentDate = new Date().toISOString(); // отримати поточну дату у форматі ISO

        // створити об'єкт з даними клієнта
        const clientData = {
            ip: clientIP,
            port: clientPort,
            date: currentDate
        };
        let arr;
        if(!fs.existsSync('client.json')) {
            arr = []
        } else {
            const json = fs.readFileSync('client.json').toString()
            if(json) {
                arr = JSON.parse(json)
            } else {
                arr = []
            }
        }

        arr.push(clientData)
        fs.writeFileSync('client.json', JSON.stringify(arr));

        res.redirect("/")
    });


// Запускаємо сервер на порту 3000
app.listen(9000, () => {
    console.log('Server started on port 8000');
});
