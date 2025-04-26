import createHttpError from "http-errors"
import jwt from "jsonwebtoken"


const verifyToken = async (req,res,next){
  const {authorization:token} = req.headers

  if(!token){
    
  }
}