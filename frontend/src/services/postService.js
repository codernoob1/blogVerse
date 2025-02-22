import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const getPostById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const likePost = async (id) => {
  await axios.put(`${API_URL}/like/${id}`, {}, { withCredentials: true });
};

export const deletePost = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

export const editPost = async (id, updatedData) => {
  await axios.put(`${API_URL}/${id}`, updatedData, { withCredentials: true });
};

export const addComment = async (id, comment) => {
  await axios.post(`${API_URL}/${id}/comment`, { comment }, { withCredentials: true });
};
