const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config')

app.use(bodyParser.json());

app.use((request, response, middlewareContent) => {
    let requestedFormat = request.header('Accept');

    if (requestedFormat === '*/*') {
        requestedFormat = 'application/json'
    }

    if (acceptedFormats.indexOf(requestedFormat) === -1) {
        response.status(406)
        response.end()
        return
    }

    response.setHeader('Content-Type', requestedFormat);

    middlewareContent()
})

const router = require('./routes/suppliers');
const NotFound = require('./errors/NotFound');
const InvalidField = require('./errors/InvalidField');
const NoDataWasSent = require('./errors/NoDataWasSent');
const EmptyField = require('./errors/EmptyField');
const ContentTypeNotSupported = require('./errors/ContentTypeNotSupported');
const { acceptedFormats, ErrorsSerializer } = require('./Serializer');

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

    if (erro instanceof ContentTypeNotSupported) {
        status = 406;
    }
    const serializer = new ErrorsSerializer(
        response.getHeader('Content-Type')
    )
    response.status(status).send(
        serializer.serialize({
            message: erro.message,
            id: erro.idError
        })
    )
})

app.listen(config.get('api.port'), () => {
    console.log('API is on!');
})

