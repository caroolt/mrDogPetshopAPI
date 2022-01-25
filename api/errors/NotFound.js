class NotFound extends Error {
    constructor() {
        super('Supplier was not found!');

        this.name = 'NotFound';

        this.idError = 0
    }
}

module.exports = NotFound;