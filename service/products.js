const db = require("../util/dbConnection");
var uniqueId = require('uuid/v1');
exports.getProducts = (req, res) => {

    if (req.query.Product_Id) {
        db.query(`select * from get_all_products_view where Product_Id='${req.query.Product_Id}'`, (error, response) => {


            // console.log(response)
            // console.log(JSON.parse(response[0].Product_Pic));
            if (response) {
                // res.send(response);
                res.send({
                    "Product_Id": response[0].Product_Id,
                    "Product_Name": response[0].Product_Name,
                    "Product_Description": response[0].Product_Description,
                    "Product_Pic": JSON.parse(response[0].Product_Pic),
                    "Size": JSON.parse(response[0].Size),
                    "Quantity": JSON.parse(response[0].Quantity),
                    "Price": JSON.parse(response[0].Price),
                    "Sub_Category_Id": response[0].Sub_Category_Id,
                    "Type/Tags": response[0]["Type/Tags"],
                    "Brand": response[0].Brand
                });
            } else {
                res.send(error);
            }
        })

    } else {
        db.query(`select * from get_all_products_view`, (err, response1) => {
            // console.log(response1);
            if (response1) {
                res.send(response1);
            } else {
                res.send(err);
            }
        })

    }

}

exports.orders = async (req, res) => {
    var Order = req.body;

    var unique = uniqueId();

    Order.Order_Id = unique;
// console.log(Order)

    for (var i = 0; i < Order.Products.length; i++) {
        let a = Order.Products[i];
        Order.Products[i].Price = ''
        let value = Order.Products[i].Quantity;
        let productId = Order.Products[i].Product_Id;
        // let a = JSON.parse(JSON.stringify(Order));
        // console.log("cost-->" + a.Products[i].Product_Id);
         db.query(`select * from get_all_products_view where Product_Id='${productId}'`, (error, response) => {
            if (response) {
                var cost = parseFloat(response[0].Price) * parseFloat(value);

                var prod_des = response[0].Product_Description
                // let a = JSON.parse(Order.Products)
                a.Price=cost;
                console.log(a.Price);
                a.Description = prod_des;
                var o = Order.Order_Id;
               
              db.query(`insert into orders(Order_Id,Email,Product_Id,Quantity,Price,Payment_Type) values(?,?,?,?,?,?)`,

                [Order.Order_Id,Order.Email,a.Product_Id,a.Quantity,a.Price,Order.Payment_Type],(err, result1) => {
             //console.log(result1);
                        if (result1) {
                           console.log("Inserted in DB");


                        //    res.send()
                        } else {
                         
                           console.log("wrkn",err)
                        }

                    })

                
               
            } else {
                res.send(400)
            }

        })
    if(i==Order.Products.length-1){
        res.send({
            Status_Code : 200,
            Message: "Order Placed Successfully"
        })
    }
    }
    
}



