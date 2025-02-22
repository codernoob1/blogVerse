import express from "express";
import { createPost, deletePost, editPost, getPosts, likePost } from '../controllers/postController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';



const postRoute = (io) => {
  const router = express.Router();
  // router.get('/', getPosts);
  console.log("🚀 postRoute initialized");

    router.get("/",verifyToken, (req, res) => {
        console.log("✅ GET /api/posts called");
        getPosts(req, res);
    });
  router.post('/create', verifyToken, upload.single('image') ,createPost);
  router.put('/:id', verifyToken, editPost);
  router.delete('/:id', verifyToken, deletePost);
  router.put('/:id/like', verifyToken, (req, res) => likePost(req, res, io));

  return router;
}

// router.get('/',getPosts);
// router.post('/',verifyToken,createPost)
// router.put('/:id', verifyToken, editPost);

// router.delete ('/:id',verifyToken,deletePost)

// router.put('/like/:id', verifyToken, (req, res) => likePost(req, res, io));

export default postRoute;