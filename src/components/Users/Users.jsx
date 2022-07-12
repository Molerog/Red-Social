import User from "./User/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../features/users/usersSlice";
import Navbar from "../Navbar/Navbar";
import "./User.scss";
import { getUserInfo } from "../../features/auth/authSlice";

const Users = () => {
  const dispatch = useDispatch();

  const Users = async () => {
    await dispatch(getUsers());
  };

  useEffect(() => {
    Users();
    dispatch(getUserInfo())
    // eslint-disable-next-line
  }, []);
  return (
    <div className="GeneralContainer">
      <Navbar />
      <User />
    </div>
  );
};

export default Users;
