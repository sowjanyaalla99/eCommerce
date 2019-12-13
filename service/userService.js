const db = require("../util/dbConnection");
var moment = require('moment');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userRegistration = async (req, res) => {

    console.log("it was not here")

    const data = req.body;

    var hash = await bcrypt.hash(data.password, 10)
    data.Password = hash;


    db.query(`INSERT INTO users1 (
        User_Name,Email,Password,Created_By,
        Created_On,Modified_By,Modified_On,
        Is_Admin,DOB,Gender,Phone,Profile_Pic) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [data.userName, data.email, hash, data.createdBy, new Date(),
        data.modifiedBy, new Date(), data.isAdmin, data.dOB, data.gender, data.phone,data.profilepic], (err, result1) => {
            if (err) {
                return res.status(400).send(err);
                // console.log("err here")
            }
            else {

                db.query(`INSERT into users1_address(User_Id,Address) VALUES(?,?)`, [result1.insertId, JSON.stringify(data.address)], (err, result2) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    else {
                        return res.status(200).send(result2);


                    }
                });

            }
        });

}



exports.addAddress =async (req, res) => {
    const data = req.body;
    console.log(data.User_Id);
   
 await   db.query('SELECT address from users1_address WHERE User_Id=?', [data.User_Id], (err, result) => {
        // console.log('working')
        // console.log(result);
var value=0;
        if (err) {
            return res.status(400).send(err);
        }
        else {
         console.log(result.length)
         if(result.length){
            //console.log(result);
            var getAddress = [JSON.parse(result[0].address)];
       
            let addressfield = getAddress[0];
            let requestAddress = data.address;

          //  res.send(addressfield)
        //    addressfield1 = addressfield.concat(data.address);
        //    addressfield1 = "'" + JSON.stringify(addressfield1) + "'";
      requestAddress.forEach(async request =>{
        let value =0;
        
        addressfield.forEach(async address=>{
            if(JSON.stringify(address) == JSON.stringify(request)){
                console.log("working1")
                value =1;
            }
        })
        if(value ==0){
            console.log(request);
            addressfield1 = addressfield.concat(request);
            addressfield2 = "'" + JSON.stringify(addressfield1) + "'";
            console.log(addressfield2);
          await  db.query(`UPDATE users1_address SET address=${addressfield2} where User_Id=${data.User_Id}`
            , (err, result2) => {
                if (err) {
                    return res.status(505).send({
                        status_code: 505,
                        error: err.message
                      
                    });
                }
    
            })
        }
    })

    return res.status(200).send({
        status_code: 200,
        Success: "updated successfully"
      
    });
            //  return res.status(200).send(addressfield1);
    

        }
            else{
                return res.status(404).send({
                    status_code: 404,
                    Success: "no data found with this id"
                  
                });
            
        }
    }
   
    });
}

exports.loginAttempts = function (req, res) {
    var data = req.body;
    var count = 0;

    db.query(`select * from users1 where Email='${data.email}' and Is_Deleted=0`, (err, response) => {
        //count = response[0].Login_Attempts;
        if (err) {
            return res.send(err);
        } else {
            if (response.length != 0) {
                console.log(response[0].Login_Attempts);
                count = response[0].Login_Attempts;

                if (response[0].Is_Blocked == 'No') {
                    console.log('working', data.Password);
                    bcrypt.compare(req.body.Password, response[0].Password).then(function (response1) {
                        console.log(response1)
                        if (response1) {
                            db.query(`update users1 set Login_Attempts='0',LoginDate=?,Modified_On=? where Email=? and Is_Deleted=0`, [new Date(), new Date(), data.email], (err, result2) => {
                                // res.status(200).send("successfull");


                                var gentoken=jwt.sign({ userid: response[0].User_Id,isAdmin:response[0].Is_Admin }, "generateToken", { algorithm: 'HS256' }, { expiresIn: '10m' });


                                res.status(200).send({
                                    status_code: 200,
                                    Success: "successfull",
                                    tokenjwt:gentoken


                                })

                            })

                        } else {
                            if (count < 3) {
                                db.query(`update users1 set Login_Attempts=?,Modified_On=? where Email=? and Is_Deleted=0`, [parseInt(count) + 1, new Date(), data.email], (err, result3) => {
                                    res.status(400).send({
                                        status_code: 400,
                                        Failed: "invalid password"
                                    });
                                })
                            } else if (count == 3) {
                                db.query(`update users1 set Login_Attempts=?, Is_Blocked='Yes',Modified_On=? where Email=? and Is_Deleted=0`, [parseInt(count) + 1, new Date(), data.email], (err, result4) => {
                                    res.status(400).send({
                                        status_code: 400,
                                        Failed: "invalid password"
                                    });
                                })
                            }
                        }
                    });
                } else if (response[0].Is_Blocked == 'Yes') {

                    bcrypt.compare(req.body.Password, response[0].Password).then(function (response1) {
                        if (response1) {
                            console.log("blocked");

                            var modifiedDate = response[0].Modified_On;
                            var DateDiff = moment().subtract(2, 'm').toDate();
                            if (modifiedDate < DateDiff) {
                                db.query(`update users1 set Login_Attempts='0',LoginDate=?,Modified_On=?,Is_Blocked='No' where Email=? and Is_Deleted=0`, [new Date(), new Date(), data.email], (err, result4) => {
                                    res.status(200).send({
                                        status_code: 200,
                                        Success: "successfull"
                                    });

                                })
                            } else {
                                res.status(400).send({
                                    status_code: 200,
                                    Failed: "your account is blocked state"
                                })
                            }
                        } else {
                            db.query(`update users1 set Login_Attempts=?,LoginDate=?,Modified_On=?,Is_Blocked='Yes' where Email=? and Is_Deleted=0`, [parseInt(count) + 1, new Date(), new Date(), data.email], (err, result5) => {
                                res.status(200).send({
                                    status_code: 200,
                                    Failed: "your account is blocked,try after some time"
                                })
                            })
                            //res.status(200).send("your account is blocked,try after some time")
                        }
                    })
                }
            } else {
                console.log("???")
                return res.send({
                    status_code: 400,
                    Failed: "no data found with this email"
                })
            }

        }
    });

}





