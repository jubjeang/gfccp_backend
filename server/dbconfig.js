
const config = {
    user :'sa',
    password :'ahost!1234',
    server:'192.168.100.176',
    database:'CIT_ReportDB_GFCCP',
    options:{
        validateBulkLoadParameters: false,
        rowCollectionOnRequestCompletion: true,
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    //port : 8090
}

module.exports = config; 