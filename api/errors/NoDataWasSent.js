class NoDataWasSent extends Error {
    constructor() {
        super('No data was provided...');

        this.name = 'NoDataWasSent';

        this.idError = 2
    }
}

module.exports = NoDataWasSent;