import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import Post from "./Post/Post";
import { LoadingOutlined } from "@ant-design/icons";
// import CreatePost from "../../CreatePost/CreatePost";
import { getUserInfo } from "../../../features/auth/authSlice";
import "./Posts.scss";

const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getUserInfo());
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Cargando posts...</h1>
        <LoadingOutlined
          style={{
            fontSize: 120,
          }}
          spin
        />
      </>
    );
  }
  return (
    <div className="Feed">
      
      <Post />
    </div>
  );
};

export default Posts;
