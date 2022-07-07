import User from "./User/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../features/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const Users = async () => {
    await dispatch(getUsers());
  };

  useEffect(() => {
    Users();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h2>Usuarios</h2>
      <User />
    </>
  );
};

export default Users;
