const router = require('express').Router();

router.get('/', (request, response) => {
    response.send(
        JSON.stringify([])
    )
})

module.exports = router