// import xlsxFile from 'read-excel-file'
const xlsxFile = require('read-excel-file/node');
const dboperations = require('./controllers/dboperations');
const express = require('express')
const multer = require('multer')
const app = express()
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
    // dboperations.getOrder(12443).then((result, err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         //console.log(result)
    //     }
    // })
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
    const gfc_cct = req.body.gfc_cct
    const user_id = req.body.user_id
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
                                'branchorigin_code': rows[i][2],
                                'branchorigin_name': rows[i][3],
                                'branchdest_code': '',
                                'branchdest_name': gfc_cct,
                                'note_uncount_1000': rows[i][4],
                                'note_uncount_500': rows[i][5],
                                'note_uncount_100': rows[i][6],
                                'note_uncount_50': rows[i][7],
                                'note_uncount_20': rows[i][8],
                                'note_uncount_10': rows[i][9],
                                'coin_fit_10': rows[i][10],
                                'coin_fit_5': checkvalue(rows[i][11], 'float'),
                                'coin_fit_2': rows[i][12],
                                'coin_fit_1': rows[i][13],
                                'coin_fit_05': rows[i][14],
                                'coin_fit_025': rows[i][15],
                                'total_by_branch': rows[i][16],
                                'remark': checkvalue(rows[i][17], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': user_id,
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
                                'branchorigin_code': '',
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
                                'coin_fit_10': rows[i][16],
                                'coin_fit_5': rows[i][17],
                                'coin_fit_2': rows[i][18],
                                'coin_fit_1': rows[i][19],
                                'coin_fit_05': rows[i][20],
                                'coin_fit_025': rows[i][21],
                                'total_by_branch': rows[i][22],
                                'remark': checkvalue(rows[i][23], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': user_id,
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
                                'branchorigin_code': rows[i][2],
                                'branchorigin_name': rows[i][3],
                                'branchdest_code': '',
                                'branchdest_name': gfc_cct,
                                'note_uncount_1000': rows[i][4],
                                'note_uncount_500': rows[i][5],
                                'note_uncount_100': rows[i][6],
                                'note_uncount_50': rows[i][7],
                                'note_uncount_20': rows[i][8],
                                'note_uncount_10': rows[i][9],
                                'coin_fit_10': rows[i][10],
                                'coin_fit_5': checkvalue(rows[i][11], 'float'),
                                'coin_fit_2': rows[i][12],
                                'coin_fit_1': rows[i][13],
                                'coin_fit_05': rows[i][14],
                                'coin_fit_025': rows[i][15],
                                'total_by_branch': rows[i][16],
                                'remark': checkvalue(rows[i][17], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'summary',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': user_id,
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
                                'branchorigin_code': '',
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
                                'coin_fit_10': rows[i][16],
                                'coin_fit_5': rows[i][17],
                                'coin_fit_2': rows[i][18],
                                'coin_fit_1': rows[i][19],
                                'coin_fit_05': rows[i][20],
                                'coin_fit_025': rows[i][21],
                                'total_by_branch': rows[i][22],
                                'remark': checkvalue(rows[i][23], 'string'),
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'summary',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'createby': user_id,
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
app.get('/ordertrackinglist', (req, res) => {
    dboperations.getOrdertrackinglist().then((result, err) => {
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
app.post('/checkUser', urlencodedParser, (req, res) => {
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
    console.log(data_all)
    dboperations.checkUser(data_all).then((result, err) => {
        if (err) {
            console.log(err)
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
        'customerID': '899704cb-5844-4f97-93bc-880e288e4d1c',
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
    console.log('AllRowsDet: ' + AllRowsDet)
    let tbGrandTotalAmount = 0
    for (var index = 1; index <= AllRowsDet; index++) {
        //------------------------------------   
        if (obj_json['ddlMoneyType' + index]) {
            let ddlMoneyTypeValue_ = obj_json['ddlMoneyType' + index]//ชนิดราคา
            let ddlQualityMoneyTypeValue_ = obj_json['ddlQualityMoneyType' + index]//คุณภาพเงิน
            let ddlPackageMoneyTypeValue_ = obj_json['ddlPackageMoneyType' + index]//หน่วย
            let tbQuantity_ = obj_json['tbQuantity' + index]//จำนวน
            let tbAmountValue_ = obj_json['tbAmount' + index].replaceAll(',', '')//ยอดรวม
            console.log('tbAmountValue_: ', tbAmountValue_)
            tbAmountValue_ = parseFloat(tbAmountValue_)
            tbGrandTotalAmount += tbAmountValue_
            console.log('obj_json[tbAmount + index]: ', obj_json['tbAmount' + index])
            console.log('parseFloat( obj_json[tbAmount + index] ): ', parseFloat(obj_json['tbAmount' + index]))
            console.log('ddlPackageMoneyTypeValue_ : ', ddlPackageMoneyTypeValue_)
            //------------------------------
            switch (ddlQualityMoneyTypeValue_) {
                case 'New':
                    switch (ddlMoneyTypeValue_) {
                        case '1000':
                            data_all.note_new_1000 = tbAmountValue_
                            data_all.unit_note_new_1000 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_new_1000 = tbQuantity_
                            console.log(data_all)
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
                case 'Good':
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
                case 'Unsort':
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
                            break;
                        case '20':
                            data_all.note_unfit_20 = tbAmountValue_
                            data_all.unit_note_unfit_20 = ddlPackageMoneyTypeValue_
                            data_all.pcs_note_unfit_20 = tbQuantity_
                            break;
                        case '10':
                            switch (ddlPackageMoneyTypeValue_) {
                                case 'Coin':
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
    console.log(data_all)
    dboperations.add_manual_order(data_all).then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getcashorder', urlencodedParser, (req, res) => {
    //let data_ = req.query    
    // let Id = req.query['Id'] 
    console.log(req.query['Id'])
    dboperations.getCashOrder(req.query['Id']).then((result, err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result[0])
        }
    })
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
app.listen(3344, () => console.log("running on localhost:3344"))

