"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePassword = exports.encodePassword = void 0;
const bycrypt = require("bcrypt");
function encodePassword(rawPassword) {
    const SALT = bycrypt.genSaltSync();
    return bycrypt.hashSync(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
async function decodePassword(password, hash) {
    const isMatch = await bycrypt.compare(password, hash);
    return isMatch;
}
exports.decodePassword = decodePassword;
//# sourceMappingURL=bcrypt.js.map