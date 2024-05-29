import * as bycrypt from 'bcrypt';
// const SALT =10;
export  function encodePassword(rawPassword: string) {
    const SALT =  bycrypt.genSaltSync();
    return bycrypt.hashSync(rawPassword, SALT)
}
