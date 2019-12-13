var jwt = require('jsonwebtoken');

exports.verification = (req, res, next) => {
 
    const token = req.headers['token'];
    if (!token) {
        console.log("no")
        res.status(400).send({
            status_code: 400,
            message: "please provide token for access"
        })
    }
    else {
        console.log("yes");
        
        return jwt.verify(token, "generateToken", (err) => {
            if (err) {
                res.status(404).send({
                    status_code: 404,
                    message: "access denied for wrong token "
                })
            } else {
       
                // res.send("Authorized");
                console.log(jwt.decode(token));
                req.body['validateddata'] = jwt.decode(token);
                // next();
                return req.body;
        // console.log(typeof req.body.isAdmin, typeof true);
        //         if (req.body.isAdmin == true) {
        //             console.log("workingggg")
        //             console.log(jwt.decode(token))
        //             next();
        //         }
        //         else {
        //             res.status(401).send({
        //                 status_code: 401,
        //                 message: "you are unauthorized person "
        //             })
        //         }
            }

        })
        
    }

}


