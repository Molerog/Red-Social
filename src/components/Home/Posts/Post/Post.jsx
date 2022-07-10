import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled, CommentOutlined } from "@ant-design/icons";
import { dislike, like } from "../../../../features/posts/postsSlice";
import "../Post/Post.scss";
const urlPost = "http://localhost:8080/posts/";
const urlUser = "http://localhost:8080/users/";

const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const post = posts?.map((post) => {
    console.log(post.comments);
    const isAlreadyLiked = post.likes?.includes(user?.user._id);
    return (
      <div className="Post" key={post._id}>
        <div className="PostWrapper">
          <div className="PostTop">
            <div className="PostTopLeft">
              <img
                className="PostProfileImg"
                src={urlUser + post?.userId.imagepath}
                alt=""
              />
              <span className="PostUserName">{post?.userId.name}</span>
            </div>
            <div className="PostCenter">
              <Link to={"/posts/id/" + post._id}>
                <p className="PostTitle">{post.title}</p>

                <img
                  className="PostImage"
                  src={urlPost + post.imagepath}
                  alt=""
                />
              </Link>
            </div>
            <div className="PostBottom">
              <div className="PostBottomLeft">
                {isAlreadyLiked ? (
                  <HeartFilled style={{fontSize: '25px', color: '#f5222d'}} onClick={() => dispatch(dislike(post._id))} />
                  ) : (
                    <HeartOutlined style={{ fontSize: '25px', color: '#f5222d' }} theme="outlined" onClick={() => dispatch(like(post._id))} />
                    )}
                    {post.likes?.length} personas dieron like
              </div>
              <div className="postBottomRight">
                <CommentOutlined style={{fontSize: '25px', color: ''}} />
                {post.commments?.length}comentarios
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div>{post}</div>
    </>
  );
};

export default Post;
