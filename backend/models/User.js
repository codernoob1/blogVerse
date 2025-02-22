import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    
    bio: { type: String, default: "" },
    
    verificationToken: String,
    verificationTokenExpiresAt: Date
},{
    timestamps:true
});


//hash before saving
userSchema.pre("save", async function(next){
    if (!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);