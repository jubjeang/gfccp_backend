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

        let products = await pool.request().query("select AutoID as branch_id,[name] as branch_name from [dbo].[T_GFC_Branch] where [name] in (select gfc_cct from [dbo].[T_Branch] where CustomerID='899704cb-5844-4f97-93bc-880e288e4d1c' group by gfc_cct);");
        //let products = await pool.request().query("select gfc_cct as branch_id ,gfc_cct as branch_name from [dbo].[T_Branch] where CustomerID='899704cb-5844-4f97-93bc-880e288e4d1c' group by gfc_cct  order by gfc_cct;");        
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

        // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(branch_name))<>'ยอดรวม' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) order by AutoID desc");
        let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) order by AutoID desc");
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
async function getCashOrder(Id) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_id', sql.Int, Id)
            .query("select * from [dbo].[gfccp_order] where AutoID = @input_id");
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
            .input('branchorigin_code', sql.NVarChar, gfccp_order.branchorigin_code)
            .input('branchorigin_name', sql.NVarChar, gfccp_order.branchorigin_name)
            .input('branchdest_code', sql.NVarChar, gfccp_order.branchdest_code)
            .input('branchdest_name', sql.NVarChar, gfccp_order.branchdest_name)
            .input('note_uncount_1000', sql.Float, gfccp_order.note_uncount_1000)
            .input('note_uncount_500', sql.Float, gfccp_order.note_uncount_500)
            .input('note_uncount_100', sql.Float, gfccp_order.note_uncount_100)
            .input('note_uncount_50', sql.Float, gfccp_order.note_uncount_50)
            .input('note_uncount_20', sql.Float, gfccp_order.note_uncount_20)
            .input('note_uncount_10', sql.Float, gfccp_order.note_uncount_10)
            .input('coin_fit_10', sql.Float, gfccp_order.coin_fit_10)
            .input('coin_fit_5', sql.Float, gfccp_order.coin_fit_5)
            .input('coin_fit_2', sql.Float, gfccp_order.coin_fit_2)
            .input('coin_fit_1', sql.Float, gfccp_order.coin_fit_1)
            .input('coin_fit_05', sql.Float, gfccp_order.coin_fit_05)
            .input('coin_fit_025', sql.Float, gfccp_order.coin_fit_025)
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
            .input('branchorigin_code', sql.NVarChar, gfccp_order.branchorigin_code)
            .input('branchorigin_name', sql.NVarChar, gfccp_order.branchorigin_name)
            .input('branchdest_code', sql.NVarChar, gfccp_order.branchdest_code)
            .input('branchdest_name', sql.NVarChar, gfccp_order.branchdest_name)
            .input('note_new_1000', sql.Float, gfccp_order.note_new_1000)
            .input('note_fit_1000', sql.Float, gfccp_order.note_fit_1000)
            .input('note_new_500', sql.Float, gfccp_order.note_new_500)
            .input('note_fit_500', sql.Float, gfccp_order.note_fit_500)
            .input('note_new_100', sql.Float, gfccp_order.note_new_100)
            .input('note_fit_100', sql.Float, gfccp_order.note_fit_100)
            .input('note_new_50', sql.Float, gfccp_order.note_new_50)
            .input('note_fit_50', sql.Float, gfccp_order.note_fit_50)
            .input('note_new_20', sql.Float, gfccp_order.note_new_20)
            .input('note_fit_20', sql.Float, gfccp_order.note_fit_20)
            .input('note_new_10', sql.Float, gfccp_order.note_new_10)
            .input('note_fit_10', sql.Float, gfccp_order.note_fit_10)
            .input('coin_fit_10', sql.Float, gfccp_order.coin_fit_10)
            .input('coin_fit_5', sql.Float, gfccp_order.coin_fit_5)
            .input('coin_fit_2', sql.Float, gfccp_order.coin_fit_2)
            .input('coin_fit_1', sql.Float, gfccp_order.coin_fit_1)
            .input('coin_fit_05', sql.Float, gfccp_order.coin_fit_05)
            .input('coin_fit_025', sql.Float, gfccp_order.coin_fit_025)
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
async function checkUser(data_all) {
    let jobid = data_all["jobid"]
    let password = data_all["password"]
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('username', sql.NVarChar, jobid)
            .input('password', sql.NVarChar, password)
            .query("SELECT * from users where username = @username and password = @password");
        return product.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
async function add_manual_order(gfccp_order) {
    let NULL_ = null
    let FLOAT_NULL_ = 0
    let customerID = gfccp_order["customerID"]
    let order_category = gfccp_order["order_category"]
    let servicetype = gfccp_order["servicetype"]
    let refno = gfccp_order["refno"] !== undefined ? gfccp_order["refno"] : NULL_
    let order_date = gfccp_order["order_date"]
    let branchorigin_code = gfccp_order["branchorigin_code"]
    let branchorigin_name = gfccp_order["branchorigin_name"]
    let branchdest_code = gfccp_order["branchdest_code"]
    let branchdest_name = gfccp_order["branchdest_name"]
    let remark = gfccp_order["remark"] !== undefined ? gfccp_order["remark"] : NULL_
    //---note
    let note_new_1000 = gfccp_order["note_new_1000"] !== undefined ? parseFloat(gfccp_order["note_new_1000"]) : FLOAT_NULL_
    let note_new_500 = gfccp_order["note_new_500"] !== undefined ? parseFloat(gfccp_order["note_new_500"]) : FLOAT_NULL_
    let note_new_100 = gfccp_order["note_new_100"] !== undefined ? parseFloat(gfccp_order["note_new_100"]) : FLOAT_NULL_
    let note_new_50 = gfccp_order["note_new_50"] !== undefined ? parseFloat(gfccp_order["note_new_50"]) : FLOAT_NULL_
    let note_new_20 = gfccp_order["note_new_20"] !== undefined ? parseFloat(gfccp_order["note_new_20"]) : FLOAT_NULL_
    let note_new_10 = gfccp_order["note_new_10"] !== undefined ? parseFloat(gfccp_order["note_new_10"]) : FLOAT_NULL_
    let note_fit_1000 = gfccp_order["note_fit_1000"] !== undefined ? parseFloat(gfccp_order["note_fit_1000"]) : FLOAT_NULL_
    let note_fit_500 = gfccp_order["note_fit_500"] !== undefined ? parseFloat(gfccp_order["note_fit_500"]) : FLOAT_NULL_
    let note_fit_100 = gfccp_order["note_fit_100"] !== undefined ? parseFloat(gfccp_order["note_fit_100"]) : FLOAT_NULL_
    let note_fit_50 = gfccp_order["note_fit_50"] !== undefined ? parseFloat(gfccp_order["note_fit_50"]) : FLOAT_NULL_
    let note_fit_20 = gfccp_order["note_fit_20"] !== undefined ? parseFloat(gfccp_order["note_fit_20"]) : FLOAT_NULL_
    let note_fit_10 = gfccp_order["note_fit_10"] !== undefined ? parseFloat(gfccp_order["note_fit_10"]) : FLOAT_NULL_
    let note_uncount_1000 = gfccp_order["note_uncount_1000"] !== undefined ? parseFloat(gfccp_order["note_uncount_1000"]) : FLOAT_NULL_
    let note_uncount_500 = gfccp_order["note_uncount_500"] !== undefined ? parseFloat(gfccp_order["note_uncount_500"]) : FLOAT_NULL_
    let note_uncount_100 = gfccp_order["note_uncount_100"] !== undefined ? parseFloat(gfccp_order["note_uncount_100"]) : FLOAT_NULL_
    let note_uncount_50 = gfccp_order["note_uncount_50"] !== undefined ? parseFloat(gfccp_order["note_uncount_50"]) : FLOAT_NULL_
    let note_uncount_20 = gfccp_order["note_uncount_20"] !== undefined ? parseFloat(gfccp_order["note_uncount_20"]) : FLOAT_NULL_
    let note_uncount_10 = gfccp_order["note_uncount_10"] !== undefined ? parseFloat(gfccp_order["note_uncount_10"]) : FLOAT_NULL_
    let note_unfit_1000 = gfccp_order["note_unfit_1000"] !== undefined ? parseFloat(gfccp_order["note_unfit_1000"]) : FLOAT_NULL_
    let note_unfit_500 = gfccp_order["note_unfit_500"] !== undefined ? parseFloat(gfccp_order["note_unfit_500"]) : FLOAT_NULL_
    let note_unfit_100 = gfccp_order["note_unfit_100"] !== undefined ? parseFloat(gfccp_order["note_unfit_100"]) : FLOAT_NULL_
    let note_unfit_50 = gfccp_order["note_unfit_50"] !== undefined ? parseFloat(gfccp_order["note_unfit_50"]) : FLOAT_NULL_
    let note_unfit_20 = gfccp_order["note_unfit_20"] !== undefined ? parseFloat(gfccp_order["note_unfit_20"]) : FLOAT_NULL_
    let note_unfit_10 = gfccp_order["note_unfit_10"] !== undefined ? parseFloat(gfccp_order["note_unfit_10"]) : FLOAT_NULL_
    //----coin
    let coin_new_10 = gfccp_order["coin_new_10"] !== undefined ? parseFloat(gfccp_order["coin_new_10"]) : FLOAT_NULL_
    let coin_new_5 = gfccp_order["coin_new_5"] !== undefined ? parseFloat(gfccp_order["coin_new_5"]) : FLOAT_NULL_
    let coin_new_2 = gfccp_order["coin_new_2"] !== undefined ? parseFloat(gfccp_order["coin_new_1"]) : FLOAT_NULL_
    let coin_new_1 = gfccp_order["coin_new_1"] !== undefined ? parseFloat(gfccp_order["coin_new_1"]) : FLOAT_NULL_
    let coin_new_05 = gfccp_order["coin_new_05"] !== undefined ? parseFloat(gfccp_order["coin_new_05"]) : FLOAT_NULL_
    let coin_new_025 = gfccp_order["coin_new_025"] !== undefined ? parseFloat(gfccp_order["coin_new_025"]) : FLOAT_NULL_
    let coin_fit_10 = gfccp_order["coin_fit_10"] !== undefined ? parseFloat(gfccp_order["coin_fit_10"]) : FLOAT_NULL_
    let coin_fit_5 = gfccp_order["coin_fit_5"] !== undefined ? parseFloat(gfccp_order["coin_fit_5"]) : FLOAT_NULL_
    let coin_fit_2 = gfccp_order["coin_fit_2"] !== undefined ? parseFloat(gfccp_order["coin_fit_1"]) : FLOAT_NULL_
    let coin_fit_1 = gfccp_order["coin_fit_1"] !== undefined ? parseFloat(gfccp_order["coin_fit_1"]) : FLOAT_NULL_
    let coin_fit_05 = gfccp_order["coin_fit_05"] !== undefined ? parseFloat(gfccp_order["coin_fit_05"]) : FLOAT_NULL_
    let coin_fit_025 = gfccp_order["coin_fit_025"] !== undefined ? parseFloat(gfccp_order["coin_fit_025"]) : FLOAT_NULL_
    let coin_uncount_10 = gfccp_order["coin_uncount_10"] !== undefined ? parseFloat(gfccp_order["coin_uncount_10"]) : FLOAT_NULL_
    let coin_uncount_5 = gfccp_order["coin_uncount_5"] !== undefined ? parseFloat(gfccp_order["coin_uncount_5"]) : FLOAT_NULL_
    let coin_uncount_2 = gfccp_order["coin_uncount_2"] !== undefined ? parseFloat(gfccp_order["coin_uncount_1"]) : FLOAT_NULL_
    let coin_uncount_1 = gfccp_order["coin_uncount_1"] !== undefined ? parseFloat(gfccp_order["coin_uncount_1"]) : FLOAT_NULL_
    let coin_uncount_05 = gfccp_order["coin_uncount_05"] !== undefined ? parseFloat(gfccp_order["coin_uncount_05"]) : FLOAT_NULL_
    let coin_uncount_025 = gfccp_order["coin_uncount_025"] !== undefined ? parseFloat(gfccp_order["coin_uncount_025"]) : FLOAT_NULL_
    let coin_unfit_10 = gfccp_order["coin_unfit_10"] !== undefined ? parseFloat(gfccp_order["coin_unfit_10"]) : FLOAT_NULL_
    let coin_unfit_5 = gfccp_order["coin_unfit_5"] !== undefined ? parseFloat(gfccp_order["coin_unfit_5"]) : FLOAT_NULL_
    let coin_unfit_2 = gfccp_order["coin_unfit_2"] !== undefined ? parseFloat(gfccp_order["coin_unfit_1"]) : FLOAT_NULL_
    let coin_unfit_1 = gfccp_order["coin_unfit_1"] !== undefined ? parseFloat(gfccp_order["coin_unfit_1"]) : FLOAT_NULL_
    let coin_unfit_05 = gfccp_order["coin_unfit_05"] !== undefined ? parseFloat(gfccp_order["coin_unfit_05"]) : FLOAT_NULL_
    let coin_unfit_025 = gfccp_order["coin_unfit_025"] !== undefined ? parseFloat(gfccp_order["coin_unfit_025"]) : FLOAT_NULL_
    //----pcs
    //---pcs note
    let pcs_note_new_1000 = gfccp_order["pcs_note_new_1000"] !== undefined ? parseFloat(gfccp_order["pcs_note_new_1000"]) : FLOAT_NULL_
    let pcs_note_new_500 = gfccp_order["pcs_note_new_500"] !== undefined ? parseFloat(gfccp_order["pcs_note_new_500"]) : FLOAT_NULL_
    let pcs_note_new_100 = gfccp_order["pcs_note_new_100"] !== undefined ? parseFloat(gfccp_order["pcs_note_new_100"]) : FLOAT_NULL_
    let pcs_note_new_50 = gfccp_order["pcs_note_new_50"] !== undefined ? parseFloat(gfccp_order["pcs_note_new_50"]) : FLOAT_NULL_
    let pcs_note_new_20 = gfccp_order["pcs_note_new_20"] !== undefined ? parseFloat(gfccp_order["pcs_note_new_20"]) : FLOAT_NULL_
    let pcs_note_new_10 = gfccp_order["pcs_note_new_10"] !== undefined ? parseFloat(gfccp_order["pcs_note_new_10"]) : FLOAT_NULL_
    let pcs_note_fit_1000 = gfccp_order["pcs_note_fit_1000"] !== undefined ? parseFloat(gfccp_order["pcs_note_fit_1000"]) : FLOAT_NULL_
    let pcs_note_fit_500 = gfccp_order["pcs_note_fit_500"] !== undefined ? parseFloat(gfccp_order["pcs_note_fit_500"]) : FLOAT_NULL_
    let pcs_note_fit_100 = gfccp_order["pcs_note_fit_100"] !== undefined ? parseFloat(gfccp_order["pcs_note_fit_100"]) : FLOAT_NULL_
    let pcs_note_fit_50 = gfccp_order["pcs_note_fit_50"] !== undefined ? parseFloat(gfccp_order["pcs_note_fit_50"]) : FLOAT_NULL_
    let pcs_note_fit_20 = gfccp_order["pcs_note_fit_20"] !== undefined ? parseFloat(gfccp_order["pcs_note_fit_20"]) : FLOAT_NULL_
    let pcs_note_fit_10 = gfccp_order["pcs_note_fit_10"] !== undefined ? parseFloat(gfccp_order["pcs_note_fit_10"]) : FLOAT_NULL_
    let pcs_note_uncount_1000 = gfccp_order["pcs_note_uncount_1000"] !== undefined ? parseFloat(gfccp_order["pcs_note_uncount_1000"]) : FLOAT_NULL_
    let pcs_note_uncount_500 = gfccp_order["pcs_note_uncount_500"] !== undefined ? parseFloat(gfccp_order["pcs_note_uncount_500"]) : FLOAT_NULL_
    let pcs_note_uncount_100 = gfccp_order["pcs_note_uncount_100"] !== undefined ? parseFloat(gfccp_order["pcs_note_uncount_100"]) : FLOAT_NULL_
    let pcs_note_uncount_50 = gfccp_order["pcs_note_uncount_50"] !== undefined ? parseFloat(gfccp_order["pcs_note_uncount_50"]) : FLOAT_NULL_
    let pcs_note_uncount_20 = gfccp_order["pcs_note_uncount_20"] !== undefined ? parseFloat(gfccp_order["pcs_note_uncount_20"]) : FLOAT_NULL_
    let pcs_note_uncount_10 = gfccp_order["pcs_note_uncount_10"] !== undefined ? parseFloat(gfccp_order["pcs_note_uncount_10"]) : FLOAT_NULL_
    let pcs_note_unfit_1000 = gfccp_order["pcs_note_unfit_1000"] !== undefined ? parseFloat(gfccp_order["pcs_note_unfit_1000"]) : FLOAT_NULL_
    let pcs_note_unfit_500 = gfccp_order["pcs_note_unfit_500"] !== undefined ? parseFloat(gfccp_order["pcs_note_unfit_500"]) : FLOAT_NULL_
    let pcs_note_unfit_100 = gfccp_order["pcs_note_unfit_100"] !== undefined ? parseFloat(gfccp_order["pcs_note_unfit_100"]) : FLOAT_NULL_
    let pcs_note_unfit_50 = gfccp_order["pcs_note_unfit_50"] !== undefined ? parseFloat(gfccp_order["pcs_note_unfit_50"]) : FLOAT_NULL_
    let pcs_note_unfit_20 = gfccp_order["pcs_note_unfit_20"] !== undefined ? parseFloat(gfccp_order["pcs_note_unfit_20"]) : FLOAT_NULL_
    let pcs_note_unfit_10 = gfccp_order["pcs_note_unfit_10"] !== undefined ? parseFloat(gfccp_order["pcs_note_unfit_10"]) : FLOAT_NULL_
    //----pcs coin
    let pcs_coin_new_10 = gfccp_order["pcs_coin_new_10"] !== undefined ? parseFloat(gfccp_order["pcs_coin_new_10"]) : FLOAT_NULL_
    let pcs_coin_new_5 = gfccp_order["pcs_coin_new_5"] !== undefined ? parseFloat(gfccp_order["pcs_coin_new_5"]) : FLOAT_NULL_
    let pcs_coin_new_2 = gfccp_order["pcs_coin_new_2"] !== undefined ? parseFloat(gfccp_order["pcs_coin_new_1"]) : FLOAT_NULL_
    let pcs_coin_new_1 = gfccp_order["pcs_coin_new_1"] !== undefined ? parseFloat(gfccp_order["pcs_coin_new_1"]) : FLOAT_NULL_
    let pcs_coin_new_05 = gfccp_order["pcs_coin_new_05"] !== undefined ? parseFloat(gfccp_order["pcs_coin_new_05"]) : FLOAT_NULL_
    let pcs_coin_new_025 = gfccp_order["pcs_coin_new_025"] !== undefined ? parseFloat(gfccp_order["pcs_coin_new_025"]) : FLOAT_NULL_
    let pcs_coin_fit_10 = gfccp_order["pcs_coin_fit_10"] !== undefined ? parseFloat(gfccp_order["pcs_coin_fit_10"]) : FLOAT_NULL_
    let pcs_coin_fit_5 = gfccp_order["pcs_coin_fit_5"] !== undefined ? parseFloat(gfccp_order["pcs_coin_fit_5"]) : FLOAT_NULL_
    let pcs_coin_fit_2 = gfccp_order["pcs_coin_fit_2"] !== undefined ? parseFloat(gfccp_order["pcs_coin_fit_1"]) : FLOAT_NULL_
    let pcs_coin_fit_1 = gfccp_order["pcs_coin_fit_1"] !== undefined ? parseFloat(gfccp_order["pcs_coin_fit_1"]) : FLOAT_NULL_
    let pcs_coin_fit_05 = gfccp_order["pcs_coin_fit_05"] !== undefined ? parseFloat(gfccp_order["pcs_coin_fit_05"]) : FLOAT_NULL_
    let pcs_coin_fit_025 = gfccp_order["pcs_coin_fit_025"] !== undefined ? parseFloat(gfccp_order["pcs_coin_fit_025"]) : FLOAT_NULL_
    let pcs_coin_uncount_10 = gfccp_order["pcs_coin_uncount_10"] !== undefined ? parseFloat(gfccp_order["pcs_coin_uncount_10"]) : FLOAT_NULL_
    let pcs_coin_uncount_5 = gfccp_order["pcs_coin_uncount_5"] !== undefined ? parseFloat(gfccp_order["pcs_coin_uncount_5"]) : FLOAT_NULL_
    let pcs_coin_uncount_2 = gfccp_order["pcs_coin_uncount_2"] !== undefined ? parseFloat(gfccp_order["pcs_coin_uncount_1"]) : FLOAT_NULL_
    let pcs_coin_uncount_1 = gfccp_order["pcs_coin_uncount_1"] !== undefined ? parseFloat(gfccp_order["pcs_coin_uncount_1"]) : FLOAT_NULL_
    let pcs_coin_uncount_05 = gfccp_order["pcs_coin_uncount_05"] !== undefined ? parseFloat(gfccp_order["pcs_coin_uncount_05"]) : FLOAT_NULL_
    let pcs_coin_uncount_025 = gfccp_order["pcs_coin_uncount_025"] !== undefined ? parseFloat(gfccp_order["pcs_coin_uncount_025"]) : FLOAT_NULL_
    let pcs_coin_unfit_10 = gfccp_order["pcs_coin_unfit_10"] !== undefined ? parseFloat(gfccp_order["pcs_coin_unfit_10"]) : FLOAT_NULL_
    let pcs_coin_unfit_5 = gfccp_order["pcs_coin_unfit_5"] !== undefined ? parseFloat(gfccp_order["pcs_coin_unfit_5"]) : FLOAT_NULL_
    let pcs_coin_unfit_2 = gfccp_order["pcs_coin_unfit_2"] !== undefined ? parseFloat(gfccp_order["pcs_coin_unfit_1"]) : FLOAT_NULL_
    let pcs_coin_unfit_1 = gfccp_order["pcs_coin_unfit_1"] !== undefined ? parseFloat(gfccp_order["pcs_coin_unfit_1"]) : FLOAT_NULL_
    let pcs_coin_unfit_05 = gfccp_order["pcs_coin_unfit_05"] !== undefined ? parseFloat(gfccp_order["pcs_coin_unfit_05"]) : FLOAT_NULL_
    let pcs_coin_unfit_025 = gfccp_order["pcs_coin_unfit_025"] !== undefined ? parseFloat(gfccp_order["pcs_coin_unfit_025"]) : FLOAT_NULL_
    //----unit
    //---unit note
    let unit_note_new_1000 = gfccp_order["unit_note_new_1000"] !== undefined ?gfccp_order["unit_note_new_1000"] : NULL_
    let unit_note_new_500 = gfccp_order["unit_note_new_500"] !== undefined ?gfccp_order["unit_note_new_500"] : NULL_
    let unit_note_new_100 = gfccp_order["unit_note_new_100"] !== undefined ?gfccp_order["unit_note_new_100"] : NULL_
    let unit_note_new_50 = gfccp_order["unit_note_new_50"] !== undefined ?gfccp_order["unit_note_new_50"] : NULL_
    let unit_note_new_20 = gfccp_order["unit_note_new_20"] !== undefined ?gfccp_order["unit_note_new_20"] : NULL_
    let unit_note_new_10 = gfccp_order["unit_note_new_10"] !== undefined ?gfccp_order["unit_note_new_10"] : NULL_
    let unit_note_fit_1000 = gfccp_order["unit_note_fit_1000"] !== undefined ?gfccp_order["unit_note_fit_1000"] : NULL_
    let unit_note_fit_500 = gfccp_order["unit_note_fit_500"] !== undefined ?gfccp_order["unit_note_fit_500"] : NULL_
    let unit_note_fit_100 = gfccp_order["unit_note_fit_100"] !== undefined ?gfccp_order["unit_note_fit_100"] : NULL_
    let unit_note_fit_50 = gfccp_order["unit_note_fit_50"] !== undefined ?gfccp_order["unit_note_fit_50"] : NULL_
    let unit_note_fit_20 = gfccp_order["unit_note_fit_20"] !== undefined ?gfccp_order["unit_note_fit_20"] : NULL_
    let unit_note_fit_10 = gfccp_order["unit_note_fit_10"] !== undefined ?gfccp_order["unit_note_fit_10"] : NULL_
    let unit_note_uncount_1000 = gfccp_order["unit_note_uncount_1000"] !== undefined ?gfccp_order["unit_note_uncount_1000"] : NULL_
    let unit_note_uncount_500 = gfccp_order["unit_note_uncount_500"] !== undefined ?gfccp_order["unit_note_uncount_500"] : NULL_
    let unit_note_uncount_100 = gfccp_order["unit_note_uncount_100"] !== undefined ?gfccp_order["unit_note_uncount_100"] : NULL_
    let unit_note_uncount_50 = gfccp_order["unit_note_uncount_50"] !== undefined ?gfccp_order["unit_note_uncount_50"] : NULL_
    let unit_note_uncount_20 = gfccp_order["unit_note_uncount_20"] !== undefined ?gfccp_order["unit_note_uncount_20"] : NULL_
    let unit_note_uncount_10 = gfccp_order["unit_note_uncount_10"] !== undefined ?gfccp_order["unit_note_uncount_10"] : NULL_
    let unit_note_unfit_1000 = gfccp_order["unit_note_unfit_1000"] !== undefined ?gfccp_order["unit_note_unfit_1000"] : NULL_
    let unit_note_unfit_500 = gfccp_order["unit_note_unfit_500"] !== undefined ?gfccp_order["unit_note_unfit_500"] : NULL_
    let unit_note_unfit_100 = gfccp_order["unit_note_unfit_100"] !== undefined ?gfccp_order["unit_note_unfit_100"] : NULL_
    let unit_note_unfit_50 = gfccp_order["unit_note_unfit_50"] !== undefined ?gfccp_order["unit_note_unfit_50"] : NULL_
    let unit_note_unfit_20 = gfccp_order["unit_note_unfit_20"] !== undefined ?gfccp_order["unit_note_unfit_20"] : NULL_
    let unit_note_unfit_10 = gfccp_order["unit_note_unfit_10"] !== undefined ?gfccp_order["unit_note_unfit_10"] : NULL_
    //----unit coin
    let unit_coin_new_10 = gfccp_order["unit_coin_new_10"] !== undefined ?gfccp_order["unit_coin_new_10"] : NULL_
    let unit_coin_new_5 = gfccp_order["unit_coin_new_5"] !== undefined ?gfccp_order["unit_coin_new_5"] : NULL_
    let unit_coin_new_2 = gfccp_order["unit_coin_new_2"] !== undefined ?gfccp_order["unit_coin_new_1"] : NULL_
    let unit_coin_new_1 = gfccp_order["unit_coin_new_1"] !== undefined ?gfccp_order["unit_coin_new_1"] : NULL_
    let unit_coin_new_05 = gfccp_order["unit_coin_new_05"] !== undefined ?gfccp_order["unit_coin_new_05"] : NULL_
    let unit_coin_new_025 = gfccp_order["unit_coin_new_025"] !== undefined ?gfccp_order["unit_coin_new_025"] : NULL_
    let unit_coin_fit_10 = gfccp_order["unit_coin_fit_10"] !== undefined ?gfccp_order["unit_coin_fit_10"] : NULL_
    let unit_coin_fit_5 = gfccp_order["unit_coin_fit_5"] !== undefined ?gfccp_order["unit_coin_fit_5"] : NULL_
    let unit_coin_fit_2 = gfccp_order["unit_coin_fit_2"] !== undefined ?gfccp_order["unit_coin_fit_1"] : NULL_
    let unit_coin_fit_1 = gfccp_order["unit_coin_fit_1"] !== undefined ?gfccp_order["unit_coin_fit_1"] : NULL_
    let unit_coin_fit_05 = gfccp_order["unit_coin_fit_05"] !== undefined ?gfccp_order["unit_coin_fit_05"] : NULL_
    let unit_coin_fit_025 = gfccp_order["unit_coin_fit_025"] !== undefined ?gfccp_order["unit_coin_fit_025"] : NULL_
    let unit_coin_uncount_10 = gfccp_order["unit_coin_uncount_10"] !== undefined ?gfccp_order["unit_coin_uncount_10"] : NULL_
    let unit_coin_uncount_5 = gfccp_order["unit_coin_uncount_5"] !== undefined ?gfccp_order["unit_coin_uncount_5"] : NULL_
    let unit_coin_uncount_2 = gfccp_order["unit_coin_uncount_2"] !== undefined ?gfccp_order["unit_coin_uncount_1"] : NULL_
    let unit_coin_uncount_1 = gfccp_order["unit_coin_uncount_1"] !== undefined ?gfccp_order["unit_coin_uncount_1"] : NULL_
    let unit_coin_uncount_05 = gfccp_order["unit_coin_uncount_05"] !== undefined ?gfccp_order["unit_coin_uncount_05"] : NULL_
    let unit_coin_uncount_025 = gfccp_order["unit_coin_uncount_025"] !== undefined ?gfccp_order["unit_coin_uncount_025"] : NULL_
    let unit_coin_unfit_10 = gfccp_order["unit_coin_unfit_10"] !== undefined ?gfccp_order["unit_coin_unfit_10"] : NULL_
    let unit_coin_unfit_5 = gfccp_order["unit_coin_unfit_5"] !== undefined ?gfccp_order["unit_coin_unfit_5"] : NULL_
    let unit_coin_unfit_2 = gfccp_order["unit_coin_unfit_2"] !== undefined ?gfccp_order["unit_coin_unfit_1"] : NULL_
    let unit_coin_unfit_1 = gfccp_order["unit_coin_unfit_1"] !== undefined ?gfccp_order["unit_coin_unfit_1"] : NULL_
    let unit_coin_unfit_05 = gfccp_order["unit_coin_unfit_05"] !== undefined ?gfccp_order["unit_coin_unfit_05"] : NULL_
    let unit_coin_unfit_025 = gfccp_order["unit_coin_unfit_025"] !== undefined ?gfccp_order["unit_coin_unfit_025"] : NULL_

    let row_type = 'normal'
    let input_type = 'manual_add'
    let user_id = gfccp_order["user_id"]
    let tbGrandTotalAmount = gfccp_order["tbGrandTotalAmount"]
    console.log(unit_note_new_1000)
    console.log(note_new_1000)
    try {
        let pool = await sql.connect(config);
        let add_manual_order = await pool.request()
            .input('customerID', sql.NVarChar, customerID)
            .input('order_category', sql.NVarChar, order_category)
            .input('servicetype', sql.NVarChar, servicetype)
            .input('refno', sql.NVarChar, refno)
            .input('order_date', sql.DateTime, order_date)
            .input('branchorigin_code', sql.NVarChar, branchorigin_code)
            .input('branchorigin_name', sql.NVarChar, branchorigin_name)
            .input('branchdest_code', sql.NVarChar, branchdest_code)
            .input('branchdest_name', sql.NVarChar, branchdest_name)
            .input('remark', sql.NVarChar, remark)
            //---note
            .input('note_new_1000', sql.Float, note_new_1000)
            .input('note_new_500', sql.Float, note_new_500)
            .input('note_new_100', sql.Float, note_new_100)
            .input('note_new_50', sql.Float, note_new_50)
            .input('note_new_20', sql.Float, note_new_20)
            .input('note_new_10', sql.Float, note_new_10)
            .input('note_fit_1000', sql.Float, note_fit_1000)
            .input('note_fit_500', sql.Float, note_fit_500)
            .input('note_fit_100', sql.Float, note_fit_100)
            .input('note_fit_50', sql.Float, note_fit_50)
            .input('note_fit_20', sql.Float, note_fit_20)
            .input('note_fit_10', sql.Float, note_fit_10)
            .input('note_uncount_1000', sql.Float, note_uncount_1000)
            .input('note_uncount_500', sql.Float, note_uncount_500)
            .input('note_uncount_100', sql.Float, note_uncount_100)
            .input('note_uncount_50', sql.Float, note_uncount_50)
            .input('note_uncount_20', sql.Float, note_uncount_20)
            .input('note_uncount_10', sql.Float, note_uncount_10)
            .input('note_unfit_1000', sql.Float, note_unfit_1000)
            .input('note_unfit_500', sql.Float, note_unfit_500)
            .input('note_unfit_100', sql.Float, note_unfit_100)
            .input('note_unfit_50', sql.Float, note_unfit_50)
            .input('note_unfit_20', sql.Float, note_unfit_20)
            .input('note_unfit_10', sql.Float, note_unfit_10)
            //----coin
            .input('coin_new_10', sql.Float, coin_new_10)
            .input('coin_new_5', sql.Float, coin_new_5)
            .input('coin_new_2', sql.Float, coin_new_2)
            .input('coin_new_1', sql.Float, coin_new_1)
            .input('coin_new_05', sql.Float, coin_new_05)
            .input('coin_new_025', sql.Float, coin_new_025)
            .input('coin_fit_10', sql.Float, coin_fit_10)
            .input('coin_fit_5', sql.Float, coin_fit_5)
            .input('coin_fit_2', sql.Float, coin_fit_2)
            .input('coin_fit_1', sql.Float, coin_fit_1)
            .input('coin_fit_05', sql.Float, coin_fit_05)
            .input('coin_fit_025', sql.Float, coin_fit_025)
            .input('coin_uncount_10', sql.Float, coin_uncount_10)
            .input('coin_uncount_5', sql.Float, coin_uncount_5)
            .input('coin_uncount_2', sql.Float, coin_uncount_2)
            .input('coin_uncount_1', sql.Float, coin_uncount_1)
            .input('coin_uncount_05', sql.Float, coin_uncount_05)
            .input('coin_uncount_025', sql.Float, coin_uncount_025)
            .input('coin_unfit_10', sql.Float, coin_unfit_10)
            .input('coin_unfit_5', sql.Float, coin_unfit_5)
            .input('coin_unfit_2', sql.Float, coin_unfit_2)
            .input('coin_unfit_1', sql.Float, coin_unfit_1)
            .input('coin_unfit_05', sql.Float, coin_unfit_05)
            .input('coin_unfit_025', sql.Float, coin_unfit_025)
            //----pcs 
            .input('pcs_note_new_1000', sql.Float, pcs_note_new_1000)
            .input('pcs_note_new_500', sql.Float, pcs_note_new_500)
            .input('pcs_note_new_100', sql.Float, pcs_note_new_100)
            .input('pcs_note_new_50', sql.Float, pcs_note_new_50)
            .input('pcs_note_new_20', sql.Float, pcs_note_new_20)
            .input('pcs_note_new_10', sql.Float, pcs_note_new_10)
            .input('pcs_note_fit_1000', sql.Float, pcs_note_fit_1000)
            .input('pcs_note_fit_500', sql.Float, pcs_note_fit_500)
            .input('pcs_note_fit_100', sql.Float, pcs_note_fit_100)
            .input('pcs_note_fit_50', sql.Float, pcs_note_fit_50)
            .input('pcs_note_fit_20', sql.Float, pcs_note_fit_20)
            .input('pcs_note_fit_10', sql.Float, pcs_note_fit_10)
            .input('pcs_note_uncount_1000', sql.Float, pcs_note_uncount_1000)
            .input('pcs_note_uncount_500', sql.Float, pcs_note_uncount_500)
            .input('pcs_note_uncount_100', sql.Float, pcs_note_uncount_100)
            .input('pcs_note_uncount_50', sql.Float, pcs_note_uncount_50)
            .input('pcs_note_uncount_20', sql.Float, pcs_note_uncount_20)
            .input('pcs_note_uncount_10', sql.Float, pcs_note_uncount_10)
            .input('pcs_note_unfit_1000', sql.Float, pcs_note_unfit_1000)
            .input('pcs_note_unfit_500', sql.Float, pcs_note_unfit_500)
            .input('pcs_note_unfit_100', sql.Float, pcs_note_unfit_100)
            .input('pcs_note_unfit_50', sql.Float, pcs_note_unfit_50)
            .input('pcs_note_unfit_20', sql.Float, pcs_note_unfit_20)
            .input('pcs_note_unfit_10', sql.Float, pcs_note_unfit_10)
            .input('pcs_coin_new_10', sql.Float, pcs_coin_new_10)
            .input('pcs_coin_new_5', sql.Float, pcs_coin_new_5)
            .input('pcs_coin_new_2', sql.Float, pcs_coin_new_2)
            .input('pcs_coin_new_1', sql.Float, pcs_coin_new_1)
            .input('pcs_coin_new_05', sql.Float, pcs_coin_new_05)
            .input('pcs_coin_new_025', sql.Float, pcs_coin_new_025)
            .input('pcs_coin_fit_10', sql.Float, pcs_coin_fit_10)
            .input('pcs_coin_fit_5', sql.Float, pcs_coin_fit_5)
            .input('pcs_coin_fit_2', sql.Float, pcs_coin_fit_2)
            .input('pcs_coin_fit_1', sql.Float, pcs_coin_fit_1)
            .input('pcs_coin_fit_05', sql.Float, pcs_coin_fit_05)
            .input('pcs_coin_fit_025', sql.Float, pcs_coin_fit_025)
            .input('pcs_coin_uncount_10', sql.Float, pcs_coin_uncount_10)
            .input('pcs_coin_uncount_5', sql.Float, pcs_coin_uncount_5)
            .input('pcs_coin_uncount_2', sql.Float, pcs_coin_uncount_2)
            .input('pcs_coin_uncount_1', sql.Float, pcs_coin_uncount_1)
            .input('pcs_coin_uncount_05', sql.Float, pcs_coin_uncount_05)
            .input('pcs_coin_uncount_025', sql.Float, pcs_coin_uncount_025)
            .input('pcs_coin_unfit_10', sql.Float, pcs_coin_unfit_10)
            .input('pcs_coin_unfit_5', sql.Float, pcs_coin_unfit_5)
            .input('pcs_coin_unfit_2', sql.Float, pcs_coin_unfit_2)
            .input('pcs_coin_unfit_1', sql.Float, pcs_coin_unfit_1)
            .input('pcs_coin_unfit_05', sql.Float, pcs_coin_unfit_05)
            .input('pcs_coin_unfit_025', sql.Float, pcs_coin_unfit_025)
            //----unit
            .input('unit_note_new_1000', sql.NVarChar, unit_note_new_1000)
            .input('unit_note_new_500', sql.NVarChar, unit_note_new_500)
            .input('unit_note_new_100', sql.NVarChar, unit_note_new_100)
            .input('unit_note_new_50', sql.NVarChar, unit_note_new_50)
            .input('unit_note_new_20', sql.NVarChar, unit_note_new_20)
            .input('unit_note_new_10', sql.NVarChar, unit_note_new_10)
            .input('unit_note_fit_1000', sql.NVarChar, unit_note_fit_1000)
            .input('unit_note_fit_500', sql.NVarChar, unit_note_fit_500)
            .input('unit_note_fit_100', sql.NVarChar, unit_note_fit_100)
            .input('unit_note_fit_50', sql.NVarChar, unit_note_fit_50)
            .input('unit_note_fit_20', sql.NVarChar, unit_note_fit_20)
            .input('unit_note_fit_10', sql.NVarChar, unit_note_fit_10)
            .input('unit_note_uncount_1000', sql.NVarChar, unit_note_uncount_1000)
            .input('unit_note_uncount_500', sql.NVarChar, unit_note_uncount_500)
            .input('unit_note_uncount_100', sql.NVarChar, unit_note_uncount_100)
            .input('unit_note_uncount_50', sql.NVarChar, unit_note_uncount_50)
            .input('unit_note_uncount_20', sql.NVarChar, unit_note_uncount_20)
            .input('unit_note_uncount_10', sql.NVarChar, unit_note_uncount_10)
            .input('unit_note_unfit_1000', sql.NVarChar, unit_note_unfit_1000)
            .input('unit_note_unfit_500', sql.NVarChar, unit_note_unfit_500)
            .input('unit_note_unfit_100', sql.NVarChar, unit_note_unfit_100)
            .input('unit_note_unfit_50', sql.NVarChar, unit_note_unfit_50)
            .input('unit_note_unfit_20', sql.NVarChar, unit_note_unfit_20)
            .input('unit_note_unfit_10', sql.NVarChar, unit_note_unfit_10)
            .input('unit_coin_new_10', sql.NVarChar, unit_coin_new_10)
            .input('unit_coin_new_5', sql.NVarChar, unit_coin_new_5)
            .input('unit_coin_new_2', sql.NVarChar, unit_coin_new_2)
            .input('unit_coin_new_1', sql.NVarChar, unit_coin_new_1)
            .input('unit_coin_new_05', sql.NVarChar, unit_coin_new_05)
            .input('unit_coin_new_025', sql.NVarChar, unit_coin_new_025)
            .input('unit_coin_fit_10', sql.NVarChar, unit_coin_fit_10)
            .input('unit_coin_fit_5', sql.NVarChar, unit_coin_fit_5)
            .input('unit_coin_fit_2', sql.NVarChar, unit_coin_fit_2)
            .input('unit_coin_fit_1', sql.NVarChar, unit_coin_fit_1)
            .input('unit_coin_fit_05', sql.NVarChar, unit_coin_fit_05)
            .input('unit_coin_fit_025', sql.NVarChar, unit_coin_fit_025)
            .input('unit_coin_uncount_10', sql.NVarChar, unit_coin_uncount_10)
            .input('unit_coin_uncount_5', sql.NVarChar, unit_coin_uncount_5)
            .input('unit_coin_uncount_2', sql.NVarChar, unit_coin_uncount_2)
            .input('unit_coin_uncount_1', sql.NVarChar, unit_coin_uncount_1)
            .input('unit_coin_uncount_05', sql.NVarChar, unit_coin_uncount_05)
            .input('unit_coin_uncount_025', sql.NVarChar, unit_coin_uncount_025)
            .input('unit_coin_unfit_10', sql.NVarChar, unit_coin_unfit_10)
            .input('unit_coin_unfit_5', sql.NVarChar, unit_coin_unfit_5)
            .input('unit_coin_unfit_2', sql.NVarChar, unit_coin_unfit_2)
            .input('unit_coin_unfit_1', sql.NVarChar, unit_coin_unfit_1)
            .input('unit_coin_unfit_05', sql.NVarChar, unit_coin_unfit_05)
            .input('unit_coin_unfit_025', sql.NVarChar, unit_coin_unfit_025)
            .input('total_by_branch', sql.Float, tbGrandTotalAmount)
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
    getOrder: getOrder,
    add_gfccp_order_deposit: add_gfccp_order_deposit,
    add_gfccp_order_withdraw: add_gfccp_order_withdraw,
    getBranchData: getBranchData,
    getCashCenterData: getCashCenterData,
    add_manual_order: add_manual_order,
    getOrdertrackinglist: getOrdertrackinglist,
    checkUser: checkUser,
    getCashOrder: getCashOrder
}