class ContentTypeNotSupported extends Error {
    constructor(contentType) {
        const message = `The content type, ${contentType}, is not supported `;

        super(message);

        this.name = 'ContentTypeNotSupported'

        this.idError = 4
    }
}

module.exports = ContentTypeNotSupported;