import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { getInfo } from '../../../features/auth/authSlice';
import InfoUserLogged from '../UserLogged/InfoUserLogged.jsx/InfoUserLogged'

const UserLogged = () => {
    const {posts} = useSelector((state => state.posts))
    const dispatch = useDispatch()  
    const infoUser = async() => {  
        await dispatch(getInfo());
      };

      useEffect(() => {
        dispatch(getInfo());
      }, [posts]);
    
  return (
    <>
    <div>{infoUser}</div>
    <InfoUserLogged />
    </>
  )
}

export default UserLogged