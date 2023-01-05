const express = require('express');
const { allowOnlyAuthenciatedUser } = require('./middleware');
const { fundAccount, newAccount, transferFunds, login, withdrawFunds } = require('./wallet.controller');
const { validateNewAccount, validateLogin, validateDeposit, validateWithdrawal } = require('./wallet.validators');

const router =  express.Router()
//create account
router.post('/account', validateNewAccount, newAccount),
//login
router.post('/login', validateLogin, login),
//fund account
router.post('/fund-account', allowOnlyAuthenciatedUser, validateDeposit, fundAccount),
//transfer funds
router.post('/withdraw-funds', allowOnlyAuthenciatedUser, validateWithdrawal, withdrawFunds),
//transfer funds
router.post('/transfer-funds', allowOnlyAuthenciatedUser,  transferFunds),

module.exports = router