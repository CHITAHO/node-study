const mdbConn = require('./mariaDBConn.js')
require('./crypto.js');
const jwtjs = require('./jwt.js');
const express = require('express');
const BcryptPW = require('./util/salt_maker.js');
const { getMember } = require('./mariaDBConn.js');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extends:true}))
// require('dotenv').config()
const port = process.env.PORT || 5000

// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 
// mdbConn.getUserList()
//   .then((rows) => {
//     console.log(rows);
//   })
//   .catch((errMsg) => {
//     console.log(errMsg);
//   });

app.get('/' , (req , res)=>{
   // res.send('get hello from simple server :)')
   mdbConn.getUserList()
   .then((rows) => {
      res.send(rows);
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
   //  res.send('get hello from simple server :)')
})

app.post('/' , (req , res)=>{
   // mdbConn.postUserList(req.body.name)
   mdbConn.postMember(req.body.id,req.body.pw,req.body.name,req.body.email)
   .then((rows) => {
      res.send(rows);
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
    let jwt = jwtjs.makeJsonWebToken(req.body,'top secret');
    console.log(jwt);
    jwtjs.parseJsonWebToken(jwt,'top secret');
   // res.send('post hello from simple server :)'+req.body.data)

})
app.put('/' , (req , res)=>{
   mdbConn.putUserList(req.body.age,req.body.name)
   mdbConn.putMember(req.body.id,req.body.name)
   .then((rows) => {
      res.send(rows);
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
   // res.send('put hello from simple server :)'+req.params.id)

})
app.delete('/' , (req , res)=>{
   mdbConn.deleteUserList(req.body.age)
   mdbConn.deleteMember(req.body.id)
   .then((rows) => {
      res.send(rows);
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
   // res.send('delete hello from simple server :)')

})
app.post('/login' , (req , res)=>{
   const bcryptPW = new BcryptPW();
   getMember(req.body.id)
   .then((row) => {
      console.log(row);
      try{
      const pass = bcryptPW.passwordCompare(req.body.pw,row[0].pw);
      console.log(pass);
      if(pass == true){
         let jwt = jwtjs.makeJsonWebToken({name : row[0].name,email : row[0].email},'top secret');
         res.send(jwt);
      }
      else{
         res.status(401).send("password not correct");
      }
   }
   catch(e){
      console.log(e);
   }
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
   // res.send('post hello from simple server :)'+req.body.data)

})

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))