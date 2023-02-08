const mariadb = require('mariadb');
 
const pool = mariadb.createPool({
    host: 'ec2-13-124-249-74.ap-northeast-2.compute.amazonaws.com',
    port: 3306,
    user: 'root',
    password: 'root',
    connectionLimit: 5
});
 
async function GetUserList(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE study_db');
        rows = await conn.query('SELECT * FROM NewTable');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
 
module.exports = {
    getUserList: GetUserList
}