import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import InfoUserLogged from "../UserLogged/InfoUserLogged.jsx/InfoUserLogged";
import { getUsersById } from "../../../features/users/usersSlice";


const UserLogged = () => {
  const { posts } = useSelector((state) => state.posts);
  // const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersById());
  }, [posts]);

  return (
    <>
      <InfoUserLogged />
    </>
  );
};

export default UserLogged;
