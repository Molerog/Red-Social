import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import UserLogged from "./UserLogged/UserLogged";
import { getUserInfo } from "../../features/auth/authSlice";

const url = "http://localhost:8080/users/";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, info } = useSelector((state) => state.auth);
  console.log("soy el profile", user);
  console.log("soy el profile", info);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (!user) {
    return <>Cargando Perfil...</>;
  }
  return (
    <>
      <div>
        <h1>Profile</h1>
        {info ? (
          <>
            <img src = {url + info?.imagepath} width='100px' />
            <p>{info?.name}</p>
            <p>{info?.email}</p>
          </>
        ) : (
          <>
            <p>{user?.user?.imagepath}</p>
            <p>{user?.user?.name}</p>
            <p>{user?.user?.email}</p>
          </>
        )}{" "}
      </div>
      <div>
        <UserLogged />
      </div>
    </>
  );
};

export default Profile;
