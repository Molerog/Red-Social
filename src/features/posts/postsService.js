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
  return res.data;
};

const createPost = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.post(API_URL + "/posts/", data, {
    headers: {
      authorization: user?.token,
    },        
  });
  return res.data
};

const like = async (_id) =>{
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(API_URL + '/posts/likes/' + _id, {}, {
    headers: {
      authorization: user?.token,
    }
  });
  return res.data;
};

const dislike = async (_id) =>{
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.put(API_URL + '/posts/removelikes/' + _id, {}, {
    headers: {
      authorization: user?.token,
    }
  });
  console.log(res.data.post)
  return res.data;
};

const destroy = async (_id) =>{
  const user = JSON.parse(localStorage.getItem('user'));
  const res = await axios.delete(API_URL + '/posts/id/' + _id, {
    headers: {
      authorization: user?.token,
    }
  });
  return res.data
}

const postsService = {
  getAll,
  getById,
  getPostByTitle,
  createPost,
  like,
  dislike,
  destroy
};

export default postsService;
