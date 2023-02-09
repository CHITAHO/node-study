const mdbConn = require('./mariaDBConn.js')
const express = require('express')
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
   mdbConn.postUserList(req.body.name)
   mdbConn.postMember(req.body.id)
   .then((rows) => {
      res.send(rows);
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
   // res.send('post hello from simple server :)'+req.body.data)

})
app.put('/' , (req , res)=>{
   mdbConn.putUserList(req.body.age,req.body.name)
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
   .then((rows) => {
      res.send(rows);
   })
    .catch((errMsg) => {
      console.log(errMsg);
    });
   // res.send('delete hello from simple server :)')

})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))