const router = require('express').Router();
const suppliersTable = require('./suppliersTable')

router.use('/', async (request, response) => {
    const results = await suppliersTable.list()
    response.send(
        JSON.stringify(results)
    )
})

module.exports = router;