import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../../../features/posts/postsSlice'


const PostDetail = () => {
    const {_id} = useParams();
    const dispatch = useDispatch();
    const {post} = useSelector((state)=> state.posts)
  
  console.log(post)
    useEffect(()=>{
      dispatch(getById(_id));
    },[]);
  return (
    <div>
        <h1>PostDetail</h1>
        <p>{post.title}</p>
        <p>{post.body}</p>
        {/* <p>{comments}</p> */}
        </div>
  )
}

export default PostDetail