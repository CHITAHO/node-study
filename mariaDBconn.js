const salt = require('./util/salt_maker.js')
const mariadb = require('mariadb');
const BcryptPW = require('./util/salt_maker.js');
const pool = mariadb.createPool({
    host: 'ec2-13-124-249-74.ap-northeast-2.compute.amazonaws.com',
    port: 3306,
    user: 'chitaho',
    password: 'mindone!23',
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
        if (conn) conn.end();
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
        if (conn) conn.end();
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
    var params = [age,name];
    
    try{
        conn = await pool.getConnection();
        await conn.query(sql,params);
        rows = 'Update Success';
    }
    catch(err){
        if (conn) conn.end();
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
        if (conn) conn.end();
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
/////////////////////////////////////////////////////////////////
async function GetMember(id){
    let conn, row;
    var sql ='SELECT * FROM member';
    if(id != undefined){
        sql += ' where id=' + id + ' limit 1';
    }
    try{
        conn = await pool.getConnection();
        row = await conn.query(sql);
    }
    catch(err){
        if (conn) conn.end();
        throw err;
    }
    finally{
        if (conn) conn.end();
        return row;
    }
}
async function PostMember(id,pw,name,email){
    const bcryptPW = new BcryptPW();
    let salt = bcryptPW.saltMaker();
    let cpw= bcryptPW.passwordHashMaker(pw,salt);
    // console.log(salt)
    let conn, rows;
    var sql = 'insert into member (id,pw,salt,name,email) values(?,?,?,?,?)';
    var params = [id,cpw,salt,name,email];
    try{
        conn = await pool.getConnection();
        rows = await conn.query(sql,params);
    }
    catch(err){
        if (conn) conn.end();
        throw err;
    }
    finally{
        if (conn) conn.end();
        return "success";
    }
}
async function PutMember(id,name){
    let conn, rows;

    var sql = 'update member set id=? where name=?';
    var params = [id,name];
    try{
        conn = await pool.getConnection();
        await conn.query(sql,params);
        rows = 'Update Success';
    }
    catch(err){
        if (conn) conn.end();
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
}
async function DeleteMember(id){
    let conn, rows;
    var sql = 'delete from member where id=?';
    var params = [id];
    try{
        conn = await pool.getConnection();
        await conn.query(sql,params);
        rows = 'Delete Success';
    }
    catch(err){
        if (conn) conn.end();
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