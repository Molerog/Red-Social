
import { useDispatch, useSelector } from "react-redux";
import { getAll,reset } from "../../features/posts/postsSlice";
import { useEffect } from "react";
import PostAdmin from "./PostAdmin/PostAdmin";

const Admin = () => {
    const { isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const getPostsAndReset = async () => {
        await dispatch(getAll());
        dispatch(reset());
    };
    
    useEffect(() => {
        getPostsAndReset();
      }, []);
      if (isLoading) {
        return <h1>Cargando posts...</h1>;
      }
    
  return (
    <>
      <h1>Admin</h1>
      <PostAdmin />
    </>
  );
};

export default Admin;
