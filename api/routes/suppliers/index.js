const router = require('express').Router();
const suppliersTable = require('./suppliersTable');
const Supplier = require('./Supplier');

router.get('/', async (request, response) => {
    const results = await suppliersTable.list()
    response.status(200).send(
        JSON.stringify(results)
    )
});

router.post('/', async (request, response) => {
    try {
        const receivedData = request.body;
        const supplier = new Supplier(receivedData);
        await supplier.create();
        response.status(201).send(JSON.stringify(supplier));
    } catch (erro) {
        response.send(
            JSON.stringify({
                message: erro.message
            })
        )
    }
});

router.get('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id });
        await supplier.load();
        response.status(200).send(
            JSON.stringify(supplier)
        );
    } catch (erro) {
        response.send(
            JSON.stringify({
                message: erro.message
            })
        )
    }
});

router.put('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const dadosRecebidos = request.body

        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const supplier = new Supplier(dados);

        await supplier.update()

        response.status(200).send(
            JSON.stringify({
                message: "Usuário atualizado com sucesso"
            }));

    } catch (erro) {
        response.send(
            JSON.stringify({
                message: erro.message
            })
        )
    }
});

router.delete('/:idSupplier', async (request, response) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id });
        await supplier.load();
        await supplier.delete();

        response.status(200).send(
            JSON.stringify({
                message: "Usuário deletado com sucesso"
            }));

    } catch (erro) {
        response.send(
            JSON.stringify({
                message: erro.message
            })
        )
    }
});

module.exports = router; 