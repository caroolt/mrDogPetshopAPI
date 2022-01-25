const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')

app.use(bodyParser.json());

const router = require('./routes/suppliers');
app.use('/api/suppliers', router);

app.listen(config.get('api.port'), () => {
    console.log('API is on!');
})