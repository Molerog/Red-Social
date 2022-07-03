import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Post = () => {
  const {posts} = useSelector((state) => state.posts);
  const post = posts.map((post)=>{
    console.log(post.title)
    return (
      <div className='post' key= {post._id}>
        <Link to ={'/posts/id/'+ post._id}>
        <p>{post.title}</p> 
        </Link>
      </div>
    )
  })
  return (
    <div>{post}</div>
  )
}

export default Post