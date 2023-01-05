
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

function hash(password) {
    return bcrypt.hashSync(password, 10);
}

function generateJwtToken(account) {
    // create a jwt token containing the account id that expires in 15 minutes
    return jwt.sign({ sub: account.id, id: account.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
}


// function generateRefreshToken(account, ipAddress) {
//     // create a refresh token that expires in 7 days
//     return ({
//         account: account.id,
//         token: randomTokenString(),
//         expires: new Date(Date.now() + 7*24*60*60*1000),
//         createdByIp: ipAddress
//     });
// }


function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

module.exports = {
    hash, generateJwtToken,  randomTokenString
}