
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


function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

module.exports = {
    hash, generateJwtToken,  randomTokenString
}