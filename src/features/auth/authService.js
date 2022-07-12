import axios from "axios";

const API_URL = "http://localhost:8080";



const register = async (userData) => {
  const res = await axios.post(API_URL + "/users", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/users/logout", {
    headers: {
      authorization: user.token,
    },
  });
  if (res.data) {
    localStorage.removeItem("user");
  }
  return res.data;
};

const getUserInfo = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/users/user", {
    headers: {
      authorization: user.token,
    },
  });
  return res.data;
};

const updateUsers = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/users/", data, {
    headers: {
      authorization: user.token,
    },
  });
  if (res.data) {
    localStorage.setItem("userUpdated", JSON.stringify(res.data));
  }
 
  
  return res.data
};



const authService = {
  register,
  login,
  logout,
  getUserInfo,
  updateUsers,
  // getUsersById,
};

export default authService;
