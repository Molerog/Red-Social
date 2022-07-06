import { useDispatch, useSelector } from "react-redux";
import { destroy } from "../../../features/posts/postsSlice";
import { Button } from 'antd';




const PostAdmin = () => {
    const {posts} = useSelector((state => state.posts))
    const dispatch = useDispatch();

    const post = posts?.map((post)=>{
        return (
            <div key={post._id}>
                <p>{post.title}</p>
                <Button type="danger" onClick ={() => dispatch(destroy(post._id))}>Eliminar Post</Button>               
            </div>
        )
    })
  return (
    <div>{post}</div>
  )
}

export default PostAdmin