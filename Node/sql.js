var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"

});
con.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
})
class Sql{
 async insertData(key,name,age,address){
    
      //   con.query("CREATE DATABASE mydb", function (err, result) {
      //     if (err) throw err;
      //     console.log("Database created");
      //   });
      // var sql = "CREATE TABLE users (`key` int primary key,name VARCHAR(255),age int,address VARCHAR(255))";
        try {
            const sql = "INSERT IGNORE INTO  users VALUES (?, ?, ?, ?)";
            con.query(sql, [key, name, age, address], function (err, result) {
                if (err) throw err;
                console.log("Entry Inserted");
            });
        } catch (err) {
            console.error(err);
        }
    

}
async getData(){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users";
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}
async updateUser( key, name, age, address){
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users VALUES (?, ?, ?, ?)ON DUPLICATE KEY UPDATE name = VALUES(name),age = VALUES(age),address = VALUES(address);"
        con.query(sql,[key,name, age, address], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}
async deleteUser( key){
    return new Promise((resolve, reject) => {
        const sql = "DELETE from users WHERE `key`=?;";
        con.query(sql,[key], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}
}
module.exports = Sql;