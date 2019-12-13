const db = require("../util/dbConnection");
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
var mailer = require('nodemailer');
const expression = require('randexp')

exports.resettingPassword = (req, res) => {
    var result = req.body;

    db.query(`select * from users1 where Email='${result.email}' and Is_Deleted=0`, (err, response) => {
        console.log(response);
        if (err) {
            console.log("???")
            return res.send({
                status_code: 400,
                Failed: "no data found with this email"
            })
        }
        else {
            // res.send(response);
            if (response[0].Is_Blocked == 'No') {
                console.log('working', result.Password);
                bcrypt.compare(result.Password, response[0].Password).then(function (response1) {
                    console.log(response1)
                    //var myRegexp = /^([a-zA-Z0-9_-]+{8,15})$/;
                    var myRegexp = Math.random().toString(36).replace('0.', '');
                    db.query(`update users1 set Temp_Password='${myRegexp}' where Email='${result.email}' and Is_Deleted=0`, (err, response2) => {
                        console.log(response2);

                        if (err) {
                            res.status(400).send({
                                status_code: 400,
                                Failed: "invalid"
                            });
                        } else {

                            function sendingMail() {
                                let transporter = mailer.createTransport({
                                    host: "smtp.gmail.com",
                                    secure: true,
                                    port: 465,
                                    auth: {
                                        user: 'naveensai086@gmail.com',
                                        pass: 'Gmail@97.'
                                    }
                                });


                                let mailOptions = {
                                    from: 'naveensai086@gmail.com',
                                    to: result.email,
                                    subject: 'Testing',
                                    // body: 'Hello', // plain text body
                                    html: ` <body
                                    <h1><b>Hello  `+ result.userName + ` !</b></h1>
                                    <p>someone.Hopefully you, has requested to reset the password for your account.
                                    this is your random password is ` + myRegexp + ` using this.you can can change your password.</p>
                                    <p><b>Thank You</b></p>
                                    </body> `// html body
                                    //    <h1><img src=`+ imgdata + `  style="width:200px;height:300px;"></img></h1>

                                };

                                transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        res.status(200).send({
                                            status_code: 200,
                                            Success: "successful"
                                        });


                                    }
                                    console.log('Message %s sent: %s', info);
                                    console.log('Sent');
                                    console.log("email working")
                                });

                            }


                        }
                        sendingMail();


                    })

                })
            } else {
                res.status(400).send({
                    status_code: 400,
                    Failed: "invalid password"
                });


            }

        }

    });


}



exports.changepassword = (req, res) => {
    let dataFromDb = req.body;

    db.query(`select * from users1 where Email='${dataFromDb.email}' and Is_Deleted=0`, (err, response) => {
        console.log(response);
        if (err) {
            console.log("???")
            return res.send({
                status_code: 400,
                Failed: "no data found with this email"
            })
        } else {
            console.log(response);
            if (response[0].Is_Blocked =='No') {
                console.log('working', dataFromDb.changedPassword);
                bcrypt.compare(dataFromDb.Password, response[0].Password).then(function (response1) {
                    console.log(response1)

                    var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                    console.log(dataFromDb.changedPassword,!dataFromDb.changedPassword.includes(response[0].Password),dataFromDb.changedPassword && !dataFromDb.changedPassword.includes(response[0].Password))
                    if (regExp.test(dataFromDb.changedPassword) && !dataFromDb.changedPassword.includes(response[0].Password)) {
                        // console.log(dataFromDb.changedPassword)
                        db.query(`update users1 set Password='${dataFromDb.changedPassword}' where Email='${dataFromDb.email}' and Is_Deleted=0`, (err, result) => {
                            if (err) {
                                return res.send({
                                    status_code: 400,
                                    Failed: "condition failed"

                                })
                            } else {
                                return res.send({
                                    status_code: 200,
                                    Success: "updated successfully"

                                })
                            }
                            
                            
                        })
                        console.log(result);

                    } else {
                        return res.send({
                            status_code: 400,
                            Failed: "condition failed"
                        })

                    }


                })
            } else {
                return res.send({
                    status_code: 400,
                    Failed: "condition failed"
                })


            }


        }
    })

}




