const mariadb = require('mariadb');
 
const pool = mariadb.createPool({
    host: 'ec2-13-124-249-74.ap-northeast-2.compute.amazonaws.com',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'study_db',
    connectionLimit: 5
});
 
async function GetUserList(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
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
async function PostUserList(name){
    let conn, rows;
    var sql = 'SELECT * FROM NewTable WHERE name=?';
    try{
        conn = await pool.getConnection();
        rows = await conn.query(sql,[name]);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
async function PutUserList(age,name){
    let conn, rows;
    var sql = 'update NewTable set age=? where name=?';
    try{
        conn = await pool.getConnection();
        await conn.query(sql,[age,name]);
        rows = 'Update Success';
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
async function DeleteUserList(age){
    let conn, rows;
    var sql = 'delete from NewTable where age=?';
    try{
        conn = await pool.getConnection();
        await conn.query(sql,[age]);
        rows = 'Delete Success';
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
/////////////////////////////////////////////////////////////////
async function GetMember(){
    let conn, rows;
    var sql ='SELECT * FROM member';
    try{
        conn = await pool.getConnection();
        rows = await conn.query(sql);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
async function PostMember(id){
    let conn, rows;
    var sql = 'SELECT * FROM member WHERE id=?';
    try{
        conn = await pool.getConnection();
        rows = await conn.query(sql,[id]);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
async function PutMember(id,name){
    let conn, rows;
    var sql = 'update member set id=? where name=?';
    try{
        conn = await pool.getConnection();
        await conn.query(sql,[id,name]);
        rows = 'Update Success';
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
async function DeleteMember(age){
    let conn, rows;
    var sql = 'delete from member where age=?';
    try{
        conn = await pool.getConnection();
        await conn.query(sql,[age]);
        rows = 'Delete Success';
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
    getUserList: GetUserList,
    postUserList: PostUserList,
    putUserList: PutUserList,
    deleteUserList: DeleteUserList,
    getMember: GetMember,
    postMember: PostMember,
    putMember: PutMember,
    deleteMember: DeleteMember,

}