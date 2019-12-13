const sql=require('mysql');

var conn=sql.createConnection({
    host:"localhost",
    user:"dbuser",
    password:"dbpass",
    database:"nodeproj",
   
});

conn.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  else console.log("connected to DB")
});

module.exports=conn;