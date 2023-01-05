
const db = require('../connection');
const { hash, generateRefreshToken, generateJwtToken } = require('./wallet.util');
const bcrypt = require('bcrypt')
// A user can create an account
const newAccount = async(req, res) => {
    let {username, name , pin} = req.body
    pin = hash(pin);
    const data = await db('users').insert({username, name, pin})
    return res.status(200).json({"success":true, message:"Registration successful"})
}

// A user can with username and pin
const login = async(req, res) => {
    const {username, pin} =  req.body
    let account = await db('users').where({ username: username }).first()
 
    if (!account || !bcrypt.compareSync(pin, account.pin)){
        return res.status(400).json({success:false, message:'Username or pinn is incorrect'});
    }
    console.log('ccccc', account)
    const jwtToken = generateJwtToken(account);
   
    res.status(200).json({'success':true, 'message':'Login successful', data: { 
        jwtToken,
       
    } })
    
}


// A user can fund their account
const fundAccount = async (req, res) => {
    const user = req.user
    const { amount} = req.body
    let account = await getOrCreateBalance(user.id)
    let newBalance = account.balance + parseFloat(amount)
    updateBalance(user.id,  newBalance)
    return res.status(200).json({"success":true, message:`Deposit successful. New balance is ${newBalance}`})
}
// A user can transfer funds to another user’s account
const transferFunds = (req, res) =>{
    return res.status(200).json({"success":true, message:"Transfer successful"})
}

// A user can withdraw funds from their account.
const withdrawFunds = async(req, res) => {
    const user = req.user
    const { amount} = req.body
    let account = await getOrCreateBalance(user.id)
    if (account.balance < amount){
        return res.status(200).json({"success":true, message:"You do not have sufficient balance"})
    }
    let newBalance = account.balance -  parseFloat(amount)
    updateBalance(user.id,  newBalance)
    return res.status(200).json({"success":true, message:`Withdrawal successful. New balance is ${newBalance}`})
}


const getOrCreateBalance = async(user_id) =>{
    let account = await db('accounts').where({ user_id }).first()
    console.log('fff', account)

    if (account === undefined){
        //create new account

        await db('accounts').insert({user_id, balance: 0})
        account = await db('accounts').where({ user_id }).first()
      
    }
  
    return account
}


const updateBalance = async(user_id, balance) => {
    await db('accounts').update({balance}).where({ user_id })
     
}

module.exports = {
    newAccount, fundAccount, transferFunds, withdrawFunds, login
}