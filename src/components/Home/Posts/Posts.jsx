import { useDispatch, } from "react-redux";
import { getAll } from "../../../features/posts/postsSlice";
import { useEffect } from "react";
import Post from "./Post/Post";


const Posts = () => {
    console.log('soy Posts padre del mapeador Post')
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(getAll())
    }, [])
  return (
    <div>
        <h1>Posts</h1>
        <Post/>
    </div>
  )
}

export default Posts