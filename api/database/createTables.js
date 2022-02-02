const models = [
    require('../routes/suppliers/supplierModelTable'),
    require('../routes/suppliers/products/productTableModel')
]

async function createTables() {
    for (let counter = 0; counter < models.length; counter++) {
        const model = models[counter];
        await model.sync()
    }
}

createTables()