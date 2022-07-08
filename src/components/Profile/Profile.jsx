import { useSelector } from "react-redux";
import EditUser from "../EditUser/EditUser";
import UserLogged from "./UserLogged/UserLogged";

const Profile = () => {
  const { user, userUpdated } = useSelector((state) => state.auth);
  console.log(user)
  console.log(userUpdated)
  if (!user) {
    return (<>Cargando Perfil...</>)
  }
  return ( 
    <>
      <div>
        <h1>Profile</h1>
        <p>Imagen de usuario</p>
        <p>{user?.user?.name}</p>
        <p>{user?.user?.email}</p>
        <EditUser />
      </div>
      <div>
        <UserLogged />
      </div>
    </>
  );
};

export default Profile;
