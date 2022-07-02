import { useSelector } from 'react-redux';

const Post = () => {
  console.log('soy el mapeador Post')
  const {posts} = useSelector((state) => state.posts);
  const post = posts.map((post)=>{
    console.log (post)
    return (
      <div className='post' key= {post._id}>
        <p>{post.title}</p> 
      </div>
    )
  })
  return (
    <div>{post}</div>
  )
}

export default Post