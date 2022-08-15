// import xlsxFile from 'read-excel-file'
const xlsxFile = require('read-excel-file/node');
const dboperations = require('./controllers/dboperations');
const express = require('express')
const fs = require('fs')
const path = require('path')
// const bodyParser = require('body-parser');
// var cors = require('cors');
const multer = require('multer')
const app = express()
// var router = express.Router();
// app.use(bodyParser);
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
    console.log('OrderCategory: ', req.body.OrderCategory)
    console.log('OrderType: ', req.body.OrderType)
    console.log('BankType: ', req.body.BankType)
    console.log('JobDate: ', date_)
    const OrderCategory_ = req.body.OrderCategory
    const servicetype_ = req.body.OrderType
    const customer_no_ = req.body.BankType
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
                                'coin_5': rows[i][11],
                                'coin_2': rows[i][12],
                                'coin_1': rows[i][13],
                                'coin_05': rows[i][14],
                                'coin_025': rows[i][15],
                                'total_by_branch': rows[i][16],
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'createby': 'admin',
                            }
                        }
                        dboperations.add_gfccp_order_deposit(data_).then((result, err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                // console.log(result)
                            }
                        })
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
                                'coin_5': rows[i][11],
                                'coin_2': rows[i][12],
                                'coin_1': rows[i][13],
                                'coin_05': rows[i][14],
                                'coin_025': rows[i][15],
                                'total_by_branch': rows[i][16],
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'row_type': 'summary',
                                'attach_file': fileName,
                                'createby': 'admin',
                            }
                        }
                    }
                    dboperations.add_gfccp_order_deposit(data_).then((result, err) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            // console.log(result)
                        }
                    })
                }
                console.log(rows[i][16])

            }
        }        
    })
    console.log(fileName)
})
app.listen(3344, () => console.log("running on localhost:3344"))

