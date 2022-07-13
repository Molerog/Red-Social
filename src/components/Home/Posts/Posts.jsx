import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import Post from "./Post/Post";
// import CreatePost from "../../CreatePost/CreatePost";
import { getUserInfo } from "../../../features/auth/authSlice";
import "./Posts.scss";

const Posts = () => {
  const { newPost } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getUserInfo());
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
  }, [newPost]);


  return (
    <div className="Feed">   
      <Post />
    </div>
  );
};

export default Posts;
