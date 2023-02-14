// import * as bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

module.exports = class BcryptPW {
  constructor() {}
  saltMaker(){
    return bcrypt.genSaltSync();
  }

  passwordHashMaker(password, salt) {
    return bcrypt.hashSync(password, salt);
  }

  passwordCompare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
}
