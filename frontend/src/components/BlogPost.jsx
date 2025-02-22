import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, User, ThumbsUp, MessageCircle, Send, Trash2 } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  // Fetch post details based on ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  // Handle Like
  const handleLike = async () => {
    setIsLiked(!isLiked);

    // Update like count in backend
    await fetch(`http://localhost:5000/api/posts/${id}/like`, { method: "POST" });

    setPost((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  // Handle New Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      author: "Anonymous", // Replace with logged-in user's name
      content: comment,
      date: new Date().toISOString().split("T")[0],
    };

    await fetch(`http://localhost:5000/api/posts/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    setPost((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
    setComment("");
  };

  // Handle Comment Deletion
  const handleDeleteComment = async (index) => {
    await fetch(`http://localhost:5000/api/posts/${id}/comment/${index}`, { method: "DELETE" });

    setPost((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />

        <div className="p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <time>{post.date}</time>
              </div>
            </div>
          </header>

          {/* Blog Content */}
          <div className="prose max-w-none mb-8">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Like & Comment Count */}
          <div className="flex items-center space-x-4 border-t border-b border-gray-200 py-4 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                isLiked ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </div>
          </div>

          {/* Comments Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Comments</h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex items-start space-x-4">
              <div className="flex-grow">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </button>
            </form>

            {/* Display Comments */}
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <time className="text-sm text-gray-500">{comment.date}</time>
                  </div>
                  <p className="text-gray-600">{comment.content}</p>
                  <button
                    onClick={() => handleDeleteComment(index)}
                    className="text-red-500 text-sm flex items-center mt-2"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
