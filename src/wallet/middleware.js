const { verify } = require('jsonwebtoken');
const db = require("../connection");

const allowOnlyAuthenciatedUser = async(req, res, next ) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)   

  try {
    const {id} =  verify(token, process.env.JWT_SECRET);
    req.user = await db('users').where({ id }).first()
    if(!req.user){
      return res.status(401).json({success:false, 'message':'User not found'})
    }
    
  } catch (error) {

    return res.status(401).json({success:true , 'message':'Expired token. Try to login'})
  }
     

    next();
}

  module.exports = {
    allowOnlyAuthenciatedUser
  }