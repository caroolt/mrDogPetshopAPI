const router = require('express').Router();
const suppliersTable = require('./suppliersTable');
const Supplier = require('./Supplier');

router.get('/', async (request, response) => {
    const results = await suppliersTable.list()
    response.send(
        JSON.stringify(results)
    )
});

router.post('/', async (request, response) => {
    const receivedData = request.body;
    const supplier = new Supplier(receivedData);
    await supplier.create();
    response.status(201).send(JSON.stringify(supplier));
});

router.get('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id });
        await supplier.load();
        response.send(
            JSON.stringify(supplier)
        );
    } catch (erro) {
        response.send(
            JSON.stringify({
                message: erro.message
            })
        )
    }
})

module.exports = router; 