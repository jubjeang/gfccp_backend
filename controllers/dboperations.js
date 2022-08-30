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
async function getOrdertrackinglist() {
    try {
        let pool = await sql.connect(config);

        let products = await pool.request().query("select c.AutoID,c.TaskId,c.CustomerID,c.CIT_Type,c.[date],c.route_name,c.CL_name,c.CD_name,c.cct_code,c.cct_branch,b.branch_name  from [dbo].[CIT_status_orderCCP] c inner join T_CCT_Monthly_Branch b on c.TaskId=b.TaskId where c.[date]='2022-08-22' and c.CustomerID='2c164463-ef08-4cb6-a200-08e70aece9ae' and c.cct_code='01' and c.route_name='Bangkok-CIT-09'  order by AutoID;");
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
        let NULL_ = "NULL"
        let FLOAT_NULL_ = 0
        let customerID = gfccp_order["customerID"]
        let order_category = gfccp_order["order_category"]
        let servicetype = gfccp_order["servicetype"]        
        let refno = gfccp_order["refno"] !== undefined ? gfccp_order["refno"] : NULL_
        let order_date = gfccp_order["order_date"]
        let branchorigin_name = gfccp_order["branchorigin_name"]
        let branchdest_name = gfccp_order["branchdest_name"]
        let remark = gfccp_order["remark"] !== undefined ? gfccp_order["remark"] : NULL_
        let note_new_1000 = gfccp_order["note_new_1000"] !== undefined ? parseFloat( gfccp_order["note_new_1000"] ) : FLOAT_NULL_
        let note_new_500 = gfccp_order["note_new_500"] !== undefined ? parseFloat( gfccp_order["note_new_500"] ) : FLOAT_NULL_
        let note_new_100 = gfccp_order["note_new_100"] !== undefined ? parseFloat( gfccp_order["note_new_100"] ) : FLOAT_NULL_
        let note_new_50 = gfccp_order["note_new_50"] !== undefined ? parseFloat( gfccp_order["note_new_50"] ) : FLOAT_NULL_
        let note_new_20 = gfccp_order["note_new_20"] !== undefined ? parseFloat( gfccp_order["note_new_20"] ) : FLOAT_NULL_
        let note_new_10 = gfccp_order["note_new_10"] !== undefined ? parseFloat( gfccp_order["note_new_10"] ) : FLOAT_NULL_
        let note_good_1000 = gfccp_order["note_good_1000"] !== undefined ? parseFloat( gfccp_order["note_good_1000"] ) : FLOAT_NULL_
        let note_good_500 = gfccp_order["note_good_500"] !== undefined ? parseFloat( gfccp_order["note_good_500"] ) : FLOAT_NULL_
        let note_good_100 = gfccp_order["note_good_100"] !== undefined ? parseFloat( gfccp_order["note_good_100"] ) : FLOAT_NULL_
        let note_good_50 = gfccp_order["note_good_50"] !== undefined ? parseFloat( gfccp_order["note_good_50"] ) : FLOAT_NULL_
        let note_good_20 = gfccp_order["note_good_20"] !== undefined ? parseFloat( gfccp_order["note_good_20"] ) : FLOAT_NULL_
        let note_good_10 = gfccp_order["note_good_10"] !== undefined ? parseFloat( gfccp_order["note_good_10"] ) : FLOAT_NULL_
        let note_counting_1000 = gfccp_order["note_counting_1000"] !== undefined ? parseFloat( gfccp_order["note_counting_1000"] ) : FLOAT_NULL_
        let note_counting_500 = gfccp_order["note_counting_500"] !== undefined ? parseFloat( gfccp_order["note_counting_500"] ) : FLOAT_NULL_
        let note_counting_100 = gfccp_order["note_counting_100"] !== undefined ? parseFloat( gfccp_order["note_counting_100"] ) : FLOAT_NULL_
        let note_counting_50 = gfccp_order["note_counting_50"] !== undefined ? parseFloat( gfccp_order["note_counting_50"] ) : FLOAT_NULL_
        let note_counting_20 = gfccp_order["note_counting_20"] !== undefined ? parseFloat( gfccp_order["note_counting_20"] ) : FLOAT_NULL_
        let note_counting_10 = gfccp_order["note_counting_10"] !== undefined ? parseFloat( gfccp_order["note_counting_10"] ) : FLOAT_NULL_
        let coin_10 = gfccp_order["coin_10"] !== undefined ? parseFloat( gfccp_order["coin_10"] ) : FLOAT_NULL_
        let coin_5 = gfccp_order["coin_5"] !== undefined ? parseFloat( gfccp_order["coin_5"] ) : FLOAT_NULL_
        let coin_2 = gfccp_order["coin_2"] !== undefined ? parseFloat( gfccp_order["coin_1"] ) : FLOAT_NULL_
        let coin_1 = gfccp_order["coin_1"] !== undefined ? parseFloat( gfccp_order["coin_1"] ) : FLOAT_NULL_
        let coin_05 = gfccp_order["coin_05"] !== undefined ? parseFloat( gfccp_order["coin_05"] ) : FLOAT_NULL_
        let coin_025 = gfccp_order["coin_025"] !== undefined ? parseFloat( gfccp_order["coin_025"] ) : FLOAT_NULL_
        let row_type = 'normal'
        let input_type = 'manual_add'
        let user_id = gfccp_order["user_id"]
        try {
            let pool = await sql.connect(config);
            let add_manual_order = await pool.request()
                .input('customerID', sql.NVarChar, customerID)
                .input('order_category', sql.NVarChar, order_category)
                .input('servicetype', sql.NVarChar, servicetype)
                .input('refno', sql.NVarChar, refno)
                .input('order_date', sql.DateTime, order_date)
                .input('branchorigin_name', sql.NVarChar, branchorigin_name)
                .input('branchdest_name', sql.NVarChar, branchdest_name)                
                .input('remark', sql.NVarChar, remark)
                .input('note_new_1000', sql.Float, note_new_1000)
                .input('note_new_500', sql.Float, note_new_500)
                .input('note_new_100', sql.Float, note_new_100)
                .input('note_new_50', sql.Float, note_new_50)
                .input('note_new_20', sql.Float, note_new_20)
                .input('note_new_10', sql.Float, note_new_10)
                .input('note_good_1000', sql.Float, note_good_1000)
                .input('note_good_500', sql.Float, note_good_500)
                .input('note_good_100', sql.Float, note_good_100)
                .input('note_good_50', sql.Float, note_good_50)
                .input('note_good_20', sql.Float, note_good_20)
                .input('note_good_10', sql.Float, note_good_10)
                .input('note_counting_1000', sql.Float, note_counting_1000)
                .input('note_counting_500', sql.Float, note_counting_500)
                .input('note_counting_100', sql.Float, note_counting_100)
                .input('note_counting_50', sql.Float, note_counting_50)
                .input('note_counting_20', sql.Float, note_counting_20)
                .input('note_counting_10', sql.Float, note_counting_10)
                .input('coin_10', sql.Float, coin_10)
                .input('coin_5', sql.Float, coin_5)
                .input('coin_2', sql.Float, coin_2)
                .input('coin_1', sql.Float, coin_1)
                .input('coin_05', sql.Float, coin_05)
                .input('coin_025', sql.Float, coin_025)
                .input('row_type', sql.NVarChar, row_type)
                .input('input_type', sql.NVarChar, input_type)
                .input('createby', sql.NVarChar, user_id)
                .execute('add_manual_order');
            return add_manual_order.recordsets;
        }
        catch (err) {
            console.log(err);
        }
        return add_manual_order.recordsets   
}
module.exports = {
    getOrdersList: getOrdersList,
    getOrder : getOrder,
    add_gfccp_order_deposit : add_gfccp_order_deposit,
    add_gfccp_order_withdraw : add_gfccp_order_withdraw,
    getBranchData : getBranchData,
    getCashCenterData : getCashCenterData,
    add_manual_order : add_manual_order,
    getOrdertrackinglist : getOrdertrackinglist 
}