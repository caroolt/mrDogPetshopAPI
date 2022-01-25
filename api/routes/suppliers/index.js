const router = require('express').Router();
const suppliersTable = require('./suppliersTable');
const Supplier = require('./Supplier');

router.get('/', async (request, response) => {
    const results = await suppliersTable.list()
    response.status(200).send(
        JSON.stringify(results)
    )
});

router.post('/', async (request, response, middlewareErros) => {
    try {
        const receivedData = request.body;
        const supplier = new Supplier(receivedData);
        await supplier.create();
        response
            .status(201)
            .send(
                JSON.stringify(supplier)
            );

    } catch (erro) {
        middlewareErros(erro);
    }
});

router.get('/:idSupplier', async (request, response, middlewareErros) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id });
        await supplier.load();
        response
            .status(200)
            .send(
                JSON.stringify(supplier)
            );
    } catch (erro) {
        middlewareErros(erro);
    }
});

router.put('/:idSupplier', async (request, response, middlewareErros) => {
    try {
        const id = request.params.idSupplier
        const dadosRecebidos = request.body

        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const supplier = new Supplier(dados);

        await supplier.update()

        response
            .status(200)
            .send(
                JSON.stringify({
                    message: "User was updated successfully"
                }));

    } catch (erro) {
        middlewareErros(erro);
    }
});

router.delete('/:idSupplier', async (request, response, middlewareErros) => {
    try {
        const id = request.params.idSupplier
        const supplier = new Supplier({ id: id });
        await supplier.load();
        await supplier.delete();

        response
            .status(200)
            .send(
                JSON.stringify({
                    message: "User was deleted successfully"
                }));

    } catch (erro) {
        middlewareErros(erro);
    }
});

module.exports = router; 