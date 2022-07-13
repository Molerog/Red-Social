import User from "./User/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../features/users/usersSlice";
import Navbar from "../Navbar/Navbar";
import { getUserInfo } from "../../features/auth/authSlice";
import "./User.scss";

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
      <div className= 'animate__animated animate__fadeInRight'>
      <User />
      </div>
    </div>
  );
};

export default Users;
