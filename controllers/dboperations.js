var config = require('../server/dbconfig');
const sql = require('mssql');

async function getBranchData() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("select branch_id,branch_name from [dbo].[T_Branch] where CustomerID='899704cb-5844-4f97-93bc-880e288e4d1c' order by branch_id;");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getCashCenterData() {
    try {
        let pool = await sql.connect(config);

        let products = await pool.request().query("select gfc_cct as branch_id ,gfc_cct as branch_name from [dbo].[T_Branch] where CustomerID='899704cb-5844-4f97-93bc-880e288e4d1c' group by gfc_cct  order by gfc_cct;");
        // let products = await pool.request().query("select * from gfccp_order where branch_name<>'ยอดรวม' order by AutoID;");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getOrdersList() {
    try {
        let pool = await sql.connect(config);

        let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(branch_name))<>'ยอดรวม' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) order by AutoID desc");
        // let products = await pool.request().query("select * from gfccp_order where branch_name<>'ยอดรวม' order by AutoID;");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function getOrder(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, orderId)
            .query("SELECT * from T_CCT_Monthly_Branch where AutoId = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
async function add_gfccp_order_deposit(gfccp_order) { 
    try {
        let pool = await sql.connect(config);
        let add_gfccp_order_deposit = await pool.request()
            .input('branch_code', sql.NVarChar, gfccp_order.branch_code)
            .input('branch_name', sql.NVarChar, gfccp_order.branch_name)
            .input('note_counting_1000', sql.Float, gfccp_order.note_counting_1000)
            .input('note_counting_500', sql.Float, gfccp_order.note_counting_500)
            .input('note_counting_100', sql.Float, gfccp_order.note_counting_100)
            .input('note_counting_50', sql.Float, gfccp_order.note_counting_50)
            .input('note_counting_20', sql.Float, gfccp_order.note_counting_20)            
            .input('note_counting_10', sql.Float, gfccp_order.note_counting_10)
            .input('coin_10', sql.Float, gfccp_order.coin_10)
            .input('coin_5', sql.Float, gfccp_order.coin_5)
            .input('coin_2', sql.Float, gfccp_order.coin_2)
            .input('coin_1', sql.Float, gfccp_order.coin_1)
            .input('coin_05', sql.Float, gfccp_order.coin_05)
            .input('coin_025', sql.Float, gfccp_order.coin_025)
            .input('total_by_branch', sql.Float, gfccp_order.total_by_branch)
            .input('remark', sql.NVarChar, gfccp_order.remark)
            .input('order_date', sql.DateTime, gfccp_order.order_date)
            .input('order_category', sql.NVarChar, gfccp_order.order_category)
            .input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            .input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            .input('row_type', sql.NVarChar, gfccp_order.row_type)
            .input('attach_file', sql.NVarChar, gfccp_order.attach_file)
            .input('attach_file_origin', sql.NVarChar, gfccp_order.attach_file_origin)
            .input('createby', sql.NVarChar, gfccp_order.createby)
            .execute('add_gfccp_order_deposit');
        return add_gfccp_order_deposit.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function add_gfccp_order_withdraw(gfccp_order) {
    try {
        let pool = await sql.connect(config);
        let add_gfccp_order_withdraw = await pool.request()
            .input('branch_code', sql.NVarChar, gfccp_order.branch_code)
            .input('branch_name', sql.NVarChar, gfccp_order.branch_name)
            .input('note_new_1000', sql.Float, gfccp_order.note_new_1000)
            .input('note_good_1000', sql.Float, gfccp_order.note_good_1000)
            .input('note_new_500', sql.Float, gfccp_order.note_new_500)
            .input('note_good_500', sql.Float, gfccp_order.note_good_500)
            .input('note_new_100', sql.Float, gfccp_order.note_new_100)            
            .input('note_good_100', sql.Float, gfccp_order.note_good_100)
            .input('note_new_50', sql.Float, gfccp_order.note_new_50)
            .input('note_good_50', sql.Float, gfccp_order.note_good_50)
            .input('note_new_20', sql.Float, gfccp_order.note_new_20)
            .input('note_good_20', sql.Float, gfccp_order.note_good_20)
            .input('note_new_10', sql.Float, gfccp_order.note_new_10)            
            .input('note_good_10', sql.Float, gfccp_order.note_good_10)
            .input('coin_10', sql.Float, gfccp_order.coin_10)
            .input('coin_5', sql.Float, gfccp_order.coin_5)
            .input('coin_2', sql.Float, gfccp_order.coin_2)
            .input('coin_1', sql.Float, gfccp_order.coin_1)
            .input('coin_05', sql.Float, gfccp_order.coin_05)
            .input('coin_025', sql.Float, gfccp_order.coin_025)
            .input('total_by_branch', sql.Float, gfccp_order.total_by_branch)
            .input('remark', sql.NVarChar, gfccp_order.remark)
            .input('order_date', sql.DateTime, gfccp_order.order_date)
            .input('order_category', sql.NVarChar, gfccp_order.order_category)
            .input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            .input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            .input('row_type', sql.NVarChar, gfccp_order.row_type)
            .input('attach_file', sql.NVarChar, gfccp_order.attach_file) 
            .input('attach_file_origin', sql.NVarChar, gfccp_order.attach_file_origin)
            .input('createby', sql.NVarChar, gfccp_order.createby)
            .execute('add_gfccp_order_withdraw');
        return add_gfccp_order_withdraw.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}
async function add_manual_order(gfccp_order)
{
    try {
        let pool = await sql.connect(config);
        // Object.keys(gfccp_order).forEach(function(key) {
        //     console.log('Key : ' + key + ', Value : ' + gfccp_order[key])
        //     console.log('typeof Key : ' + (typeof key) + ', typeof Value : ' + (typeof gfccp_order[key] ) )
        //   })
        // return gfccp_order
        var add_manual_order = await pool.request()
        Object.keys(gfccp_order).forEach(function(key) { 
            let key_ = key
            let value_ = gfccp_order[key]
            if( ( key_.substr(0, 4) ==='note' ) || ( key_.substr(0, 4) === 'coin' ) ){
                //console.log('Key : ' + key + ', Value : ' + gfccp_order[key])
                add_manual_order.input(key_, sql.Float, value_)
            }
            else if( key_ ==='order_date' )
            {
                add_manual_order.input(key_, sql.DateTime, value_)
            }
            else{
                add_manual_order.input(key_, sql.NVarChar, value_)
            }
        })
        add_manual_order.execute('add_manual_order')        
        console.log( add_manual_order )
        return gfccp_order//add_manual_order.recordsets
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    getOrdersList: getOrdersList,
    getOrder : getOrder,
    add_gfccp_order_deposit : add_gfccp_order_deposit,
    add_gfccp_order_withdraw : add_gfccp_order_withdraw,
    getBranchData : getBranchData,
    getCashCenterData : getCashCenterData,
    add_manual_order : add_manual_order
}