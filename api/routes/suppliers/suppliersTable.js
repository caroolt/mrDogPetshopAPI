const Model = require('./supplierModelTable');
const NotFound = require('../../errors/NotFound');
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
            throw new NotFound()
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
    },

    delete(id) {
        return Model.destroy({
            where: {
                id: id
            }
        })
    }
}