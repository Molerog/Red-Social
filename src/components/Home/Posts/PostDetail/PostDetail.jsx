import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../../../features/posts/postsSlice'

const PostDetail = () => {
    const {_id} = useParams();
    console.log(_id)
    const dispatch = useDispatch();
    const {post} = useSelector((state)=> state.post)
    useEffect(()=>{
        dispatch(getById(_id));
    },[]);
  return (
    <div>
        <h1>PostDetail</h1>
        <p>{post.title}</p>
        <p>{post.body}</p>
        </div>
  )
}

export default PostDetail