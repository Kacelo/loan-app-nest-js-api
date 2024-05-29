"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePassword = void 0;
const bycrypt = require("bcrypt");
function encodePassword(rawPassword) {
    const SALT = bycrypt.genSaltSync();
    return bycrypt.hashSync(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
//# sourceMappingURL=bcrypt.js.map