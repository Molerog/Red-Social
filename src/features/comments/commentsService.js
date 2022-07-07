import axios from "axios";

const API_URL = "http://localhost:8080";

const createComment = async (comment) => {
    const user = JSON.parse(localStorage.getItem("user"));
    await axios.post(API_URL + "/comments/", comment, {
      headers: {
        authorization: user?.token,
      },        
});
}
const like = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/comments/likes/" + _id, {}, {
    headers: {
      authorization: user?.token,
    },        
});

return res.data
}

const  dislike = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/comments/removelikes/"+ _id, {}, {
    headers: {
      authorization: user?.token,
    },        
});

return res.data
}
const commentsService = {
    createComment,
    like,
    dislike
  };

export default commentsService;