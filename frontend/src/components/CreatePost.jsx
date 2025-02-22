import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Tag as TagIcon } from "lucide-react";
import axios from "axios";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    imageFile: null,
    tags: [],
    currentTag: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleAddTag = (e) => {
    if (e.key === "Enter" && post.currentTag.trim()) {
      e.preventDefault();
      setPost({
        ...post,
        tags: [...post.tags, post.currentTag.trim()],
        currentTag: "",
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost({
      ...post,
      tags: post.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, imageFile: file });

      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("tags", JSON.stringify(post.tags));
    if (post.imageFile) {
      formData.append("image", post.imageFile);
    }

    try {
      const res = await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // Ensures token is sent with request
      });

      if (res.data.success) {
        navigate("/explore"); // Redirect to explore page
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your post title"
              required
            />
          </div>

          {/* Content (Textarea) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows="6"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              placeholder="Write your post content here..."
              required
            />
          </div>

          {/* Tag Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              <TagIcon className="h-4 w-4 inline-block mr-1" />
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={post.currentTag}
              onChange={(e) => setPost({ ...post, currentTag: e.target.value })}
              onKeyDown={handleAddTag}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
              placeholder="Add tags (press Enter to add)"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-emerald-600 hover:text-emerald-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Image className="h-5 w-5 inline-block mr-1" />
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-2 py-2 border border-gray-300 rounded-md"
            />
            {previewImage && (
              <div className="mt-3">
                <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;