class EmptyField extends Error {
    constructor(field) {
        const message = `The field, ${field} is empty `;

        super(message);

        this.name = 'EmptyField'

        this.idError = 3
    }
}

module.exports = EmptyField;