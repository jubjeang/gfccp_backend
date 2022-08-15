var config = require('../server/dbconfig');
const sql = require('mssql');


async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT top 10 * from T_CCT_Monthly_Branch");
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
            .input('order_date', sql.DateTime, gfccp_order.order_date)
            .input('order_category', sql.NVarChar, gfccp_order.order_category)
            .input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            .input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            .input('row_type', sql.NVarChar, gfccp_order.row_type)
            .input('attach_file', sql.NVarChar, gfccp_order.attach_file) 
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
            .input('order_date', sql.DateTime, gfccp_order.order_date)
            .input('order_category', sql.NVarChar, gfccp_order.order_category)
            .input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            .input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            .input('row_type', sql.NVarChar, gfccp_order.row_type)
            .input('attach_file', sql.NVarChar, gfccp_order.attach_file) 
            .input('createby', sql.NVarChar, gfccp_order.createby)
            .execute('add_gfccp_order_withdraw');
        return add_gfccp_order_withdraw.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}
module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    add_gfccp_order_deposit : add_gfccp_order_deposit
}