const router = require('express').Router();
const suppliersTable = require('./suppliersTable');
const Supplier = require('./Supplier');

router.get('/', async (request, response) => {
    const results = await suppliersTable.list()
    response.send(
        JSON.stringify(results)
    )
})

router.post('/', async (request, response) => {
    const receivedData = request.body;
    const supplier = new Supplier(receivedData);
    await supplier.create();
    response.send(JSON.stringify(supplier));
})

module.exports = router; 