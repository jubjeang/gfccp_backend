// import xlsxFile from 'read-excel-file'
const xlsxFile = require('read-excel-file/node');
const dboperations = require('./controllers/dboperations');
const express = require('express')
// const fs = require('fs')
// const path = require('path')
// const bodyParser = require('body-parser')
// const bodyParser = require('body-parser');
// var cors = require('cors');
const multer = require('multer')
const app = express()
// var router = express.Router();
// app.use(bodyParser);
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
var fileName
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

app.post('/upload', upload.single('file'), (req, res) => {
    dboperations.getOrder(12443).then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            //console.log(result)
        }
    })
    res.json({
        file: req.file,
        OrderCategory: req.body.OrderCategory,
        OrderType: req.body.OrderType,
        BankType: req.body.BankType,
        JobDate: req.body.JobDate
    })
    console.log(req.body.OrderType)//1=Withdraw; 2=Deposit
    const date_ = new Date(req.body.JobDate)
    console.log('file: ', req.file)
    console.log('req.file.originalname: ', req.file.originalname)
    console.log('OrderCategory: ', req.body.OrderCategory)
    console.log('OrderType: ', req.body.OrderType)
    console.log('BankType: ', req.body.BankType)
    console.log('JobDate: ', date_)
    const OrderCategory_ = req.body.OrderCategory
    const servicetype_ = req.body.OrderType
    const customer_no_ = req.body.BankType
    let attach_file_origin = req.file.originalname
    let data_
    xlsxFile('./uploads/' + fileName).then((rows) => {
        for (i in rows) {
            if (i >= 2) {
                if (rows[i][2] === '**คอลั่มน์ที่ซ่อนไว้ไม่สามารถลบออกได้') { break }
                if (rows[i][3] !== 'ยอดรวม') {
                    if (rows[i][3] !== null) {
                        if (servicetype_ === 'Deposit') {
                            data_ = {
                                'branch_code': rows[i][2],
                                'branch_name': rows[i][3],
                                'note_counting_1000': rows[i][4],
                                'note_counting_500': rows[i][5],
                                'note_counting_100': rows[i][6],
                                'note_counting_50': rows[i][7],
                                'note_counting_20': rows[i][8],
                                'note_counting_10': rows[i][9],
                                'coin_10': rows[i][10],
                                'coin_5': checkvalue(rows[i][11], 'float'),
                                'coin_2': rows[i][12],
                                'coin_1': rows[i][13],
                                'coin_05': rows[i][14],
                                'coin_025': rows[i][15],
                                'total_by_branch': rows[i][16],
                                'remark': checkvalue(rows[i][17], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': 'admin',
                            }
                            dboperations.add_gfccp_order_deposit(data_).then((result, err) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    // console.log(result)
                                }
                            })
                            console.log('data_: ', data_)
                            console.log('servicetype_: ', servicetype_)
                        }
                        if (servicetype_ === 'Withdraw') {
                            data_ = {
                                'branch_code': rows[i][2],
                                'branch_name': rows[i][3],
                                'note_new_1000': rows[i][4],
                                'note_good_1000': rows[i][5],
                                'note_new_500': rows[i][6],
                                'note_good_500': rows[i][7],
                                'note_new_100': rows[i][8],
                                'note_good_100': rows[i][9],
                                'note_new_50': rows[i][10],
                                'note_good_50': rows[i][11],
                                'note_new_20': rows[i][12],
                                'note_good_20': rows[i][13],
                                'note_new_10': rows[i][14],
                                'note_good_10': rows[i][15],
                                'coin_10': rows[i][16],
                                'coin_5': rows[i][17],
                                'coin_2': rows[i][18],
                                'coin_1': rows[i][19],
                                'coin_05': rows[i][20],
                                'coin_025': rows[i][21],
                                'total_by_branch': rows[i][22],
                                'remark': checkvalue(rows[i][23], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': 'admin',
                            }
                            dboperations.add_gfccp_order_withdraw(data_).then((result, err) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    // console.log(result)
                                }
                            })
                            console.log('servicetype_: ', servicetype_)
                        }
                    }
                }
                if (rows[i][3] === 'ยอดรวม') {
                    if (rows[i][3] !== null) {
                        if (servicetype_ === 'Deposit') {
                            data_ = {
                                'branch_code': rows[i][2],
                                'branch_name': rows[i][3],
                                'note_counting_1000': rows[i][4],
                                'note_counting_500': rows[i][5],
                                'note_counting_100': rows[i][6],
                                'note_counting_50': rows[i][7],
                                'note_counting_20': rows[i][8],
                                'note_counting_10': rows[i][9],
                                'coin_10': rows[i][10],
                                'coin_5': checkvalue(rows[i][11], 'float'),
                                'coin_2': rows[i][12],
                                'coin_1': rows[i][13],
                                'coin_05': rows[i][14],
                                'coin_025': rows[i][15],
                                'total_by_branch': rows[i][16],
                                'remark': checkvalue(rows[i][17], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'summary',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': 'admin',
                            }
                            dboperations.add_gfccp_order_deposit(data_).then((result, err) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    // console.log(result)
                                }
                            })
                            console.log('servicetype_: ', servicetype_)
                        }
                        if (servicetype_ === 'Withdraw') {
                            data_ = {
                                'branch_code': rows[i][2],
                                'branch_name': rows[i][3],
                                'note_new_1000': rows[i][4],
                                'note_good_1000': rows[i][5],
                                'note_new_500': rows[i][6],
                                'note_good_500': rows[i][7],
                                'note_new_100': rows[i][8],
                                'note_good_100': rows[i][9],
                                'note_new_50': rows[i][10],
                                'note_good_50': rows[i][11],
                                'note_new_20': rows[i][12],
                                'note_good_20': rows[i][13],
                                'note_new_10': rows[i][14],
                                'note_good_10': rows[i][15],
                                'coin_10': rows[i][16],
                                'coin_5': rows[i][17],
                                'coin_2': rows[i][18],
                                'coin_1': rows[i][19],
                                'coin_05': rows[i][20],
                                'coin_025': rows[i][21],
                                'total_by_branch': rows[i][22],
                                'remark': checkvalue(rows[i][23], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': 'admin',
                            }
                            dboperations.add_gfccp_order_withdraw(data_).then((result, err) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    // console.log(result)
                                }
                            })
                            console.log('servicetype_: ', servicetype_)
                        }
                    }
                }
                console.log(rows[i][16])
            }
        }
    })
    console.log(fileName)
})
app.get('/orderlist', (req, res) => {
    dboperations.getOrdersList().then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getbranchdata', (req, res) => {
    dboperations.getBranchData().then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getcashcenterdata', (req, res) => {
    dboperations.getCashCenterData().then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result[0])
        }
    })
})

