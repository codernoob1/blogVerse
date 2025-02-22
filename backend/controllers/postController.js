import { Post } from "../models/Post.js";
import {io} from "../server.js";
export const createPost = async (req, res) => {
    try {
        const {title, content, tags} = req.body;
        if(!title || !content || !tags){
            return res.status(400).json({
                success:false,
                message:"Please provide all fields"
            })
        }
        const imagePath = req.file ? req.file.path : null;
        const post = await Post.create({
            title,
            content,
            tags,
            image:imagePath,
            author:req.userId
        })
        res.status(201).json({
            success:true,
            message:"Post created successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getPosts = async (req,res)=>{
    try {
        console.log("Fetching posts...");
        const posts = await Post.find()
        .select("title content tags image author likes comments createdAt")
        .populate("author","username")
        .sort({ createdAt: -1 });
        console.log("Posts fetched successfully:", posts);
        console.log("✅ Posts fetched successfully:", posts.length);
        res.status(200).json({
            success:true,
            posts
        })
    } catch (error) {
        console.error("Error fetching posts:", error); 
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, tags } = req.body;
        const imagePath = req.file ? req.file.path : undefined;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to edit this post"
            });
        }

        const updateData = {
            title: title || post.title,
            content: content || post.content,
            tags: tags || post.tags
        };
        
        if (imagePath) {
            updateData.image = imagePath;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this post"
            });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const likePost = async (req, res, io) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        const alreadyLiked = post.likes.includes(req.userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(userId => userId.toString() !== req.userId);
        } else {
            post.likes.push(req.userId);
        }

        await post.save();

        // Emit updated like count to all clients
        io.emit("postLiked", { postId: id, likes: post.likes.length });

        res.status(200).json({
            success: true,
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likes: post.likes.length
        });
    } catch (error) {
        console.error("Error liking post:", error); // Log full error
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
