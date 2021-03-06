const ContentTypeNotSupported = require("./errors/ContentTypeNotSupported");
const jsontoxml = require('jsontoxml');


class Serializer {
    json(data) {
        return JSON.stringify(data);
    }
    xml(data) {
        let tag = this.tagSingular

        if (Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({ [tag]: data });
    }

    serialize(data) {
        data = this.filter(data)
        if (this.contentType === 'application/json') {
            return this.json(data);
        }
        if (this.contentType === 'application/xml') {
            return this.xml(data);
        }

        throw new ContentTypeNotSupported(this.contentType);
    }

    objectFilter(data) {
        const newObject = {}

        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                newObject[field] = data[field]
            }
        })

        return newObject
    }
    filter(data) {
        if (Array.isArray(data)) {
            data = data.map(item => {
                return this.objectFilter(item)
            });
        } else {
            data = this.objectFilter(data);
        }

        return data
    }
}

class SupplierSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'company',
            'category',
            'message'
        ].concat(extraFields || [])
        this.tagSingular = 'Supplier';
        this.tagPlural = 'Suppliers';
    }
}
class ErrorsSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'message',
        ].concat(extraFields || [])
        this.tagSingular = 'Error';
        this.tagPlural = 'Errors';
    }
}


module.exports = {
    Serializer: Serializer,
    SupplierSerializer: SupplierSerializer,
    ErrorsSerializer: ErrorsSerializer,
    acceptedFormats: [
        'application/json',
        'application/xml'
    ]
};