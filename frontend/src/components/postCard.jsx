// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// const PostCard = ({ post }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       {post.image && (
//         <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
//       )}
//       <div className="p-4">
//         <h2 className="text-lg font-semibold">{post.title}</h2>
//         <Link to={`/post/${post._id}`} className="text-emerald-600 hover:underline">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// };

// PostCard.propTypes = {
//   post: PropTypes.shape({
//     _id: PropTypes.string.isRequired, // Post ID (string)
//     title: PropTypes.string.isRequired, // Title (string)
//     image: PropTypes.string, // Image URL (optional)
//   }).isRequired,
// };

// export default PostCard;
import { useState } from 'react';
import { Heart, MessageCircle, Edit, Trash2, X } from 'lucide-react';

const initialBlogs = [
  {
    id: 1,
    title: "The Art of Mountain Photography",
    content: "Mountain photography is one of the most rewarding genres of landscape photography. The dramatic peaks, ever-changing weather conditions, and stunning vistas provide endless opportunities for creating compelling images...",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    likes: 0,
    comments: []
  },
  {
    id: 2,
    title: "Urban Architecture: A Modern Perspective",
    content: "Modern urban architecture represents the pinnacle of human innovation and artistic expression. The interplay of glass, steel, and concrete creates a symphony of forms that define our cityscapes...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    likes: 0,
    comments: []
  }
];

function PostCard() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleLike = (blog) => {
    setBlogs(blogs.map(b => 
      b.id === blog.id ? { ...b, likes: b.likes + 1 } : b
    ));
    if (selectedBlog?.id === blog.id) {
      setSelectedBlog({ ...blog, likes: blog.likes + 1 });
    }
  };

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(b => b.id !== blogId));
    setSelectedBlog(null);
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditedTitle(blog.title);
    setEditedContent(blog.content);
  };

  const handleSaveEdit = () => {
    if (selectedBlog) {
      const updatedBlog = {
        ...selectedBlog,
        title: editedTitle,
        content: editedContent
      };
      setBlogs(blogs.map(b => 
        b.id === selectedBlog.id ? updatedBlog : b
      ));
      setSelectedBlog(updatedBlog);
      setIsEditing(false);
    }
  };

  const handleAddComment = () => {
    if (selectedBlog && newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        author: 'Anonymous'
      };
      const updatedBlog = {
        ...selectedBlog,
        comments: [...selectedBlog.comments, newCommentObj]
      };
      setBlogs(blogs.map(b => 
        b.id === selectedBlog.id ? updatedBlog : b
      ));
      setSelectedBlog(updatedBlog);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 my-24">
      
      <main className="mx-auto px-4 max-w-7xl">
        {!selectedBlog ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div 
                key={blog.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      className="flex items-center text-emerald-600 hover:text-emerald-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(blog);
                      }}
                    >
                      <Heart className={`w-5 h-5 mr-1 ${blog.likes > 0 ? 'fill-emerald-600' : ''}`} />
                      {blog.likes}
                    </button>
                    <button
                      className="flex items-center text-emerald-600 hover:text-emerald-700"
                    >
                      <MessageCircle className="w-5 h-5 mr-1" />
                      {blog.comments.length}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              className="m-4 flex items-center text-gray-600 hover:text-gray-800"
              onClick={() => {
                setSelectedBlog(null);
                setIsEditing(false);
              }}
            >
              <X className="w-5 h-5 mr-1" /> Close
            </button>
            
            {isEditing ? (
              <div className="p-6">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Blog title"
                />
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Blog content"
                  rows={10}
                />
                <button 
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <img 
                  src={selectedBlog.image} 
                  alt={selectedBlog.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
                  <p className="text-gray-700 mb-6">{selectedBlog.content}</p>
                  
                  <div className="flex gap-4 mb-8">
                    <button
                      onClick={() => handleLike(selectedBlog)}
                      className="flex items-center px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
                    >
                      <Heart className={`w-5 h-5 mr-1 ${selectedBlog.likes > 0 ? 'fill-emerald-600' : ''}`} />
                      {selectedBlog.likes} Likes
                    </button>
                    <button
                      onClick={() => handleEdit(selectedBlog)}
                      className="flex items-center px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50"
                    >
                      <Edit className="w-5 h-5 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(selectedBlog.id)}
                      className="flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5 mr-1" /> Delete
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    <div className="flex gap-2 mb-6">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Write a comment..."
                      />
                      <button 
                        onClick={handleAddComment}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                      >
                        Post
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedBlog.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            {comment.author}
                          </p>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default PostCard;