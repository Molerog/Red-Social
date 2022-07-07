import { useSelector } from 'react-redux';
import UserLogged from './UserLogged/UserLogged';

const Profile = () => {

    const { user } = useSelector((state) => state.auth);
  return (
    <>
    <div>
        <h1>Profile</h1>
        <p>{user?.user.name}</p>
        <p>{user?.user.email}</p>
    </div>
    <div>
        <UserLogged />
    </div>
    </>
  )
}

export default Profile