import axios from "axios";

const API_URL = "http://localhost:8080";

const headers = {
  "Content-Type": "application/json;charset=UTF-8",
};
const getAll = async () => {
  const res = await axios.get(API_URL + "/posts", {
    mode: "cors",
    headers: headers,
  });
  return res.data;
};
const getById = async (_id) => {
  const rest = await axios.get(API_URL + "/posts/id/" + _id);
  return rest.data;
};

const getPostByTitle = async (title) => {
  const res = await axios.get(API_URL + "/posts/search/" + title);
  console.log(res.data, "Soy el Service");
  return res.data;
};

const createPost = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  await axios.post(API_URL + "/posts/", data, {
    headers: {
      authorization: user?.token,
    },    
  });
};

const postsService = {
  getAll,
  getById,
  getPostByTitle,
  createPost,
};

export default postsService;