// create application/x-www-form-urlencoded parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/manual_add_order', urlencodedParser, (req, res) => {
    let data_ = req.body
    let i = 0;
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    //console.log(obj_json);
    let data_header = {
        'customerID': '899704cb-5844-4f97-93bc-880e288e4d1c',
        'order_category': obj_json['OrderCategoryNew'],
        'servicetype': obj_json['OrderTypeNew'],
        'refno': obj_json['RefNo'],        
        'order_date': obj_json['JobDateNew'],
        'branchorigin_name': obj_json['BranchOrigin'],
        //'branchdest_code': obj_json['branchdest_code'],
        'branchdest_name': obj_json['BranchDest'],
        'remark': obj_json['RemarkNew'],
    }
    data_det = []
    let AllRowsDet = parseInt(obj_json['AllRowsDet'])
    for (var index = 1; index <= AllRowsDet; index++) {
        //------------------------------------
        let ddlMoneyTypeName_ = 'ddlMoneyType' + index
        let ddlMoneyTypeValue_ = obj_json['ddlMoneyType' + index]

        let ddlQualityMoneyTypeName_ = 'ddlQualityMoneyType' + index
        let ddlQualityMoneyTypeValue_ = obj_json['ddlQualityMoneyType' + index]

        let ddlPackageMoneyTypeName_ = 'ddlPackageMoneyType' + index
        let ddlPackageMoneyTypeValue_ = obj_json['ddlPackageMoneyType' + index]

        let tbQuantityName_ = 'tbQuantity' + index
        let tbQuantityeValue_ = obj_json['tbQuantity' + index]

        let tbAmountName_ = 'tbAmount' + index
        let tbAmountValue_ = obj_json['tbAmount' + index]
        let my_object_data = {}
        //------------------------------
        switch (ddlQualityMoneyTypeValue_) {
            case 'New':
                switch (ddlMoneyTypeValue_) {
                    case '1000':
                        my_object_data = {
                            note_new_1000: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_new_1000=tbAmountValue_
                        //data_header.unit=ddlPackageMoneyTypeValue_
                        break;
                    case '500':
                        my_object_data = {
                            note_new_500: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_new_500=tbAmountValue_
                        break;
                    case '100':
                        my_object_data = {
                            note_new_100: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_new_100=tbAmountValue_
                        break;
                    case '20':
                        my_object_data = {
                            note_new_20: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_new_20=tbAmountValue_
                        break;
                    case '10':
                        switch (ddlPackageMoneyTypeValue_) {
                            case 'Coin':
                                my_object_data = {
                                    coin_10: tbAmountValue_,
                                    unit: ddlPackageMoneyTypeValue_,
                                }
                                data_header.coin_10=tbAmountValue_
                                break;
                            default:
                                my_object_data = {
                                    note_new_10: tbAmountValue_,
                                    unit: ddlPackageMoneyTypeValue_,
                                }
                                data_header.note_new_10=tbAmountValue_
                        }
                        break;
                    case '5':
                        my_object_data = {
                            coin_5: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_5=tbAmountValue_
                        break;
                    case '2':
                        my_object_data = {
                            coin_2: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_2=tbAmountValue_
                        break;
                    case '1':
                        my_object_data = {
                            coin_1: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_1=tbAmountValue_
                        break;
                    case '0.5':
                        my_object_data = {
                            coin_05: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_05=tbAmountValue_
                        break;
                    case '0.25':
                        my_object_data = {
                            coin_025: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_025=tbAmountValue_
                        break;
                    default:
                        console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                }
                break;//---end New
            case 'Good':
                switch (ddlMoneyTypeValue_) {
                    case '1000':
                        my_object_data = {
                            note_good_1000: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_good_1000=tbAmountValue_
                        break;
                    case '500':
                        my_object_data = {
                            note_good_500: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_good_500=tbAmountValue_
                        break;
                    case '100':
                        my_object_data = {
                            note_good_100: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_good_100=tbAmountValue_
                        break;
                    case '20':
                        my_object_data = {
                            note_good_20: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_good_20=tbAmountValue_
                        break;
                    case '10':
                        switch (ddlPackageMoneyTypeValue_) {
                            case 'Coin':
                                my_object_data = {
                                    coin_10: tbAmountValue_,
                                    unit: ddlPackageMoneyTypeValue_,
                                }
                                data_header.coin_10=tbAmountValue_
                                break;
                            default:
                                my_object_data = {
                                    note_good_10: tbAmountValue_,
                                    unit: ddlPackageMoneyTypeValue_,
                                }
                                data_header.note_good_10=tbAmountValue_
                        }
                        break;
                    case '5':
                        my_object_data = {
                            coin_5: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_5=tbAmountValue_
                        break;
                    case '2':
                        my_object_data = {
                            coin_2: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_2=tbAmountValue_
                        break;
                    case '1':
                        my_object_data = {
                            coin_1: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_1=tbAmountValue_
                        break;
                    case '0.5':
                        my_object_data = {
                            coin_05: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_05=tbAmountValue_
                        break;
                    case '0.25':
                        my_object_data = {
                            coin_025: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_025=tbAmountValue_
                        break;
                    default:
                        console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                }
                break;//---end Good
            case 'Unsort':
                switch (ddlMoneyTypeValue_) {
                    case '1000':
                        my_object_data = {
                            note_counting_1000: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_counting_1000=tbAmountValue_
                        break;
                    case '500':
                        my_object_data = {
                            note_counting_500: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_counting_500=tbAmountValue_
                        break;
                    case '100':
                        my_object_data = {
                            note_counting_100: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_counting_100=tbAmountValue_
                        break;
                    case '20':
                        my_object_data = {
                            note_counting_20: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.note_counting_20=tbAmountValue_
                        break;
                    case '10':
                        switch (ddlPackageMoneyTypeValue_) {
                            case 'Coin':
                                my_object_data = {
                                    coin_10: tbAmountValue_,
                                    unit: ddlPackageMoneyTypeValue_,
                                }
                                data_header.coin_10=tbAmountValue_
                                break;
                            default:
                                my_object_data = {
                                    note_counting_10: tbAmountValue_,
                                    unit: ddlPackageMoneyTypeValue_,
                                }
                                data_header.note_counting_10=tbAmountValue_
                        }
                        break;
                    case '5':
                        my_object_data = {
                            coin_5: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_5=tbAmountValue_
                        break;
                    case '2':
                        my_object_data = {
                            coin_2: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_2=tbAmountValue_
                        break;
                    case '1':
                        my_object_data = {
                            coin_1: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_1=tbAmountValue_
                        break;
                    case '0.5':
                        my_object_data = {
                            coin_05: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_05=tbAmountValue_
                        break;
                    case '0.25':
                        my_object_data = {
                            coin_025: tbAmountValue_,
                            unit: ddlPackageMoneyTypeValue_,
                        }
                        data_header.coin_025=tbAmountValue_
                        break;
                    default:
                        console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
                }
                break;//---end Unsort
            default:
                console.log(`Sorry, we are out of ${ddlQualityMoneyTypeValue_}.`);
        }//switch (ddlQualityMoneyTypeValue_) {
        //------------------------------
        // let my_object = {
        //     ddlMoneyTypeName_: ddlMoneyTypeValue_,
        //     ddlQualityMoneyTypeName_: ddlQualityMoneyTypeValue_,
        //     ddlPackageMoneyTypeName_: ddlPackageMoneyTypeValue_,
        //     tbQuantityName_: tbQuantityeValue_,
        //     tbAmountName_: tbAmountValue_
        // };
        // data_det.push(my_object)
        data_det.push(my_object_data)
    }
    let data_det_json = JSON.stringify(data_det)
    console.log( data_header )
    // console.log(JSON.parse(data_det_json))
    dboperations.add_manual_order( data_header ).then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result[0])
        }
    })
})
app.listen(3344, () => console.log("running on localhost:3344"))
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

