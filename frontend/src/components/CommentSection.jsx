import { useState } from "react";
import { addComment } from "../services/postService";

const CommentSection = ({ postId, comments, fetchPost }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    await addComment(postId, newComment);
    setNewComment("");
    fetchPost(); // Refresh comments
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.map((c, idx) => (
        <p key={idx} className="border-b py-2">{c}</p>
      ))}

      <textarea
        className="w-full p-2 border rounded mt-2"
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
        Post Comment
      </button>
    </div>
  );
};

export default CommentSection;
