const PasswordHash = require('../../Applications/security/PasswordHash');
const AuthError = require('../../Commons/exceptions/AuthError');
 
class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }
 
  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async comparePassword(plain, encrypted){
    const result = await this._bcrypt.compare(plain, encrypted)
    if(!result){
      throw new AuthError('kredensial yang anda masukkan salah!')
    }
  }
}
 
module.exports = BcryptPasswordHash;