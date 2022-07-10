import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InfoUserLogged from "../UserLogged/InfoUserLogged.jsx/InfoUserLogged";
import { getInfo } from "../../../features/posts/postsSlice";

const UserLogged = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo());
  }, [posts]);



  return (
    <>
      <InfoUserLogged />
    </>
  );
};

export default UserLogged;
