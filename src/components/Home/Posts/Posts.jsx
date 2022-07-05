import { useDispatch, useSelector } from "react-redux";
import { getAll, reset } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import Post from "./Post/Post";
import { LoadingOutlined } from "@ant-design/icons";
import CreatePost from "../../CreatePost/CreatePost";



const Posts = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPostsAndReset = async() => {  
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
    <div>
      <h1>Posts</h1>
      <Post />
      <CreatePost/>
    </div>
  );
};

export default Posts;
