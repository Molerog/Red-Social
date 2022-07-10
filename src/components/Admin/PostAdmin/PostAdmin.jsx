import { useDispatch, useSelector } from "react-redux";
import { destroy } from "../../../features/posts/postsSlice";
import { Button } from "antd";
import { Link } from "react-router-dom";

const url = "http://localhost:8080/posts/";

const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();


 

  const post = posts?.map((post) => {
    return (
      <div key={post._id}>
        <Link to={"/posts/id/" + post._id}>
        <p>{post.title}</p>        
        <div className="PostPicture">
          <img src={url + post.imagepath} width="400px" />
        </div>
        </Link>
        <span><h3>Usuario:</h3>{post.userId?.name}</span><h3>Role:</h3><span>{post.userId?.role}</span><br />
        <Button type="danger" onClick={() => dispatch(destroy(post._id))}>
          Eliminar Post
        </Button>
      </div>
    );
  });
  return <div>{post}</div>;
};

export default PostAdmin;
