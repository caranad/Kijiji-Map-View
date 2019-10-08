const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const kijiji = require('./routes/kijiji');

const app = express();

const options = {
    origin: ['http://localhost:8080'],
    methods: ['GET','POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(body_parser.json());
app.use(cors(options));

app.use('/kijiji', kijiji);

app.listen(process.env.PORT || 8081, () => {
    console.log("Started server on http://localhost:8081");
})