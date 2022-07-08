import axios from "axios";

const API_URL = "http://localhost:8080";

const getUsers = async () => {
  const res = await axios.get(API_URL + "/users");
  return res.data;
};

const follow = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/users/follow/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const unfollow = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(
    API_URL + "/users/unfollow/" + _id,
    {},
    {
      headers: {
        authorization: user?.token,
      },
    }
  );
  return res.data;
};

const getUsersByName = async (name) => {
  const res = await axios.get(API_URL + "/users/searchByName/" + name);
  return res.data;
};

const deleteUsers = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.delete(API_URL + "/users/id/" + _id,
  {
    headers: {
      authorization: user?.token,
    },
  }
);
return res.data;
};

const updateUsers = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.put(API_URL + "/users/" , data,
  {
    headers: {
      authorization: user?.token,
    },
  }
);
console.log(res.data)
return res.data
}

const getUsersById = async (_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await axios.get(API_URL + "/users/id/" + _id,
  {
    headers: {
      authorization: user?.token,
    },
  }
);
return res.data
}


const usersService = {
  getUsers,
  follow,
  unfollow,
  getUsersByName,
  deleteUsers,
  updateUsers,
  getUsersById
};

export default usersService;
