const Model = require('./supplierModelTable');

module.exports = {
    list() {
        return Model.findAll();
    },

    insert(supplier) {
        return Model.create(supplier);
    },

    async getById(id) {
        const found = await Model.findOne({
            where: {
                id: id
            }
        })

        if (!found) {
            throw new Error('Supplier was not found!')
        }

        return found
    },

    async update(id, updatedData) {
        return Model.update(
            updatedData,
            {
                where: { id: id }
            }
        )
    }
}