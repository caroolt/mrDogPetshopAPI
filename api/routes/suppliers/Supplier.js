const supplierTable = require('./suppliersTable')


class Supplier {
    constructor({ id, company, email, category, createdAt, updatedAt }) {
        this.id = id
        this.company = company
        this.email = email
        this.category = category
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    async create() {
        this.validate();

        const results = await supplierTable.insert({
            company: this.company,
            email: this.email,
            category: this.category,
        })

        this.id = results.id
        this.createdAt = results.createdAt
        this.updatedAt = results.updatedAt
    }

    async load() {
        const foundSupplier = await supplierTable.getById(this.id)
        this.company = foundSupplier.company
        this.email = foundSupplier.email
        this.category = foundSupplier.category
        this.createdAt = foundSupplier.createdAt
        this.updatedAt = foundSupplier.updatedAt
    }

    async update() {
        await supplierTable.getById(this.id)
        const fields = ['company', 'email', 'category']
        const updatedData = {}

        fields.forEach(field => {
            const value = this[field]

            if (typeof value === 'string' && value.length > 0) {
                updatedData[field] = value
            }
        })

        if (Object.keys(updatedData).length === 0) {
            throw new Error('No data was provided to update...')
        }

        await supplierTable.update(this.id, updatedData)
    }

    async delete() {
        return supplierTable.delete(this.id);
    }

    validate() {
        const fields = ['company', 'email', 'category'];

        fields.forEach(field => {
            const value = this[field]

            if (typeof value !== 'string' || value.length === 0) {
                throw new Error(`The field, ${field} is invalid or empty.`)
            }
        })
    }

}
module.exports = Supplier;