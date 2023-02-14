const jwt = require('jsonwebtoken');


function makeJsonWebToken(payload,secretKey,option){
    return jwt.sign(payload, secretKey, option);
}

function parseJsonWebToken(token,secretKey){
    const str = jwt.verify(token,secretKey);
    console.log(str);
}


module.exports = {
    makeJsonWebToken,
    parseJsonWebToken
}
//json생성 git ignore 