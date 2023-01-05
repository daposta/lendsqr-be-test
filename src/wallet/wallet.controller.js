
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
    console.log(username, pin)
    let account = await db('users').select('username','pin').where({ username: username }).first()
    console.log('uuuu', account.pin);
    if (!account || !bcrypt.compareSync(pin, account.pin)){
        return res.status(400).json({success:false, message:'Username or pinn is incorrect'});
    }
    const jwtToken = generateJwtToken(account);
    // const ipAddress = req.ip;
    // const refreshToken = generateRefreshToken(account, ipAddress);
     

    res.status(200).json({'success':true, 'message':'Login successful', data: { 
        jwtToken,
       
    } })
    
}


// A user can fund their account
const fundAccount = (req, res) => {
    return res.status(200).json({"success":true, message:"Depsit successful"})
}
// A user can transfer funds to another user’s account
const transferFunds = (req, res) =>{
    return res.status(200).json({"success":true, message:"Transfer successful"})
}

// A user can withdraw funds from their account.
const withdrawFunds = (req, res) => {
    return res.status(200).json({"success":true, message:"Withdrawal successful"})
}


const getAccountBalance = () =>{

}


module.exports = {
    newAccount, fundAccount, transferFunds, withdrawFunds, login
}