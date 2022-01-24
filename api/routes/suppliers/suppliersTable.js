const Model = require('./supplierModelTable');

module.exports = {
    list(){
        return Model.findAll();
    }
}