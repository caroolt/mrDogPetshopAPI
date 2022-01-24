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
        const results = await supplierTable.insert({
            company: this.company,
            email: this.email,
            category: this.category,
        })

        this.id = results.id
        this.createdAt = results.createdAt
        this.updatedAt = results.updatedAt
    }
}
module.exports = Supplier;