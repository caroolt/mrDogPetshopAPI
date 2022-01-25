const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')

app.use(bodyParser.json());

const router = require('./routes/suppliers');
const NotFound = require('./errors/NotFound');
const InvalidField = require('./errors/InvalidField');
const NoDataWasSent = require('./errors/NoDataWasSent');
const EmptyField = require('./errors/EmptyField');

app.use('/api/suppliers', router);

app.use((erro, request, response, middlewareErros) => {
    let status = 500;

    if (erro instanceof NotFound) {
        status = 404
    };
    if (erro instanceof InvalidField ||
        erro instanceof NoDataWasSent ||
        erro instanceof EmptyField) {

        status = 400

    };
    response.status(status).send(
        JSON.stringify({
            message: erro.message,
            id: erro.idError
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log('API is on!');
})

