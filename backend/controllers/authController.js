import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.js";

export const signUp = async(req,res)=>{
    try {
        const {username,email,password,bio=""} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all fields"
            })
        }
        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const verificationToken = generateVerificationToken();
        const user = await User.create({
            username,
            email,
            password, 
            bio,
            verificationToken: verificationToken,
           verificationTokenExpiresAt: Date.now() + 24 *60 *60 * 1000 
        })
        generateToken(res,user._id);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                _id:user._id,
                username:user.username,
                email:user.email
            }
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message
            })
    }
}

export const signIn = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please provide all fields"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Password: Invalid credentials"
            })
        }
        // const isVerified = user.isVerified;
        // if (!isVerified){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid credentials"
        //     })
        // }
        generateToken(res,user._id);
        res.status(200).json({
            success:true,
            message:"User signed in successfully",
            user:{
                _id:user._id,
                username:user.username,
                email:user.email
            }});
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message
            })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0), // ✅ Expire the cookie immediately
            sameSite: "None",
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};


export const getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
       res.status(500).json({
           success:false,
           message:error.message
         }) 
    }
}