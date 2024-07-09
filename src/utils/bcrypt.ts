import * as bycrypt from 'bcrypt';
// const SALT =10;
export  function encodePassword(rawPassword: string) {
    const SALT =  bycrypt.genSaltSync();
    return bycrypt.hashSync(rawPassword, SALT)
}
export async function decodePassword(password: string, hash: string){
    const isMatch = await bycrypt.compare(password, hash);
    return isMatch;
}