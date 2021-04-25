//require for mysql2
const mysqlc=require("mysql2/promise");
//export out db module
module.exports = db={};
connection()
async function connection (){
   let dbconeection=  await mysqlc.createConnection({
        host:"127.0.0.1",
        user:"root",
        password:"rahaf2002",
        database:"rahaf1"
    });
    db.connection=dbconeection;
}