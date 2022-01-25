const router = require('express').Router();
const suppliersTable = require('./suppliersTable');
const Supplier = require('./Supplier');
const SupplierSerializer = require('../../Serializer').SupplierSerializer;

router.get('/', async (request, response) => {
    const results = await suppliersTable.list()
    response.status(200)

    const serializer = new SupplierSerializer(
        response.getHeader('Content-Type')
    )

    response.send(
        serializer.serialize(results)
    )
});

router.post('/', async (request, response, middlewareErros) => {
    try {
        const receivedData = request.body;
        const supplier = new Supplier(receivedData);
        await supplier.create();

        response.status(201)

        const serializer = new SupplierSerializer(
            response.getHeader('Content-Type')
        )

        response.send(
            serializer.serialize(supplier)
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

        const serializer = new SupplierSerializer(
            response.getHeader('Content-Type')
        )

        response.send(
            serializer.serialize(supplier)
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

        response.status(200)
        const message = 'User was updated successfully'

        const serializer = new SupplierSerializer(
            response.getHeader('Content-Type')
        );

        response.send(serializer.serialize(message));

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

        response.status(200);
        const message = 'User was deleted successfully'

        const serializer = new SupplierSerializer(
            response.getHeader('Content-Type')
        );

        response.send(serializer.serialize(message));

    } catch (erro) {
        middlewareErros(erro);
    }
});

module.exports = router; 