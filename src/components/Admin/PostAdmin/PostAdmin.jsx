import { useDispatch, useSelector } from "react-redux";
import { destroy } from "../../../features/posts/postsSlice";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./PostAdmin.scss";

const url = "http://localhost:8080/posts/";

const url2 = "http://localhost:8080/users/"

const PostAdmin = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const post = posts?.map((post) => {
    return (
      <div className="PostMapContainer" key={post._id}>
        <div className="Wrapper">
          <div className="TitleImgContainer">
            <Link to={"/posts/id/" + post._id}>
              <p className="Title"><h2>{post.title}</h2></p>
              <div className="PostPicture">
                <img className="img" src={url + post.imagepath} width="400px" />
              </div>
            </Link>
          </div>
          <div className="RightContainer">
            <div className="NameContainer">
              <span>Post de:</span>
              <span className="UserName">{post.userId?.name}</span>
            </div>
            <div className="RoleContainer">
              <span>Role:</span>
              <span className="Role">{post.userId?.role}</span>
            </div>
            <br />
            <Button style={{width:500, height:60}}type="danger" onClick={() => dispatch(destroy(post._id))}>
              Eliminar Post
            </Button>
          </div>
        </div>
        <div className="ImgContainer">
        <Link to={"/profile"}>
          <img className='Avatar' alt='' src= {url2 + post?.userId?.imagepath}></img>
       </Link>
        </div>
      </div>
    );
  });
  return <div>{post}</div>;
};

export default PostAdmin;
