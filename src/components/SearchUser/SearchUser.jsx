import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersByName } from '../../features/users/usersSlice';
import User from '../Users/User/User';


const SearchUser = () => {
    const { name } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getUsersByName(name))
    },[name])
  return (
    <div><User/></div>
  )
}

export default SearchUser