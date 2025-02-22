import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getPostById, likePost, deletePost, addComment, editPost } from "../services/postService.js";
import CommentSection from "./CommentSection";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (error) {
      console.error("Error loading post:", error);
    }
  };

  const handleLike = async () => {
    await likePost(id);
    fetchPost();
  };

  const handleDelete = async () => {
    await deletePost(id);
    navigate("/");
  };

  const handleEdit = async () => {
    await editPost(id, { title: newTitle, content: newContent });
    setIsEditing(false);
    fetchPost();
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {post.image && <img src={post.image} alt={post.title} className="w-full h-60 object-cover rounded-lg mb-4" />}
      {isEditing ? (
        <>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleEdit} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-600">{post.content}</p>
        </>
      )}

      <div className="mt-4 flex justify-between items-center">
        <button onClick={handleLike} className="text-red-500">❤️ {post.likes.length} Likes</button>
        <button onClick={() => setIsEditing(true)} className="text-blue-500">✏ Edit</button>
        <button onClick={handleDelete} className="text-red-500">🗑 Delete</button>
      </div>

      <CommentSection postId={id} comments={post.comments} fetchPost={fetchPost} />
    </div>
  );
};

export default PostDetail;
