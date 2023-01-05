const express = require('express')
const { fundAccount, newAccount, transferFunds, login } = require('./wallet.controller');
const { validateNewAccount, validateLogin } = require('./wallet.validators');

const router =  express.Router()
//create account
router.post('/account', validateNewAccount, newAccount),
//login
router.post('/login', validateLogin, login),
//fund account
router.post('/fund-account', fundAccount),
//transfer funds
router.post('/trasfer-funds', transferFunds),

module.exports = router