import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../features/auth/authSlice';
import { getPostByTitle } from '../../features/posts/postsSlice';
import Post from '../Home/Posts/Post/Post';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const Search = () => {
  const { title } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPostByTitle(title))
  },[title])



  useEffect(() => {
    dispatch(getUserInfo());
  }, []);


  return (<>
     <div className= 'HomeContainer'>
      <Navbar/>
      <Post/>
      <Sidebar/>
       </div>
      </>
  )
}

export default Search