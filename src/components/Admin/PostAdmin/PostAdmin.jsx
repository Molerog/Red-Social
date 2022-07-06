import { useDispatch, useSelector } from "react-redux";
import { destroy } from "../../../features/posts/postsSlice";



const PostAdmin = () => {
    const {posts} = useSelector((state => state.posts))
    const dispatch = useDispatch();

    const post = posts?.map((post)=>{
        return (
            <div key={post._id}>
                <p>{post.title}</p>
                <button onClick={() => dispatch(destroy(post._id))}>X</button>
            </div>
        )
    })
  return (
    <div>{post}</div>
  )
}

export default PostAdmin