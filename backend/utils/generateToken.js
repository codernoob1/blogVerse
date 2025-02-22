import jwt from "jsonwebtoken";

export const generateToken = (res,userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
    res.cookie("token",token,{
        httpOnly:true ,//cookie cannot be accessed by client side script
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        sameSite: 'strict'
    })
    return token;
}