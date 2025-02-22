import { User } from "../models/User.js";
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

export const updateProfile = async (req, res) => {
    try {
      const updates = {};
  
      // Add only the fields that exist in the request body
      if (req.body.username) updates.username = req.body.username;
      if (req.body.location) updates.location = req.body.location;
      if (req.body.website) updates.website = req.body.website;
      if (req.body.bio) updates.bio = req.body.bio;
      if (req.body.avatar) updates.avatar = req.body.avatar;
  
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates }, // Use $set to update only specified fields
        { new: true, runValidators: true }
      );
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  