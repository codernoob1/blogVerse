import { useEffect, useState } from "react";
// import { getAllPosts } from "../services/postService";
import PostCard from "../components/postCard";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* {posts.map((post) => <PostCard key={post._id} post={post} />)} */}
      <PostCard />
    </div>
  );
};

export default Explore;
