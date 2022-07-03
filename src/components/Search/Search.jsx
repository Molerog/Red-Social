import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostByTitle } from '../../features/posts/postsSlice';
import Post from '../Home/Posts/Post/Post';

const Search = () => {
  const { title } = useParams();
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(title, 'soy el UseEffect de Search')
    dispatch(getPostByTitle(title))
  },[title])
  return (
    <div><Post/></div>
  )
}

export default Search