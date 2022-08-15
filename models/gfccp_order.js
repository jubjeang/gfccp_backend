class gfccp_order{
    constructor(customer_no
        ,customer_type
        ,branch_code
        ,branch_name
        ,CustomerID
        ,Servicetype
        ,note_new_1000
        ,note_new_500
        ,note_new_100
        ,note_new_50
        ,note_new_20
        ,note_new_10
        ,note_good_1000
        ,note_good_500
        ,note_good_100
        ,note_good_50
        ,note_good_20
        ,note_good_10
        ,coin_10
        ,coin_5
        ,coin_2
        ,coin_1
        ,coin_05
        ,coin_025
        ,note_counting_1000
        ,note_counting_500
        ,note_counting_100
        ,note_counting_50
        ,note_counting_20
        ,note_counting_10
        ,order_date
        ,order_category
        ,row_type
        ,remark
        ,total_by_branch
        ,attach_file
        ,createdate
        ,createby
        ,modifydate
        ,modifyby
        ,status){
            this.customer_no = customer_no; 
            this.customer_type = customer_type; 
            this.branch_code = branch_code; 
            this.branch_name = branch_name; 
            this.customerID = customerID;
            this.servicetype = servicetype;
            this.note_new_1000 = note_new_1000;
            this.note_new_500 = note_new_500;
            this.note_new_100 = note_new_100;
            this.note_new_50 = note_new_50;
            this.note_new_20 = note_new_20;
            this.note_new_10 = note_new_10;
            this.note_good_1000 = note_good_1000;
            this.note_good_500 = note_good_500;
            this.note_good_100 = note_good_100;
            this.note_good_50 = note_good_50;
            this.note_good_20 = note_good_20;
            this.note_good_10 = note_good_10;
            this.coin_10 = coin_10;
            this.coin_5 = coin_5;
            this.coin_2 = coin_2;
            this.coin_1 = coin_1;
            this.coin_05 = coin_05;
            this.coin_025 = coin_025;
            this.note_counting_1000 = note_counting_1000;
            this.note_counting_500 = note_counting_500;
            this.note_counting_100 = note_counting_100;
            this.note_counting_50 = note_counting_50;
            this.note_counting_20 = note_counting_20;
            this.note_counting_10 = note_counting_10;
            this.order_date = order_date;
            this.order_category = order_category;
            this.row_type = row_type;
            this.remark = remark;
            this.total_by_branch = total_by_branch;
            this.attach_file = attach_file;
            this.createdate = createdate;
            this.createby = createby;
            this.modifydate = modifydate;
            this.modifyBy = modifyby;
            this.status = status;
    }
}

module.exports = gfccp_order;
