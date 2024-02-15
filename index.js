const express = require('express');
const listlerRouter = require('./routers/listelerRouter');
const server = express();
const logger = require('./middlewares/logeer');
const errorHandling = require('./middlewares/errorHandling');


server.use(logger);
server.use(express.json());
server.use('/listeler', listlerRouter);


server.get("/", (req, res) => {
    res.send('mert metin projeler1');
});

server.use(errorHandling);

server.listen(5000, () => {
    console.log('http://localhost:5000 adresine gelen isteklere bakılıyor..');
})