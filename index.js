// import xlsxFile from 'read-excel-file'
const xlsxFile = require('read-excel-file/node');
const dboperations = require('./controllers/dboperations');
const express = require('express')
const multer = require('multer')
const app = express()
const ftp = require("basic-ftp")
const path = require('path')
var fs = require('fs');
var mime = require('mime');
var contentDisposition = require('content-disposition')
var destroy = require('destroy')
var onFinished = require('on-finished')
const iconv = require('iconv-lite')
var fileName
var config = require('./server/dbconfig');
const sql = require('mssql');

const setordernumber = (value) => {
    const now = new Date()
    const day = ('0' + now.getDate()).slice(-2)
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const year = now.getFullYear()
    const hours = ('0' + now.getHours()).slice(-2)
    const minutes = ('0' + now.getMinutes()).slice(-2)
    // const seconds = ('0' + now.getSeconds()).slice(-2)
    const milliseconds_0 = ('0' + now.getMilliseconds()).slice(-2)
    const milliseconds = ('00' + value ).slice(-2)
    console.log('milliseconds: ',milliseconds)
    console.log('value: ',value)
    // const milliseconds = ('00' + now.getMilliseconds()).slice(-3)
    return `${day}${month}${year}${hours}${milliseconds_0}${milliseconds}`
    //return `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`

}
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        // console.log( req.file.filename ) 
        fileName = Date.now() + ".xls"
        cb(null, fileName)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads')
    }
})
const upload = multer({
    // dest: './uploads'
    storage: storage
})
const checkvalue = (value_, type_) => {
    let returnValue
    if (type_ === 'float') {
        if ((value_ === '') || (value_ === null)) {
            returnValue = 0.00
        }
        else {
            returnValue = value_
        }
    }
    if (type_ === 'string') {
        if ((value_ === '') || (value_ === null)) {
            returnValue = ''
        }
        else {
            returnValue = value_ + ''
        }
    }
    return returnValue
}
const upload_add_order = (gfccp_order, type_) => {
    const pool = new sql.ConnectionPool(config);
    console.log('gfccp_order.ordernumber: ',gfccp_order.ordernumber)
    let recordsets_
    if (type_ === 'Deposit') {
        // Connect to the database and execute the stored procedure
        pool.connect().then(() => { 
            const request = new sql.Request(pool);
            // Add the input parameters to the request object
            request.input('branchorigin_code', sql.NVarChar, gfccp_order.branchorigin_code)
            request.input('branchorigin_name', sql.NVarChar, gfccp_order.branchorigin_name)
            request.input('branchdest_code', sql.NVarChar, gfccp_order.branchdest_code)
            request.input('branchdest_name', sql.NVarChar, gfccp_order.branchdest_name)
            request.input('note_uncount_1000', sql.Float, gfccp_order.note_uncount_1000)
            request.input('note_uncount_500', sql.Float, gfccp_order.note_uncount_500)
            request.input('note_uncount_100', sql.Float, gfccp_order.note_uncount_100)
            request.input('note_uncount_50', sql.Float, gfccp_order.note_uncount_50)
            request.input('note_uncount_20', sql.Float, gfccp_order.note_uncount_20)
            request.input('note_uncount_10', sql.Float, gfccp_order.note_uncount_10)
            request.input('unit_note_uncount_1000', sql.NVarChar, gfccp_order.unit_note_uncount_1000)
            request.input('unit_note_uncount_500', sql.NVarChar, gfccp_order.unit_note_uncount_500)
            request.input('unit_note_uncount_100', sql.NVarChar, gfccp_order.unit_note_uncount_100)
            request.input('unit_note_uncount_50', sql.NVarChar, gfccp_order.unit_note_uncount_50)
            request.input('unit_note_uncount_20', sql.NVarChar, gfccp_order.unit_note_uncount_20)
            request.input('unit_note_uncount_10', sql.NVarChar, gfccp_order.unit_note_uncount_10)
            request.input('pcs_note_uncount_1000', sql.Float, gfccp_order.pcs_note_uncount_1000)
            request.input('pcs_note_uncount_500', sql.Float, gfccp_order.pcs_note_uncount_500)
            request.input('pcs_note_uncount_100', sql.Float, gfccp_order.pcs_note_uncount_100)
            request.input('pcs_note_uncount_50', sql.Float, gfccp_order.pcs_note_uncount_50)
            request.input('pcs_note_uncount_20', sql.Float, gfccp_order.pcs_note_uncount_20)
            request.input('pcs_note_uncount_10', sql.Float, gfccp_order.pcs_note_uncount_10)
            request.input('coin_fit_10', sql.Float, gfccp_order.coin_fit_10)
            request.input('coin_fit_5', sql.Float, gfccp_order.coin_fit_5)
            request.input('coin_fit_2', sql.Float, gfccp_order.coin_fit_2)
            request.input('coin_fit_1', sql.Float, gfccp_order.coin_fit_1)
            request.input('coin_fit_05', sql.Float, gfccp_order.coin_fit_05)
            request.input('coin_fit_025', sql.Float, gfccp_order.coin_fit_025)
            request.input('unit_coin_fit_10', sql.NVarChar, gfccp_order.unit_coin_fit_10)
            request.input('unit_coin_fit_5', sql.NVarChar, gfccp_order.unit_coin_fit_5)
            request.input('unit_coin_fit_2', sql.NVarChar, gfccp_order.unit_coin_fit_2)
            request.input('unit_coin_fit_1', sql.NVarChar, gfccp_order.unit_coin_fit_1)
            request.input('unit_coin_fit_05', sql.NVarChar, gfccp_order.unit_coin_fit_05)

            request.input('unit_coin_fit_025', sql.NVarChar, gfccp_order.unit_coin_fit_025)

            request.input('pcs_coin_fit_10', sql.Float, gfccp_order.pcs_coin_fit_10)
            request.input('pcs_coin_fit_5', sql.Float, gfccp_order.pcs_coin_fit_5)
            request.input('pcs_coin_fit_2', sql.Float, gfccp_order.pcs_coin_fit_2)
            request.input('pcs_coin_fit_1', sql.Float, gfccp_order.pcs_coin_fit_1)
            request.input('pcs_coin_fit_05', sql.Float, gfccp_order.pcs_coin_fit_05)
            request.input('pcs_coin_fit_025', sql.Float, gfccp_order.pcs_coin_fit_025)

            request.input('total_by_branch', sql.Float, gfccp_order.total_by_branch)
            request.input('remark', sql.NVarChar, gfccp_order.remark)
            request.input('order_date', sql.DateTime, gfccp_order.order_date)
            request.input('order_category', sql.NVarChar, gfccp_order.order_category)
            request.input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            request.input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            request.input('customerID', sql.NVarChar, gfccp_order.customerID)
            request.input('row_type', sql.NVarChar, gfccp_order.row_type)
            request.input('attach_file', sql.NVarChar, gfccp_order.attach_file)
            request.input('attach_file_origin', sql.NVarChar, gfccp_order.attach_file_origin)
            request.input('roleid', sql.Int, gfccp_order.roleid)
            request.input('approve_setting_id', sql.Int, gfccp_order.approve_setting_id)
            request.input('approve_setting_version', sql.Int, gfccp_order.approve_setting_version)
            request.input('createby', sql.NVarChar, gfccp_order.createby)
            request.input('ordernumber', sql.VarChar, gfccp_order.ordernumber)
            request.input('ordernumber_running', sql.Int, gfccp_order.ordernumber_running)
           // Execute the stored procedure
            // setTimeout(() => {
            request.execute('spUpload_add_order_deposit').then(result => {
                // console.log('Stored procedure executed successfully.');
                // console.log(result);
                recordsets_ = request.recordsets;
                pool.close();
            }).catch(err => {
                console.error(err);
                pool.close();
            });
            // }, 10000);

        }).catch(err => {
            console.error(err);
        });
    }
    else if (type_ === 'Withdraw') { 
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            // Add the input parameters to the request object
                request.input('branchorigin_code', sql.NVarChar, gfccp_order.branchorigin_code)
                request.input('branchorigin_name', sql.NVarChar, gfccp_order.branchorigin_name)
                request.input('branchdest_code', sql.NVarChar, gfccp_order.branchdest_code)
                request.input('branchdest_name', sql.NVarChar, gfccp_order.branchdest_name)

                request.input('note_new_1000', sql.Float, gfccp_order.note_new_1000)
                request.input('note_fit_1000', sql.Float, gfccp_order.note_fit_1000)
                request.input('note_new_500', sql.Float, gfccp_order.note_new_500)
                request.input('note_fit_500', sql.Float, gfccp_order.note_fit_500)
                request.input('note_new_100', sql.Float, gfccp_order.note_new_100)
                request.input('note_fit_100', sql.Float, gfccp_order.note_fit_100)
                request.input('note_new_50', sql.Float, gfccp_order.note_new_50)
                request.input('note_fit_50', sql.Float, gfccp_order.note_fit_50)
                request.input('note_new_20', sql.Float, gfccp_order.note_new_20)
                request.input('note_fit_20', sql.Float, gfccp_order.note_fit_20)
                request.input('note_new_10', sql.Float, gfccp_order.note_new_10)
                request.input('note_fit_10', sql.Float, gfccp_order.note_fit_10)

                request.input('pcs_note_new_1000', sql.Float, gfccp_order.pcs_note_new_1000)
                request.input('pcs_note_fit_1000', sql.Float, gfccp_order.pcs_note_fit_1000)
                request.input('pcs_note_new_500', sql.Float, gfccp_order.pcs_note_new_500)
                request.input('pcs_note_fit_500', sql.Float, gfccp_order.pcs_note_fit_500)
                request.input('pcs_note_new_100', sql.Float, gfccp_order.pcs_note_new_100)
                request.input('pcs_note_fit_100', sql.Float, gfccp_order.pcs_note_fit_100)
                request.input('pcs_note_new_50', sql.Float, gfccp_order.pcs_note_new_50)
                request.input('pcs_note_fit_50', sql.Float, gfccp_order.pcs_note_fit_50)
                request.input('pcs_note_new_20', sql.Float, gfccp_order.pcs_note_new_20)
                request.input('pcs_note_fit_20', sql.Float, gfccp_order.pcs_note_fit_20)
                request.input('pcs_note_new_10', sql.Float, gfccp_order.pcs_note_new_10)
                request.input('pcs_note_fit_10', sql.Float, gfccp_order.pcs_note_fit_10)

                request.input('unit_note_new_1000', sql.NVarChar, gfccp_order.unit_note_new_1000)
                request.input('unit_note_fit_1000', sql.NVarChar, gfccp_order.unit_note_fit_1000)
                request.input('unit_note_new_500', sql.NVarChar, gfccp_order.unit_note_new_500)
                request.input('unit_note_fit_500', sql.NVarChar, gfccp_order.unit_note_fit_500)
                request.input('unit_note_new_100', sql.NVarChar, gfccp_order.unit_note_new_100)
                request.input('unit_note_fit_100', sql.NVarChar, gfccp_order.unit_note_fit_100)
                request.input('unit_note_new_50', sql.NVarChar, gfccp_order.unit_note_new_50)
                request.input('unit_note_fit_50', sql.NVarChar, gfccp_order.unit_note_fit_50)
                request.input('unit_note_new_20', sql.NVarChar, gfccp_order.unit_note_new_20)
                request.input('unit_note_fit_20', sql.NVarChar, gfccp_order.unit_note_fit_20)
                request.input('unit_note_new_10', sql.NVarChar, gfccp_order.unit_note_new_10)
                request.input('unit_note_fit_10', sql.NVarChar, gfccp_order.unit_note_fit_10)

                request.input('coin_fit_10', sql.Float, gfccp_order.coin_fit_10)
                request.input('coin_fit_5', sql.Float, gfccp_order.coin_fit_5)
                request.input('coin_fit_2', sql.Float, gfccp_order.coin_fit_2)
                request.input('coin_fit_1', sql.Float, gfccp_order.coin_fit_1)
                request.input('coin_fit_05', sql.Float, gfccp_order.coin_fit_05)
                request.input('coin_fit_025', sql.Float, gfccp_order.coin_fit_025)

                request.input('unit_coin_fit_10', sql.NVarChar, gfccp_order.unit_coin_fit_10)
                request.input('unit_coin_fit_5', sql.NVarChar, gfccp_order.unit_coin_fit_5)
                request.input('unit_coin_fit_2', sql.NVarChar, gfccp_order.unit_coin_fit_2)
                request.input('unit_coin_fit_1', sql.NVarChar, gfccp_order.unit_coin_fit_1)
                request.input('unit_coin_fit_05', sql.NVarChar, gfccp_order.unit_coin_fit_05)
                request.input('unit_coin_fit_025', sql.NVarChar, gfccp_order.unit_coin_fit_025)

                request.input('pcs_coin_fit_10', sql.Float, gfccp_order.pcs_coin_fit_10)
                request.input('pcs_coin_fit_5', sql.Float, gfccp_order.pcs_coin_fit_5)
                request.input('pcs_coin_fit_2', sql.Float, gfccp_order.pcs_coin_fit_2)
                request.input('pcs_coin_fit_1', sql.Float, gfccp_order.pcs_coin_fit_1)
                request.input('pcs_coin_fit_05', sql.Float, gfccp_order.pcs_coin_fit_05)
                request.input('pcs_coin_fit_025', sql.Float, gfccp_order.pcs_coin_fit_025)

                request.input('total_by_branch', sql.Float, gfccp_order.total_by_branch)
                request.input('remark', sql.NVarChar, gfccp_order.remark)
                request.input('order_date', sql.DateTime, gfccp_order.order_date)
                request.input('order_category', sql.NVarChar, gfccp_order.order_category)
                request.input('servicetype', sql.NVarChar, gfccp_order.servicetype)
                request.input('customer_no', sql.NVarChar, gfccp_order.customer_no)
                request.input('customerID', sql.NVarChar, gfccp_order.customerID)
                request.input('row_type', sql.NVarChar, gfccp_order.row_type)
                request.input('attach_file', sql.NVarChar, gfccp_order.attach_file)
                request.input('attach_file_origin', sql.NVarChar, gfccp_order.attach_file_origin)
                request.input('roleid', sql.Int, gfccp_order.roleid)
                request.input('approve_setting_id', sql.Int, gfccp_order.approve_setting_id)
                request.input('approve_setting_version', sql.Int, gfccp_order.approve_setting_version)
                request.input('createby', sql.NVarChar, gfccp_order.createby)
                request.input('ordernumber', sql.VarChar, gfccp_order.ordernumber)
                request.input('ordernumber_running', sql.Int, gfccp_order.ordernumber_running)
            // Execute the stored procedure
            // setTimeout(() => {
            request.execute('spUpload_add_order_withdraw').then(result => {
                // console.log('Stored procedure executed successfully.');
                // console.log(result);
                recordsets_ = request.recordsets;
                pool.close();
            }).catch(err => {
                console.error(err);
                pool.close();
            });
            // }, 10000);

        }).catch(err => {
            console.error(err);
        });
    }
    return recordsets_ 
}
const checkcustomer = (value_) => {
    if (value_ === '2c164463-ef08-4cb6-a200-08e70aece9ae') {
        return 'GSB'
    } else if (value_ === '38bfc1b0-e86e-48b8-9a28-afbeb01770ef') {
        return 'UOB'
    } else if (value_ === 'ea0087c9-4172-4c03-92c5-4cc0cd9ac62d') {
        return 'CIMB'
    }
}
const check_pcs = (value_, type_) => {
    let returnValue
    if (type_ === '1000') {
        // console.log( 'value_: ',value_ )
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 1000 : 0.00
    }
    if (type_ === '500') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 500 : 0.00
    }
    if (type_ === '100') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 100 : 0.00
    }
    if (type_ === '50') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 50 : 0.00
    }
    if (type_ === '20') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 20 : 0.00
    }
    if (type_ === '10') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 10 : 0.00
    }
    if (type_ === '5') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 5 : 0.00
    }
    if (type_ === '2') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 2 : 0.00
    }
    if (type_ === '1') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 1 : 0.00
    }
    if (type_ === '0.50') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 0.5 : 0.00
    }
    if (type_ === '0.25') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 0.25 : 0.00
    }
    return returnValue
}
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        file: req.file,
        OrderCategory: req.body.OrderCategory,
        OrderType: req.body.OrderType,
        BankType: req.body.BankType,
        JobDate: req.body.JobDate
    })
    console.log(req.body.OrderType)//1=Withdraw; 2=Deposit
    const date_ = req.body.JobDate
    console.log('req.body.JobDate: ', req.body.JobDate)
    console.log('file: ', req.file)
    console.log('req.file.originalname: ', req.file.originalname)
    console.log('OrderCategory: ', req.body.OrderCategory)
    console.log('OrderType: ', req.body.OrderType)
    console.log('BankType: ', req.body.BankType)
    console.log('JobDate: ', req.body.JobDate)
    // console.log('JobDate: ', date_)
    const OrderCategory_ = req.body.OrderCategory
    const servicetype_ = req.body.OrderType
    const customer_no_ = req.body.BankType
    const gfc_cct = req.body.gfc_cct
    const gfc_cct_code = req.body.gfc_cct_code
    const user_id = req.body.user_id
    let CustomerID = req.body.CustomerID
    let attach_file_origin = req.file.originalname
    let roleid = req.body.roleid
    let data_ = {}
    let NULL_ = null
    // let rows_ = 0
    xlsxFile('./uploads/' + fileName).then((rows) => { 
        // console.log('----------------rows.length: ',rows.length)
        // rows_ = rows.length
        // for (i in rows) {
        for (i in rows) {
            // setTimeout(() => { 
                if (i >= 2) {
                    // if (rows[i][2] === '**คอลั่มน์ที่ซ่อนไว้ไม่สามารถลบออกได้') { break }
                    if (rows[i][3] !== 'ยอดรวม') {
                        if ((rows[i][3] !== null) && (rows[i][3] !== 'จำนวนมัด')) {
                            if (servicetype_ === 'Deposit') {
                                //console.log('servicetype_ === Deposit', rows[i][4] !== '' && rows[i][4] !== null ? check_pcs( rows[i][4],'1000' ) : null )
                                // dboperations.upload_add_order(data_, 'Deposit').then((result, err) => {
                                //     if (err) {
                                //         console.log('error: ', err)
                                //         res.json({ error: err })
                                //     }
                                //     else {
                                //         // console.log(result)
                                //     }
                                // })
                                data_ = null
                                // let setordernumber_ = ''
                                let setordernumber_ = setordernumber(i)
                                // console.log('setordernumber_: ',setordernumber_)
                                // setTimeout(() => { 
                                    data_ = {
                                        'branchorigin_code': rows[i][2],
                                        'branchorigin_name': rows[i][3],
                                        'branchdest_code': gfc_cct_code,
                                        'branchdest_name': gfc_cct,
                                        'note_uncount_1000': rows[i][4],
                                        'note_uncount_500': rows[i][5],
                                        'note_uncount_100': rows[i][6], 
                                        'note_uncount_50': rows[i][7],
                                        'note_uncount_20': rows[i][8],
                                        'note_uncount_10': rows[i][9],
        
                                        'unit_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',
        
                                        'pcs_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,
                                        'pcs_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '500') : 0,//rows[i][5],
                                        'pcs_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '100') : 0,//rows[i][6],
                                        'pcs_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '50') : 0,//rows[i][7],
                                        'pcs_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '20') : 0,//rows[i][8],
                                        'pcs_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '10') : 0,//rows[i][9],
        
                                        'coin_fit_10': rows[i][10],
                                        'coin_fit_5': checkvalue(rows[i][11], 'float'),
                                        'coin_fit_2': rows[i][12],
                                        'coin_fit_1': rows[i][13],
                                        'coin_fit_05': rows[i][14],
                                        'coin_fit_025': rows[i][15],
        
                                        'unit_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',
        
                                        'pcs_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '10') : 0, //rows[i][10],
                                        'pcs_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '5') : 0,//checkvalue(rows[i][11], 'float'),
                                        'pcs_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '2') : 0,//rows[i][12],
                                        'pcs_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '1') : 0,//rows[i][13],
                                        'pcs_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '0.50') : 0,//rows[i][14],
                                        'pcs_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '0.25') : 0,//rows[i][15],
                                        'total_by_branch': rows[i][16],
                                        'remark': checkvalue(rows[i][17], 'string') !== undefined ? checkvalue(rows[i][17], 'string') : NULL_,// gfccp_order["refno"] !== undefined ? gfccp_order["refno"] : NULL_
                                        'order_date': date_,
                                        'order_category': OrderCategory_,
                                        'servicetype': servicetype_,
                                        'customer_no': customer_no_,
                                        'customerID': CustomerID,
                                        'row_type': 'normal',
                                        'attach_file': fileName,
                                        'attach_file_origin': attach_file_origin,
                                        'roleid': roleid,
                                        'approve_setting_id': req.body.approve_setting_id,
                                        'approve_setting_version': req.body.approve_setting_version,                                
                                        'createby': user_id,
                                        'ordernumber': setordernumber_,
                                        'ordernumber_running': (i-1),
                                    }
                                    //console.log( 'if ((rows[i][3] !== null) && (rows[i][3] !== จำนวนมัด)) {if (servicetype_ === Deposit' ) 
                                    // console.log('in setimeout data_: ', data_)
                                    let output_ = upload_add_order(data_, 'Deposit')
                                //  }, 1000);      
                                 //console.log('data_: ', data_) 
                                //console.log('servicetype_: ', servicetype_)
                            }
                            if (servicetype_ === 'Withdraw') {     
                                // dboperations.upload_add_order(data_, 'Withdraw').then((result, err) => {
                                //     if (err) {
                                //         console.log('error: ', err)
                                //         res.json({ error: err })
                                //     }
                                //     else {
                                //         // console.log(result)
                                //     }
                                // })
                                // setTimeout(() => { 
                                    data_ = null
                                // let setordernumber_ = ''
                                let setordernumber_ = setordernumber(i)
                                    data_ = {
                                        'branchorigin_code': gfc_cct_code,
                                        'branchorigin_name': gfc_cct,
                                        'branchdest_code': rows[i][2],
                                        'branchdest_name': rows[i][3],
        
                                        'note_new_1000': rows[i][4],
                                        'note_fit_1000': rows[i][5],
                                        'note_new_500': rows[i][6],
                                        'note_fit_500': rows[i][7],
                                        'note_new_100': rows[i][8],
                                        'note_fit_100': rows[i][9],
                                        'note_new_50': rows[i][10],
                                        'note_fit_50': rows[i][11],
                                        'note_new_20': rows[i][12],
                                        'note_fit_20': rows[i][13],
                                        'note_new_10': rows[i][14],
                                        'note_fit_10': rows[i][15],
        
                                        'pcs_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,//rows[i][4],
                                        'pcs_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '1000') : 0,//rows[i][5],
                                        'pcs_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '500') : 0,//rows[i][6],
                                        'pcs_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '500') : 0,//rows[i][7],
                                        'pcs_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '100') : 0,//rows[i][8],
                                        'pcs_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '100') : 0,//rows[i][9],
                                        'pcs_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '50') : 0,//rows[i][10],
                                        'pcs_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '50') : 0,//rows[i][11],
                                        'pcs_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '20') : 0,//rows[i][12],
                                        'pcs_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '20') : 0,//rows[i][13],
                                        'pcs_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '10') : 0,//rows[i][14],
                                        'pcs_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '10') : 0,//rows[i][15],                                
        
                                        'unit_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                        'unit_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                        'unit_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                        'unit_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                        'unit_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                        'unit_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',
                                        'unit_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                        'unit_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                        'unit_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                        'unit_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                        'unit_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                        'unit_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',
        
                                        'coin_fit_10': rows[i][16],
                                        'coin_fit_5': rows[i][17],
                                        'coin_fit_2': rows[i][18],
                                        'coin_fit_1': rows[i][19],
                                        'coin_fit_05': rows[i][20],
                                        'coin_fit_025': rows[i][21],
        
                                        'pcs_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? check_pcs(rows[i][16], '10') : 0, //rows[i][16],
                                        'pcs_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? check_pcs(rows[i][17], '5') : 0,//checkvalue(rows[i][17], 'float'),
                                        'pcs_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? check_pcs(rows[i][18], '2') : 0,//rows[i][18],
                                        'pcs_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? check_pcs(rows[i][19], '1') : 0,//rows[i][19],
                                        'pcs_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? check_pcs(rows[i][20], '0.50') : 0,//rows[i][20],
                                        'pcs_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? check_pcs(rows[i][21], '0.25') : 0,//rows[i][21],
        
                                        'unit_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? 'Bundle' : '',
        
                                        'total_by_branch': rows[i][22],
                                        // 'remark': checkvalue(rows[i][23], 'string'),
                                        'remark': checkvalue(rows[i][23], 'string') !== undefined ? checkvalue(rows[i][23], 'string') : NULL_,
                                        'order_date': date_,
                                        'order_category': OrderCategory_,
                                        'servicetype': servicetype_,
                                        'customer_no': customer_no_,
                                        'customerID': CustomerID,
                                        'row_type': 'normal',
                                        'attach_file': fileName,
                                        'attach_file_origin': attach_file_origin,
                                        'roleid': roleid,
                                        'approve_setting_id': req.body.approve_setting_id,
                                        'approve_setting_version': req.body.approve_setting_version,
                                        'createby': user_id,
                                        'ordernumber': setordernumber_,
                                        'ordernumber_running': (i-1),
                                    }
                                    let output_ = upload_add_order(data_, 'Withdraw')
                                //  }, 1000);
                                
                                // console.log('data_: ', data_)
                                // console.log('servicetype_: ', servicetype_)
                            }
                        }
                    }
                    if (rows[i][3] === 'ยอดรวม') {
                        if (rows[i][3] !== null) {
                            if (servicetype_ === 'Deposit') { 
                                data_ = null     
                                // let setordernumber_ = ''
                                let setordernumber_ = setordernumber(i)      
                                // console.log('setordernumber_: ',setordernumber_)                
                                // setTimeout(() => { 
                                    data_ = {
                                        'branchorigin_code': rows[i][2],
                                        'branchorigin_name': rows[i][3],
                                        'branchdest_code': gfc_cct_code,
                                        'branchdest_name': gfc_cct,
            
                                        'note_uncount_1000': rows[i][4],
                                        'note_uncount_500': rows[i][5],
                                        'note_uncount_100': rows[i][6],
                                        'note_uncount_50': rows[i][7],
                                        'note_uncount_20': rows[i][8],
                                        'note_uncount_10': rows[i][9],
            
                                        'unit_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                        'unit_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',
            
                                        'pcs_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,
                                        'pcs_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '500') : 0,//rows[i][5],
                                        'pcs_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '100') : 0,//rows[i][6],
                                        'pcs_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '50') : 0,//rows[i][7],
                                        'pcs_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '20') : 0,//rows[i][8],
                                        'pcs_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '10') : 0,//rows[i][9],
            
                                        'coin_fit_10': rows[i][10],
                                        'coin_fit_5': checkvalue(rows[i][11], 'float'),
                                        'coin_fit_2': rows[i][12],
                                        'coin_fit_1': rows[i][13],
                                        'coin_fit_05': rows[i][14],
                                        'coin_fit_025': rows[i][15],
            
                                        'unit_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                        'unit_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',
            
                                        'pcs_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '10') : 0, //rows[i][10],
                                        'pcs_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '5') : 0,//checkvalue(rows[i][11], 'float'),
                                        'pcs_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '2') : 0,//rows[i][12],
                                        'pcs_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '1') : 0,//rows[i][13],
                                        'pcs_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '0.50') : 0,//rows[i][14],
                                        'pcs_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '0.25') : 0,//rows[i][15],
            
                                        'total_by_branch': rows[i][16],
                                        'remark': checkvalue(rows[i][17], 'string') !== undefined ? checkvalue(rows[i][17], 'string') : NULL_,
                                        'order_date': date_,
                                        'order_category': OrderCategory_,
                                        'servicetype': servicetype_,
                                        'customer_no': customer_no_,
                                        'customerID': CustomerID,
                                        'row_type': 'summary',
                                        'attach_file': fileName,
                                        'attach_file_origin': attach_file_origin,
                                        'roleid': roleid,
                                        'createby': user_id,
                                        'ordernumber': setordernumber_,
                                        'ordernumber_running': (i-1),
                                        } 
                                     let output_ = upload_add_order(data_, 'Deposit')
                                     //console.log('if (rows[i][3] === ยอดรวม) {')
                                    //  console.log('in setimeout data_: ', data_)
                                //   }, 1000); 
    
                                // dboperations.upload_add_order(data_, 'Deposit').then((result, err) => {
                                //     if (err) {
                                //         console.log('error: ', err)
                                //         res.json({ error: err })
                                //     }
                                //     else {
                                //         // console.log(result)
                                //     }
                                // })
                                // console.log('data_: ', data_)
                                //console.log('servicetype_: ', servicetype_)
                            }
                            if (servicetype_ === 'Withdraw') { 
                                // setTimeout(() => {
                                    data_ = null
                                // let setordernumber_ = ''
                                let setordernumber_ = setordernumber(i)
                                    data_ = {
                                    'branchorigin_code': gfc_cct_code,
                                    'branchorigin_name': gfc_cct,
                                    'branchdest_code': rows[i][2],
                                    'branchdest_name': rows[i][3],
    
                                    'note_new_1000': rows[i][4],
                                    'note_fit_1000': rows[i][5],
                                    'note_new_500': rows[i][6],
                                    'note_fit_500': rows[i][7],
                                    'note_new_100': rows[i][8],
                                    'note_fit_100': rows[i][9],
                                    'note_new_50': rows[i][10],
                                    'note_fit_50': rows[i][11],
                                    'note_new_20': rows[i][12],
                                    'note_fit_20': rows[i][13],
                                    'note_new_10': rows[i][14],
                                    'note_fit_10': rows[i][15],
    
                                    'pcs_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,//rows[i][4],
                                    'pcs_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '1000') : 0,//rows[i][5],
                                    'pcs_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '500') : 0,//rows[i][6],
                                    'pcs_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '500') : 0,//rows[i][7],
                                    'pcs_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '100') : 0,//rows[i][8],
                                    'pcs_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '100') : 0,//rows[i][9],
                                    'pcs_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '50') : 0,//rows[i][10],
                                    'pcs_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '50') : 0,//rows[i][11],
                                    'pcs_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '20') : 0,//rows[i][12],
                                    'pcs_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '20') : 0,//rows[i][13],
                                    'pcs_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '10') : 0,//rows[i][14],
                                    'pcs_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '10') : 0,//rows[i][15],                                
    
                                    'unit_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                    'unit_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                    'unit_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                    'unit_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                    'unit_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                    'unit_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',
                                    'unit_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                    'unit_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                    'unit_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                    'unit_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                    'unit_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                    'unit_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',
    
                                    'coin_fit_10': rows[i][16],
                                    'coin_fit_5': rows[i][17],
                                    'coin_fit_2': rows[i][18],
                                    'coin_fit_1': rows[i][19],
                                    'coin_fit_05': rows[i][20],
                                    'coin_fit_025': rows[i][21],
    
                                    'pcs_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? check_pcs(rows[i][16], '10') : null, //rows[i][16],
                                    'pcs_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? check_pcs(rows[i][17], '5') : null,//checkvalue(rows[i][17], 'float'),
                                    'pcs_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? check_pcs(rows[i][18], '2') : null,//rows[i][18],
                                    'pcs_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? check_pcs(rows[i][19], '1') : null,//rows[i][19],
                                    'pcs_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? check_pcs(rows[i][20], '0.50') : null,//rows[i][20],
                                    'pcs_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? check_pcs(rows[i][21], '0.25') : null,//rows[i][21],
    
                                    'unit_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? 'Bundle' : '',
                                    'unit_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? 'Bundle' : '',
                                    'unit_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? 'Bundle' : '',
                                    'unit_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? 'Bundle' : '',
                                    'unit_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? 'Bundle' : '',
                                    'unit_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? 'Bundle' : '',
    
                                    'total_by_branch': rows[i][22],
                                    // 'remark': checkvalue(rows[i][23], 'string'),
                                    'remark': checkvalue(rows[i][23], 'string') !== undefined ? checkvalue(rows[i][23], 'string') : NULL_,
                                    'order_date': date_,
                                    'order_category': OrderCategory_,
                                    'servicetype': servicetype_,
                                    'customer_no': customer_no_,
                                    'customerID': CustomerID,
                                    'row_type': 'summary',
                                    'attach_file': fileName,
                                    'attach_file_origin': attach_file_origin,
                                    'roleid': roleid,
                                    'createby': user_id,
                                    'ordernumber': setordernumber_,
                                    'ordernumber_running': (i-1),
                                    }
                                // dboperations.upload_add_order(data_, 'Withdraw').then((result, err) => {
                                //     if (err) {
                                //         console.log('error: ', err)
                                //         res.json({ error: err })
                                //     }
                                //     else {
                                //         // console.log(result)
                                //     }
                                // })
                                 
                                     //let output_ = upload_add_order(data_, 'Withdraw')
                                // }, 1000);                            
                                // console.log('data_: ', data_)
                                //console.log('servicetype_: ', servicetype_)
                            }
                        }
                    }
                    //console.log(rows[i][16])
                }
            // }, 500); 
        }
    })
})
app.get('/ordertrackinglist', (req, res) => {
    dboperations.getOrdertrackinglist().then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
// create application/x-www-form-urlencoded parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post("/generateCSV", urlencodedParser, async (req, res) => {
    let data = req.body
    let obj = null
    for (let x in data) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    //console.log('data: ',data)
    let data_ = obj_json['data_'].split(':')
    console.log('obj_json: ', obj_json)
    let customer = ''
    customer = checkcustomer(obj_json['customerID'])
    // obj_json['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
    var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
        + '/' + customer
    console.log('req.query[customerID]: ', req.query['customerID'], 'path: ', path)
    var file = __dirname + '/reports/' + data_[0] + '/' + data_[1] + '/' + customer + '/' + data_[2] + '/' + data_[3];
    res.setHeader("Content-Type", "text/csv; charset=Windows-874;")
    res.setHeader('Content-Disposition', contentDisposition(file))
    var filestream = fs.createReadStream(file);
    console.log('res: ', res)
    filestream.pipe(res);
    onFinished(res, () => {
        destroy(filestream)
    })

    //     let data = req.body
    //     let obj = null
    //     for (let x in data) {
    //         obj = x  
    //     }
    //     let obj_json = JSON.parse(obj) 
    //     let data_ = obj_json.data_.split(':')
    //     let customer =''
    //     obj_json.customerID === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
    //    var file = __dirname + '/reports/'+obj_json.JobDate+'/'+obj_json.CCT_Data+'/'+customer+'/'+data_[2]+'/'+data_[3];
    //     //var file = __dirname + '/reports/'+data_[0]+'/'+data_[1]+'/' + customer + '/'+data_[2]+'/'+data_[3]    

    //     var filename = path.basename(file);
    //     var mimetype = mime.lookup(file);
    //     res.setHeader("Content-Type", "text/csv; charset=utf-8;")
    //     res.setHeader('Content-Disposition', contentDisposition(file))
    //     var filestream = fs.createReadStream(file,'utf-8');
    //     console.log('res: ',res) 
    //     filestream.pipe(res)    
    //     onFinished(res, () => {
    //         destroy(filestream) 
    //     })    
})
app.post('/checkUser', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        let data_all = {
            'jobid': obj_json['jobid'],
            'password': obj_json['password'],
        }
        // console.log(data_all)
        dboperations.checkUser(data_all).then((result, err) => {
            // if (err) {
            //     console.log('error: ',err)  
            //     res.json({error: err})
            // }
            // else {
            //     res.json(result[0])
            // }
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
    } catch (error) {
        console.error(error);
        res.json({ error: error })
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }

})
app.post("/gettemplatefile", urlencodedParser, async (req, res) => {
    let data = req.body
    let obj = null
    for (let x in data) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    let filename = ''
    console.log('obj_json[type]: ', obj_json['type'])
    obj_json['type'] === 'Deposit' ? filename = 'BranchtoCCTTemplate_deposit.xls' : filename = 'CCTToBranchTemplate_withdraw.xls'

    var file = __dirname + '/template/' + filename
    console.log('file: ', file)
    res.setHeader("Content-Type", "application/vnd.ms-excel; charset=Windows-874;")
    res.setHeader('Content-Disposition', contentDisposition(file))
    var filestream = fs.createReadStream(file);
    console.log('res: ', res)
    filestream.pipe(res);
    onFinished(res, () => {
        destroy(filestream)
    })
})
app.post("/generateXLS", urlencodedParser, async (req, res) => {

    let data = req.body
    let obj = null
    for (let x in data) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    //console.log('data: ',data)
    let data_ = obj_json['data_'].split(':')
    console.log('obj_json: ', obj_json)
    let customer = ''
    //obj_json['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
    customer = checkcustomer(obj_json['customerID'])
    var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
        + '/' + customer
    var file = __dirname + '/reports/' + data_[0] + '/' + data_[1] + '/' + customer + '/' + data_[2] + '/' + data_[4]
    console.log('file: ', file)
    res.setHeader("Content-Type", "application/vnd.ms-excel; charset=Windows-874;")
    res.setHeader('Content-Disposition', contentDisposition(file))
    var filestream = fs.createReadStream(file);
    console.log('res: ', res)
    filestream.pipe(res);
    onFinished(res, () => {
        destroy(filestream)
    })
})
app.get('/getcct_data', urlencodedParser, async (req, res) => {
    dboperations.getCCT_Data(req.query['CustomerID'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getActitySelectd', urlencodedParser, async (req, res) => {
    dboperations.getActitySelectd(req.query['user_id'], req.query['customerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            //console.log( 'res.json(result[0]): ',res.json( result[0] ) )
            res.json(result[0])
        }
    })
})
app.get('/getdownloadreports', urlencodedParser, async (req, res) => {
    const client = new ftp.Client()
    client.ftp.verbose = true
    var output_data = []
    var output_data0 = {}
    let customer = ''
    //req.query['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
    customer = checkcustomer(req.query['customerID'])
    var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
        + '/' + customer
    var dir_ = {}
    var path_ = ""
    try {
        await client.access({
            host: "192.168.100.94",
            port: 21,
            user: "svc-ftp-std",
            password: "mnP9eFP8",
            secure: false
        })
        dir_ = await client.list(path)
        console.log('path: ', path)
        console.log('dir_ : ', dir_)
        console.log('dir_.length : ', dir_.length)
        console.log('dir_.name : ', dir_[0].name)

        if (dir_.length > 0) {
            for (var index = 1; index <= dir_.length; index++) {
                path_ = 'reports/' + path + '/'//--------------------------------------------------------------------------------------------path D:/projects/gfccp_web/public/reports/
                //path_ = 'D:/projects/gfccp_web/public/reports/' + path + '/'//-------------------------------------------------------------path D:/projects/gfccp_web/public/reports/                
                path_ += dir_[index - 1].name
                console.log('path_: ', path_)
                console.log('dir_[ index-1 ].name: ', dir_[index - 1].name)
                if (!fs.existsSync(path_))//---------------------------ยังไม่มีโฟลเดอร์ backend
                {
                    console.log('if (!fs.existsSync(path_))')
                    //----Start Copy file from remote to backend serve
                    fs.mkdirSync(path_, { recursive: true });
                    // client.trackProgress(info => console.log(info.bytesOverall))
                    client.trackProgress(info => console.log('info.fileName: ', info.fileName))
                    //--await client.downloadToDir("local/path", "remote/path")
                    await client.downloadToDir(path_, path + "/" + dir_[index - 1].name)
                    //----End Copy file from remote to backend serve
                    output_data0 = {
                        jobdate: req.query['JobDate'],
                        cctname: req.query['CCT_Data'],
                        typeofreport: dir_[index - 1].name,
                        remotepath: path_,
                        files: getReportFilename(path_),
                        id_: index - 1
                    }
                }
                else//--------------------------------------------------มีโฟลเดอร์ backend                
                {
                    console.log('NO.......if (!fs.existsSync(path_))')
                    output_data0 = {
                        jobdate: req.query['JobDate'],
                        cctname: req.query['CCT_Data'],
                        typeofreport: dir_[index - 1].name,
                        remotepath: path_,
                        files: getReportFilename(path_),
                        id_: index - 1
                    }
                }
                output_data.push(output_data0)
                console.log('output_data in for loop: ', output_data)
            }
        }
        console.log('output_data: ', output_data)
        //return output_data
    }
    catch (err) {
        console.log('err: ', err)
    }
    client.close()
    res.json(output_data)
})
const getReportFilename = (path_) => {
    let output = []
    let countfile = 0
    //let output0={}
    console.log('start getReportFilename path_: ', path_)
    fs.readdirSync(path_).forEach(file => {
        if (file) {
            if (countfile === 0) {
                output.push({ file1: file })
                console.log('file1: ', file)
                countfile++
            }
            else {
                // output0={file2: file}
                output.push({ file2: file })
                console.log('file2: ', file)
                countfile = 0
            }
        }
    })
    // console.log('output0: ',output0)
    // output.push( output0 )
    return output
}
//------------getrole 
app.get('/getrole', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    dboperations.getRole(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getactivity_authen', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req: ', req)
    console.log('approve_setting_id: ', req.query['approve_setting_id'])
    console.log('approve_setting_version: ', req.query['approve_setting_version'])
    dboperations.getactivity_authen(req.query['approve_setting_id'], req.query['approve_setting_version']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })
})
app.get('/getuser', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    console.log('req.query[CustomerID]', req.query['CustomerID'])
    dboperations.getUser(req.query['user_id'], req.query['CustomerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getuserEdit', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    console.log('req.query[CustomerID]', req.query['CustomerID'])
    dboperations.getuserEdit(req.query['user_id'], req.query['CustomerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getcashcenterdata', urlencodedParser, (req, res) => {
    // console.log(req.query['CustomerID'])
    let type_ = ''
    type_ = req.query['type_']
    if (type_ === 'BOT') {
        dboperations.getCashCenterBOT(req.query['CustomerID'], req.query['user_id']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
    }
    else {
        dboperations.getCashCenterData(req.query['CustomerID'], req.query['user_id']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
    }
})
app.get('/getbotbranch', urlencodedParser, (req, res) => {
    dboperations.getBOT_Branch(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getbranchdata', urlencodedParser, (req, res) => {
    // console.log(req.query['CustomerID'])
    dboperations.getBranchData(req.query['CustomerID'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getbranchforcash', urlencodedParser, (req, res) => {
    dboperations.getBranchForCash(req.query['CustomerID'], req.query['CCT'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })

})
app.get('/orderlist', urlencodedParser, (req, res) => {
    console.log('/orderlist req.query[RoleId]: ', req.query['RoleId']
        , 'req.query[CustomerID]: ', req.query['CustomerID']
        , 'req.query[user_id]: ', req.query['user_id']
        , 'req.query[approve_setting_id]: ', req.query['approve_setting_id']
        , 'req.query[approve_setting_version]: ', req.query['approve_setting_version']
    )
    //dboperations.getOrdersList(req.query['user_id'], req.query['CustomerID'], req.query['approve_setting_id'], req.query['approve_setting_version'] ).then((result, err) => {
    dboperations.getOrdersList(req.query['RoleId']
        , req.query['CustomerID']
        , req.query['user_id']
        , req.query['approve_setting_id']
        , req.query['approve_setting_version']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
})
// app.get('/getcctbranch', urlencodedParser, (req, res) => {  
//     dboperations.getCashCenterData( req.query['CustomerID']  ).then((result, err) => {
//         if (err) {
//             console.log('error: ',err)
//         }
//         else {
//             res.json(result[0]) 
//         }
//     })
// })
app.get('/approvelist', urlencodedParser, (req, res) => {
    try {
        console.log('req.query[RoleId]: ', req.query['RoleId']
            , 'req.query[CustomerID]: ', req.query['CustomerID']
            , 'req.query[user_id]: ', req.query['user_id']
            , 'req.query[approve_setting_id]: ', req.query['approve_setting_id']
            , 'req.query[approve_setting_version]: ', req.query['approve_setting_version']
        )
        dboperations.getApproveList(req.query['RoleId']
            , req.query['CustomerID']
            , req.query['user_id']
            , req.query['approve_setting_id']
            , req.query['approve_setting_version']
        ).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
    } catch (error) {
        res.json({ error: error })
        console.error(error)
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }

})
app.get('/approvenlist', urlencodedParser, (req, res) => {
    try {
        console.log('req.query[RoleId]: ', req.query['RoleId']
            , 'req.query[CustomerID]: ', req.query['CustomerID']
            , 'req.query[user_id]: ', req.query['user_id']
            , 'req.query[approve_setting_id]: ', req.query['approve_setting_id']
            , 'req.query[approve_setting_version]: ', req.query['approve_setting_version']
        )
        dboperations.getApproveNList(req.query['RoleId']
            , req.query['CustomerID']
            , req.query['user_id']
            , req.query['approve_setting_id']
            , req.query['approve_setting_version']
        ).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
    } catch (error) {
        res.json({ error: error })
        console.error(error)
    }

})
app.get('/approveProcList', urlencodedParser, (req, res) => {
    dboperations.getApproveProcList(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_approveProcData', urlencodedParser, (req, res) => {
    dboperations.get_approveProcData(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_approveProcDataDet', urlencodedParser, (req, res) => {
    dboperations.get_approveProcDataDet(req.query['approve_setting_id'], req.query['version']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_pbi_url', urlencodedParser, (req, res) => {
    dboperations.get_pbi_url(req.query['pagname'], req.query['CustomerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getbanktypedata', urlencodedParser, (req, res) => {
    console.log('req.query[user_id]: ', req.query['user_id'])
    dboperations.getBankTypeData(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getdownloadlink', urlencodedParser, (req, res) => {
    console.log('req.query[user_id]: ', req.query['user_id'])
    dboperations.getDownloadLink(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post('/add_approveProc', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    console.log('obj_json: ', obj_json)
    console.log('data_: ', data_)
    dboperations.add_approveProc(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post('/manual_add_order', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    let data_all = {
        'customerID': obj_json['CustomerID'],
        'approve_setting_id': obj_json['approve_setting_id'],
        'approve_setting_version': obj_json['approve_setting_version'],
        'roleid': obj_json['roleid'],
        'order_category': obj_json['OrderCategoryNew'],
        'servicetype': obj_json['OrderTypeNew'],
        'refno': obj_json['RefNo'],
        'order_date': obj_json['JobDateNew'],
        'branchorigin_name': obj_json['BranchOrigin'],
        'branchorigin_code': obj_json['BranchOrigin_code'],
        'branchdest_name': obj_json['BranchDest'],
        'branchdest_code': obj_json['BranchDest_code'],
        'remark': obj_json['RemarkNew'],
        'user_id': obj_json['user_id'],
    }
    let AllRowsDet = parseInt(obj_json['AllRowsDet'])
    // console.log('AllRowsDet: ' + AllRowsDet) 
    let tbGrandTotalAmount = 0
    for (var index = 1; index <= AllRowsDet; index++) {
        //------------------------------------   
        if (obj_json['ddlMoneyType' + index]) {
            let ddlMoneyTypeValue_ = obj_json['ddlMoneyType' + index]//ชนิดราคา
            let ddlQualityMoneyTypeValue_ = obj_json['ddlQualityMoneyType' + index]//คุณภาพเงิน
            let ddlPackageMoneyTypeValue_ = obj_json['ddlPackageMoneyType' + index]//หน่วย
            let tbQuantity_ = obj_json['tbQuantity' + index].replaceAll(',', '')//จำนวน tbQuantity
            let tbAmountValue_ = obj_json['tbAmount' + index].replaceAll(',', '')//ยอดรวม
            // console.log('tbAmountValue_: ', tbAmountValue_)
            tbAmountValue_ = parseFloat(tbAmountValue_)
            tbGrandTotalAmount += tbAmountValue_
            // coin_unfit_10
            console.log('index: ', index)
            console.log('ชนิดราคา: ddlMoneyTypeValue_: ', obj_json['ddlMoneyType' + index])//ชนิดราคา
            console.log('คุณภาพเงิน: ddlQualityMoneyTypeValue_: ', obj_json['ddlQualityMoneyType' + index])//คุณภาพเงิน
            console.log('หน่วย: ddlPackageMoneyTypeValue_: ', obj_json['ddlPackageMoneyType' + index])//หน่วย
            console.log('จำนวน: tbQuantity: ', obj_json['tbQuantity' + index])//จำนวน
            console.log('ยอดรวม: tbAmountValue_: ', obj_json['tbAmount' + index].replaceAll(',', ''))//จำนวน
            //------------------------------ 
            switch (ddlQualityMoneyTypeValue_) {
                case 'New':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_new_1000 = tbAmountValue_
                            data_all.unit_note_new_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_1000 = tbQuantity_
                            // console.log(data_all)
                            break;
                        case '500':
                            data_all.note_new_500 = tbAmountValue_
                            data_all.unit_note_new_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_new_100 = tbAmountValue_
                            data_all.unit_note_new_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_100 = tbQuantity_
                            break;
                        case '20':
                            data_all.note_new_20 = tbAmountValue_
                            data_all.unit_note_new_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    data_all.coin_new_10 = tbAmountValue_
                                    data_all.unit_coin_new_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_new_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_new_10 = tbAmountValue_
                                    data_all.unit_note_new_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_new_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_new_5 = tbAmountValue_
                            data_all.unit_coin_new_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_new_2 = tbAmountValue_
                            data_all.unit_coin_new_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_new_1 = tbAmountValue_
                            data_all.unit_coin_new_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_new_05 = tbAmountValue_
                            data_all.unit_coin_new_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_new_025 = tbAmountValue_
                            data_all.unit_coin_new_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//---end New
                case 'Fit':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_fit_1000 = tbAmountValue_
                            data_all.unit_note_fit_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_1000 = tbQuantity_
                            break;
                        case '500':
                            data_all.note_fit_500 = tbAmountValue_
                            data_all.unit_note_fit_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_fit_100 = tbAmountValue_
                            data_all.unit_note_fit_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_100 = tbQuantity_
                            break;
                        case '20':
                            data_all.note_fit_20 = tbAmountValue_
                            data_all.unit_note_fit_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    data_all.coin_fit_10 = tbAmountValue_
                                    data_all.unit_coin_fit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_fit_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_fit_10 = tbAmountValue_
                                    data_all.unit_note_fit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_fit_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_fit_5 = tbAmountValue_
                            data_all.unit_coin_fit_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_fit_2 = tbAmountValue_
                            data_all.unit_coin_fit_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_fit_1 = tbAmountValue_
                            data_all.unit_coin_fit_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_fit_05 = tbAmountValue_
                            data_all.unit_coin_fit_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_fit_025 = tbAmountValue_
                            data_all.unit_coin_fit_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//---end Good
                case 'Uncount':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_uncount_1000 = tbAmountValue_
                            data_all.unit_note_uncount_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_1000 = tbQuantity_
                            break;
                        case '500':
                            data_all.note_uncount_500 = tbAmountValue_
                            data_all.unit_note_uncount_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_uncount_100 = tbAmountValue_
                            data_all.unit_note_uncount_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_100 = tbQuantity_
                            break;
                        case '20':
                            data_all.note_uncount_20 = tbAmountValue_
                            data_all.unit_note_uncount_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    data_all.coin_uncount_10 = tbAmountValue_
                                    data_all.unit_coin_uncount_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_uncount_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_uncount_10 = tbAmountValue_
                                    data_all.unit_note_uncount_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_uncount_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_uncount_5 = tbAmountValue_
                            data_all.unit_coin_uncount_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_uncount_2 = tbAmountValue_
                            data_all.unit_coin_uncount_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_uncount_1 = tbAmountValue_
                            data_all.unit_coin_uncount_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_uncount_05 = tbAmountValue_
                            data_all.unit_coin_uncount_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_uncount_025 = tbAmountValue_
                            data_all.unit_coin_uncount_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//-
                case 'Unfit':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_unfit_1000 = tbAmountValue_
                            data_all.unit_note_unfit_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_1000 = tbQuantity_
                            break;
                        case '500':
                            data_all.note_unfit_500 = tbAmountValue_
                            data_all.unit_note_unfit_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_unfit_100 = tbAmountValue_
                            data_all.unit_note_unfit_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_100 = tbQuantity_
                            // console.log('data_all.pcs_note_unfit_100')
                            // console.log(data_all)
                            break;
                        case '20':
                            data_all.note_unfit_20 = tbAmountValue_
                            data_all.unit_note_unfit_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    // console.log('------------------------------------------')
                                    // console.log('ddlQualityMoneyTypeValue_: ', ddlQualityMoneyTypeValue_)
                                    // console.log('ddlMoneyTypeValue_: ', ddlMoneyTypeValue_)
                                    // console.log('ddlPackageMoneyTypeValue_: ', ddlPackageMoneyTypeValue_)
                                    data_all.coin_unfit_10 = tbAmountValue_
                                    data_all.unit_coin_unfit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_unfit_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_unfit_10 = tbAmountValue_
                                    data_all.unit_note_unfit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_unfit_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_unfit_5 = tbAmountValue_
                            data_all.unit_coin_unfit_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_unfit_2 = tbAmountValue_
                            data_all.unit_coin_unfit_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_unfit_1 = tbAmountValue_
                            data_all.unit_coin_unfit_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_unfit_05 = tbAmountValue_
                            data_all.unit_coin_unfit_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_unfit_025 = tbAmountValue_
                            data_all.unit_coin_unfit_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//---end Unsort
                default:
                    console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
            }//switch (ddlQualityMoneyTypeValue_) {
        }
        //------------------------------
    }
    data_all.tbGrandTotalAmount = tbGrandTotalAmount
    // console.log('data_all final')
    // console.log(data_all)
    dboperations.add_manual_order(data_all).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post('/edit_order', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    let data_all = {
        'orderId': obj_json['orderId'],
        'customerID': obj_json['CustomerID'],
        'order_category': obj_json['OrderCategory'],
        'servicetype': obj_json['OrderType'],
        'refno': obj_json['RefNo'],
        'order_date': obj_json['JobDate'],
        'branchorigin_name': obj_json['BranchOrigin'],
        'branchorigin_code': obj_json['BranchOrigin_code'],
        'branchdest_name': obj_json['BranchDest'],
        'branchdest_code': obj_json['BranchDest_code'],
        'remark': obj_json['RemarkNew'],
        'user_id': obj_json['user_id'],
    }
    let AllRowsDet = parseInt(obj_json['AllRowsDet'])
    // console.log('AllRowsDet: ' + AllRowsDet)
    let tbGrandTotalAmount = 0
    for (var index = 1; index <= AllRowsDet; index++) {
        //------------------------------------   
        if (obj_json['ddlMoneyType' + index]) {
            let ddlMoneyTypeValue_ = obj_json['ddlMoneyType' + index]//ชนิดราคา
            let ddlQualityMoneyTypeValue_ = obj_json['ddlQualityMoneyType' + index]//คุณภาพเงิน
            let ddlPackageMoneyTypeValue_ = obj_json['ddlPackageMoneyType' + index]//หน่วย
            let tbQuantity_ = obj_json['tbQuantity' + index].replaceAll(',', '')//จำนวน tbQuantity
            let tbAmountValue_ = obj_json['tbAmount' + index].replaceAll(',', '')//ยอดรวม
            // console.log('tbAmountValue_: ', tbAmountValue_)
            tbAmountValue_ = parseFloat(tbAmountValue_)
            tbGrandTotalAmount += tbAmountValue_
            // coin_unfit_10
            // console.log('index: ', index)
            // console.log('ชนิดราคา: ddlMoneyTypeValue_: ', obj_json['ddlMoneyType' + index])//ชนิดราคา
            // console.log('คุณภาพเงิน: ddlQualityMoneyTypeValue_: ', obj_json['ddlQualityMoneyType' + index])//คุณภาพเงิน
            // console.log('หน่วย: ddlPackageMoneyTypeValue_: ', obj_json['ddlPackageMoneyType' + index])//หน่วย
            // console.log('จำนวน: tbQuantity: ', obj_json['tbQuantity' + index])//จำนวน
            // console.log('ยอดรวม: tbAmountValue_: ', obj_json['tbAmount' + index].replaceAll(',', ''))//จำนวน
            //------------------------------ 
            switch (ddlQualityMoneyTypeValue_) {
                case 'New':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_new_1000 = tbAmountValue_
                            data_all.unit_note_new_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_1000 = tbQuantity_
                            // console.log(data_all)
                            break;
                        case '500':
                            data_all.note_new_500 = tbAmountValue_
                            data_all.unit_note_new_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_new_100 = tbAmountValue_
                            data_all.unit_note_new_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_100 = tbQuantity_
                            break;
                        case '20':
                            data_all.note_new_20 = tbAmountValue_
                            data_all.unit_note_new_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    data_all.coin_new_10 = tbAmountValue_
                                    data_all.unit_coin_new_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_new_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_new_10 = tbAmountValue_
                                    data_all.unit_note_new_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_new_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_new_5 = tbAmountValue_
                            data_all.unit_coin_new_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_new_2 = tbAmountValue_
                            data_all.unit_coin_new_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_new_1 = tbAmountValue_
                            data_all.unit_coin_new_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_new_05 = tbAmountValue_
                            data_all.unit_coin_new_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_new_025 = tbAmountValue_
                            data_all.unit_coin_new_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_new_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//---end New
                case 'Fit':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_fit_1000 = tbAmountValue_
                            data_all.unit_note_fit_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_1000 = tbQuantity_
                            break;
                        case '500':
                            data_all.note_fit_500 = tbAmountValue_
                            data_all.unit_note_fit_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_fit_100 = tbAmountValue_
                            data_all.unit_note_fit_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_100 = tbQuantity_
                            break;
                        case '20':
                            data_all.note_fit_20 = tbAmountValue_
                            data_all.unit_note_fit_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_fit_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    data_all.coin_fit_10 = tbAmountValue_
                                    data_all.unit_coin_fit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_fit_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_fit_10 = tbAmountValue_
                                    data_all.unit_note_fit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_fit_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_fit_5 = tbAmountValue_
                            data_all.unit_coin_fit_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_fit_2 = tbAmountValue_
                            data_all.unit_coin_fit_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_fit_1 = tbAmountValue_
                            data_all.unit_coin_fit_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_fit_05 = tbAmountValue_
                            data_all.unit_coin_fit_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_fit_025 = tbAmountValue_
                            data_all.unit_coin_fit_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_fit_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//---end Good
                case 'Uncount':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_uncount_1000 = tbAmountValue_
                            data_all.unit_note_uncount_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_1000 = tbQuantity_
                            break;
                        case '500':
                            data_all.note_uncount_500 = tbAmountValue_
                            data_all.unit_note_uncount_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_uncount_100 = tbAmountValue_
                            data_all.unit_note_uncount_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_100 = tbQuantity_
                            break;
                        case '20':
                            data_all.note_uncount_20 = tbAmountValue_
                            data_all.unit_note_uncount_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_uncount_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    data_all.coin_uncount_10 = tbAmountValue_
                                    data_all.unit_coin_uncount_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_uncount_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_uncount_10 = tbAmountValue_
                                    data_all.unit_note_uncount_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_uncount_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_uncount_5 = tbAmountValue_
                            data_all.unit_coin_uncount_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_uncount_2 = tbAmountValue_
                            data_all.unit_coin_uncount_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_uncount_1 = tbAmountValue_
                            data_all.unit_coin_uncount_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_uncount_05 = tbAmountValue_
                            data_all.unit_coin_uncount_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_uncount_025 = tbAmountValue_
                            data_all.unit_coin_uncount_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_uncount_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//-
                case 'Unfit':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_unfit_1000 = tbAmountValue_
                            data_all.unit_note_unfit_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_1000 = tbQuantity_
                            break;
                        case '500':
                            data_all.note_unfit_500 = tbAmountValue_
                            data_all.unit_note_unfit_500 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_500 = tbQuantity_
                            break;
                        case '100':
                            data_all.note_unfit_100 = tbAmountValue_
                            data_all.unit_note_unfit_100 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_100 = tbQuantity_
                            // console.log('data_all.pcs_note_unfit_100')
                            // console.log(data_all)
                            break;
                        case '20':
                            data_all.note_unfit_20 = tbAmountValue_
                            data_all.unit_note_unfit_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
                                    // console.log('------------------------------------------')
                                    // console.log('ddlQualityMoneyTypeValue_: ', ddlQualityMoneyTypeValue_)
                                    // console.log('ddlMoneyTypeValue_: ', ddlMoneyTypeValue_)
                                    // console.log('ddlPackageMoneyTypeValue_: ', ddlPackageMoneyTypeValue_)
                                    data_all.coin_unfit_10 = tbAmountValue_
                                    data_all.unit_coin_unfit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_coin_unfit_10 = tbQuantity_
                                    break;
                                default:
                                    data_all.note_unfit_10 = tbAmountValue_
                                    data_all.unit_note_unfit_10 = ddlPackageMoneyTypeValue_
                                    data_all.pcs_note_unfit_10 = tbQuantity_
                            }
                            break;
                        case '5':
                            data_all.coin_unfit_5 = tbAmountValue_
                            data_all.unit_coin_unfit_5 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_5 = tbQuantity_
                            break;
                        case '2':
                            data_all.coin_unfit_2 = tbAmountValue_
                            data_all.unit_coin_unfit_2 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_2 = tbQuantity_
                            break;
                        case '1':
                            data_all.coin_unfit_1 = tbAmountValue_
                            data_all.unit_coin_unfit_1 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_1 = tbQuantity_
                            break;
                        case '0.5':
                            data_all.coin_unfit_05 = tbAmountValue_
                            data_all.unit_coin_unfit_05 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_05 = tbQuantity_
                            break;
                        case '0.25':
                            data_all.coin_unfit_025 = tbAmountValue_
                            data_all.unit_coin_unfit_025 = ddlPackageMoneyTypeValue_
                            data_all.pcs_coin_unfit_025 = tbQuantity_
                            break;
                        default:
                            console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                    }
                    break;//---end Unsort
                default:
                    console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
            }//switch (ddlQualityMoneyTypeValue_) {
        }
        //------------------------------
    }
    data_all.tbGrandTotalAmount = tbGrandTotalAmount
    console.log('edit_order ')
    console.log('data_all final: ', data_all)
    // console.log(data_all)
    dboperations.update_order(data_all).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post('/edit_approveproc', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    let AllRowsDet = parseInt(obj_json['AllRowsDet'])
    console.log('obj_json: ', obj_json)
    console.log('data_all AllRowsDet: ', AllRowsDet)
    // console.log(data_all)

    dboperations.update_approveproc(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getcashorder', urlencodedParser, (req, res) => {
    //let data_ = req.query    
    // let Id = req.query['Id'] 
     console.log('/getcashorder req.query[Id] :',req.query['Id'])
    dboperations.getCashOrder(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/update_cashstatus_order_all', urlencodedParser, (req, res) => {
    console.log('update_cashstatus_order_all req.query[Id]:', req.query['Id'])
    console.log('update_cashstatus_order_all req.query[Id].length:', req.query['Id'].length)
    console.log('update_cashstatus_order_all req.query[Type_]:', req.query['Type_'])
    let output = null
    req.query['Id'].forEach((item) => {
        // console.log(item)
        console.log('update_cashstatus_order_all in array Id: ', parseInt(item))
        dboperations.update_cashstatus_order(parseInt(item), req.query['Type_'], req.query['user_id']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
            }
            else {
                // res.json(result[0])
                output = result[0]
            }
        })
    })
    res.json(output)
    // dboperations.update_cashstatus_order(req.query['Id'], req.query['Type_'], req.query['user_id']).then((result, err) => {
    //     if (err) {
    //         console.log('error: ', err)
    //     }
    //     else {
    //         res.json(result[0])
    //     }
    // })
})
app.get('/update_cashstatus_order', urlencodedParser, (req, res) => {
    // console.log(req.query['Id'])
    // console.log(req.query['Type_'])
    dboperations.update_cashstatus_order(req.query['Id'], req.query['Type_'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/delete_app_proc_det', urlencodedParser, (req, res) => {
    // let data_ = req.body
    // let obj = null
    // for (let x in data_) {
    //     obj = x
    // }
    // let obj_json = JSON.parse(obj)    
    // console.log('obj_json: ',obj_json)
    dboperations.delete_app_proc_det(req.query['Id'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.listen(3344, () => console.log("running on localhost:3344"))

