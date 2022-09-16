class gfccp_order {
    constructor(customer_no
        , customer_type
        , branch_code
        , branch_name
        , branchorigin_code
        , branchorigin_name
        , branchdest_code
        , branchdest_name
        , refno
        , input_type
        , CustomerID
        , servicetype

        , note_new_1000
        , unit_note_new_1000
        , pcs_note_new_1000
        , note_new_500
        , unit_note_new_500
        , pcs_note_new_500
        , note_new_100
        , unit_note_new_100
        , pcs_note_new_100
        , note_new_50
        , unit_note_new_50
        , pcs_note_new_50
        , note_new_20
        , unit_note_new_20
        , pcs_note_new_20
        , note_new_10
        , unit_note_new_10
        , pcs_note_new_10

        , note_fit_1000
        , unit_note_fit_1000
        , pcs_note_fit_1000
        , note_fit_500
        , unit_note_fit_500
        , pcs_note_fit_500
        , note_fit_100
        , unit_note_fit_100
        , pcs_note_fit_100
        , note_fit_50
        , unit_note_fit_50
        , pcs_note_fit_50
        , note_fit_20
        , unit_note_fit_20
        , pcs_note_fit_20
        , note_fit_10
        , unit_note_fit_10
        , pcs_note_fit_10

        , note_unfit_1000
        , unit_note_unfit_1000
        , pcs_note_unfit_1000
        , note_unfit_500
        , unit_note_unfit_500
        , pcs_note_unfit_500
        , note_unfit_100
        , unit_note_unfit_100
        , pcs_note_unfit_100
        , note_unfit_50
        , unit_note_unfit_50
        , pcs_note_unfit_50
        , note_unfit_20
        , unit_note_unfit_20
        , pcs_note_unfit_20
        , note_unfit_10
        , unit_note_unfit_10
        , pcs_note_unfit_10

        , note_uncount_1000
        , unit_note_uncount_1000
        , pcs_note_uncount_1000
        , note_uncount_500
        , unit_note_uncount_500
        , pcs_note_uncount_500
        , note_uncount_100
        , unit_note_uncount_100
        , pcs_note_uncount_100
        , note_uncount_50
        , unit_note_uncount_50
        , pcs_note_uncount_50
        , note_uncount_20
        , unit_note_uncount_20
        , pcs_note_uncount_20
        , note_uncount_10
        , unit_note_uncount_10
        , pcs_note_uncount_10
//-------------------------------------
        , coin_new_10
        , unit_coin_new_10
        , pcs_coin_new_10
        , coin_new_5
        , unit_coin_new_5
        , pcs_coin_new_5
        , coin_new_2
        , unit_coin_new_2
        , pcs_coin_new_2
        , coin_new_1
        , unit_coin_new_1
        , pcs_coin_new_1
        , coin_new_05
        , unit_coin_new_05
        , pcs_coin_new_05
        , coin_new_025
        , unit_coin_new_025
        , pcs_coin_new_025

        , coin_fit_10
        , unit_coin_fit_10
        , pcs_coin_fit_10
        , coin_fit_5
        , unit_coin_fit_5
        , pcs_coin_fit_5
        , coin_fit_2
        , unit_coin_fit_2
        , pcs_coin_fit_2
        , coin_fit_1
        , unit_coin_fit_1
        , pcs_coin_fit_1
        , coin_fit_05
        , unit_coin_fit_05
        , pcs_coin_fit_05
        , coin_fit_025
        , unit_coin_fit_025
        , pcs_coin_fit_025

        , coin_unfit_10
        , unit_coin_unfit_10
        , pcs_coin_unfit_10
        , coin_unfit_5
        , unit_coin_unfit_5
        , pcs_coin_unfit_5
        , coin_unfit_2
        , unit_coin_unfit_2
        , pcs_coin_unfit_2
        , coin_unfit_1
        , unit_coin_unfit_1
        , pcs_coin_unfit_1
        , coin_unfit_05
        , unit_coin_unfit_05
        , pcs_coin_unfit_05
        , coin_unfit_025
        , unit_coin_unfit_025
        , pcs_coin_unfit_025

        , coin_uncount_10
        , unit_coin_uncount_10
        , pcs_coin_uncount_10
        , coin_uncount_5
        , unit_coin_uncount_5
        , pcs_coin_uncount_5
        , coin_uncount_2
        , unit_coin_uncount_2
        , pcs_coin_uncount_2
        , coin_uncount_1
        , unit_coin_uncount_1
        , pcs_coin_uncount_1
        , coin_uncount_05
        , unit_coin_uncount_05
        , pcs_coin_uncount_05
        , coin_uncount_025
        , unit_coin_uncount_025
        , pcs_coin_uncount_025

        , row_amount_manual
        , order_date
        , order_category
        , row_type
        , remark
        , total_by_branch
        , attach_file
        , attach_file_origin
        , unit
        , cashstatus
        , createdate
        , createby
        , modifydate
        , modifyby
        , status) {
        this.customer_no = customer_no;
        this.customer_type = customer_type;
        this.branch_code = branch_code;
        this.branch_name = branch_name;
        this.branchorigin_code = branchorigin_code;
        this.branchorigin_name = branchorigin_name;
        this.branchdest_code = branchdest_code;
        this.branchdest_name = branchdest_name;
        this.refno = refno;
        this.input_type = input_type;
        this.customerID = customerID;
        this.servicetype = servicetype;
        //---note
        this.note_new_1000 = note_new_1000;
        this.note_new_500 = note_new_500;
        this.note_new_100 = note_new_100;
        this.note_new_50 = note_new_50;
        this.note_new_20 = note_new_20;
        this.note_new_10 = note_new_10;

        this.note_fit_1000 = note_fit_1000;
        this.note_fit_500 = note_fit_500;
        this.note_fit_100 = note_fit_100;
        this.note_fit_50 = note_fit_50;
        this.note_fit_20 = note_fit_20;
        this.note_fit_10 = note_fit_10;

        this.note_unfit_1000 = note_unfit_1000;
        this.note_unfit_500 = note_unfit_500;
        this.note_unfit_100 = note_unfit_100;
        this.note_unfit_50 = note_unfit_50;
        this.note_unfit_20 = note_unfit_20;
        this.note_unfit_10 = note_unfit_10;

        this.note_uncount_1000 = note_uncount_1000;
        this.note_uncount_500 = note_uncount_500;
        this.note_uncount_100 = note_uncount_100;
        this.note_uncount_50 = note_uncount_50;
        this.note_uncount_20 = note_uncount_20;
        this.note_uncount_10 = note_uncount_10;

        //---------coin------------------------
        this.coin_new_10 = coin_new_10;
        this.coin_new_5 = coin_new_5;
        this.coin_new_2 = coin_new_2;
        this.coin_new_1 = coin_new_1;
        this.coin_new_05 = coin_new_05;
        this.coin_new_025 = coin_new_025;

        this.coin_fit_10 = coin_fit_10;
        this.coin_fit_5 = coin_fit_5;
        this.coin_fit_2 = coin_fit_2;
        this.coin_fit_1 = coin_fit_1;
        this.coin_fit_05 = coin_fit_05;
        this.coin_fit_025 = coin_fit_025;

        this.coin_unfit_10 = coin_unfit_10;
        this.coin_unfit_5 = coin_unfit_5;
        this.coin_unfit_2 = coin_unfit_2;
        this.coin_unfit_1 = coin_unfit_1;
        this.coin_unfit_05 = coin_unfit_05;
        this.coin_unfit_025 = coin_unfit_025;

        this.coin_uncount_10 = coin_uncount_10;
        this.coin_uncount_5 = coin_uncount_5;
        this.coin_uncount_2 = coin_uncount_2;
        this.coin_uncount_1 = coin_uncount_1;
        this.coin_uncount_05 = coin_uncount_05;
        this.coin_uncount_025 = coin_uncount_025;
        //---------unit note------------------------
        this.unit_note_new_1000 = unit_note_new_1000;
        this.unit_note_new_500 = unit_note_new_500;
        this.unit_note_new_100 = unit_note_new_100;
        this.unit_note_new_50 = unit_note_new_50;
        this.unit_note_new_20 = unit_note_new_20;
        this.unit_note_new_10 = unit_note_new_10;

        this.unit_note_fit_1000 = unit_note_fit_1000;
        this.unit_note_fit_500 = unit_note_fit_500;
        this.unit_note_fit_100 = unit_note_fit_100;
        this.unit_note_fit_50 = unit_note_fit_50;
        this.unit_note_fit_20 = unit_note_fit_20;
        this.unit_note_fit_10 = unit_note_fit_10;

        this.unit_note_unfit_1000 = unit_note_unfit_1000;
        this.unit_note_unfit_500 = unit_note_unfit_500;
        this.unit_note_unfit_100 = unit_note_unfit_100;
        this.unit_note_unfit_50 = unit_note_unfit_50;
        this.unit_note_unfit_20 = unit_note_unfit_20;
        this.unit_note_unfit_10 = unit_note_unfit_10;

        this.unit_note_uncount_1000 = unit_note_uncount_1000;
        this.unit_note_uncount_500 = unit_note_uncount_500;
        this.unit_note_uncount_100 = unit_note_uncount_100;
        this.unit_note_uncount_50 = unit_note_uncount_50;
        this.unit_note_uncount_20 = unit_note_uncount_20;
        this.unit_note_uncount_10 = unit_note_uncount_10;
        //-------pcs note
        this.pcs_note_new_1000 = pcs_note_new_1000;
        this.pcs_note_new_500 = pcs_note_new_500;
        this.pcs_note_new_100 = pcs_note_new_100;
        this.pcs_note_new_50 = pcs_note_new_50;
        this.pcs_note_new_20 = pcs_note_new_20;
        this.pcs_note_new_10 = pcs_note_new_10;

        this.pcs_note_fit_1000 = pcs_note_fit_1000;
        this.pcs_note_fit_500 = pcs_note_fit_500;
        this.pcs_note_fit_100 = pcs_note_fit_100;
        this.pcs_note_fit_50 = pcs_note_fit_50;
        this.pcs_note_fit_20 = pcs_note_fit_20;
        this.pcs_note_fit_10 = pcs_note_fit_10;

        this.pcs_note_unfit_1000 = pcs_note_unfit_1000;
        this.pcs_note_unfit_500 = pcs_note_unfit_500;
        this.pcs_note_unfit_100 = pcs_note_unfit_100;
        this.pcs_note_unfit_50 = pcs_note_unfit_50;
        this.pcs_note_unfit_20 = pcs_note_unfit_20;
        this.pcs_note_unfit_10 = pcs_note_unfit_10;

        this.pcs_note_uncount_1000 = pcs_note_uncount_1000;
        this.pcs_note_uncount_500 = pcs_note_uncount_500;
        this.pcs_note_uncount_100 = pcs_note_uncount_100;
        this.pcs_note_uncount_50 = pcs_note_uncount_50;
        this.pcs_note_uncount_20 = pcs_note_uncount_20;
        this.pcs_note_uncount_10 = pcs_note_uncount_10;
        //---------unit coin------------------------
        this.unit_coin_new_10 = unit_coin_new_10;
        this.unit_coin_new_5 = unit_coin_new_5;
        this.unit_coin_new_2 = unit_coin_new_2;
        this.unit_coin_new_1 = unit_coin_new_1;
        this.unit_coin_new_05 = unit_coin_new_05;
        this.unit_coin_new_025 = unit_coin_new_025;

        this.unit_coin_fit_10 = unit_coin_fit_10;
        this.unit_coin_fit_5 = unit_coin_fit_5;
        this.unit_coin_fit_2 = unit_coin_fit_2;
        this.unit_coin_fit_1 = unit_coin_fit_1;
        this.unit_coin_fit_05 = unit_coin_fit_05;
        this.unit_coin_fit_025 = unit_coin_fit_025;

        this.unit_coin_unfit_10 = unit_coin_unfit_10;
        this.unit_coin_unfit_5 = unit_coin_unfit_5;
        this.unit_coin_unfit_2 = unit_coin_unfit_2;
        this.unit_coin_unfit_1 = unit_coin_unfit_1;
        this.unit_coin_unfit_05 = unit_coin_unfit_05;
        this.unit_coin_unfit_025 = unit_coin_unfit_025;

        this.unit_coin_uncount_10 = unit_coin_uncount_10;
        this.unit_coin_uncount_5 = unit_coin_uncount_5;
        this.unit_coin_uncount_2 = unit_coin_uncount_2;
        this.unit_coin_uncount_1 = unit_coin_uncount_1;
        this.unit_coin_uncount_05 = unit_coin_uncount_05;
        this.unit_coin_uncount_025 = unit_coin_uncount_025;
        //-------pcs coin
        this.pcs_coin_new_10 = pcs_coin_new_10;
        this.pcs_coin_new_5 = pcs_coin_new_5;
        this.pcs_coin_new_2 = pcs_coin_new_2;
        this.pcs_coin_new_1 = pcs_coin_new_1;
        this.pcs_coin_new_05 = pcs_coin_new_05;
        this.pcs_coin_new_025 = pcs_coin_new_025;

        this.pcs_coin_fit_10 = pcs_coin_fit_10;
        this.pcs_coin_fit_5 = pcs_coin_fit_5;
        this.pcs_coin_fit_2 = pcs_coin_fit_2;
        this.pcs_coin_fit_1 = pcs_coin_fit_1;
        this.pcs_coin_fit_05 = pcs_coin_fit_05;
        this.pcs_coin_fit_025 = pcs_coin_fit_025;

        this.pcs_coin_unfit_10 = pcs_coin_unfit_10;
        this.pcs_coin_unfit_5 = pcs_coin_unfit_5;
        this.pcs_coin_unfit_2 = pcs_coin_unfit_2;
        this.pcs_coin_unfit_1 = pcs_coin_unfit_1;
        this.pcs_coin_unfit_05 = pcs_coin_unfit_05;
        this.pcs_coin_unfit_025 = pcs_coin_unfit_025;

        this.pcs_coin_uncount_10 = pcs_coin_uncount_10;
        this.pcs_coin_uncount_5 = pcs_coin_uncount_5;
        this.pcs_coin_uncount_2 = pcs_coin_uncount_2;
        this.pcs_coin_uncount_1 = pcs_coin_uncount_1;
        this.pcs_coin_uncount_05 = pcs_coin_uncount_05;
        this.pcs_coin_uncount_025 = pcs_coin_uncount_025;




        //------------------------------
        this.row_amount_manual = row_amount_manual;
        this.order_date = order_date;
        this.order_category = order_category;
        this.row_type = row_type;
        this.remark = remark;
        this.total_by_branch = total_by_branch;
        this.attach_file = attach_file;
        this.attach_file_origin = attach_file_origin;
        this.unit = unit;
        this.cashstatus = cashstatus;
        this.createdate = createdate;
        this.createby = createby;
        this.modifydate = modifydate;
        this.modifyBy = modifyby;
        this.status = status;
    }
}

module.exports = gfccp_order;
