const tableModel = require('../routes/suppliers/supplierModelTable');

tableModel
    .sync()
    .then(() => console.log('Table created with success'))
    .catch(console.log)