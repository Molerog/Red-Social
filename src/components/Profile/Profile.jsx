import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import UserLogged from "./UserLogged/UserLogged";
import { getUserInfo } from "../../features/auth/authSlice";
import "./Profile.scss";
import Navbar from "../Navbar/Navbar";
import EditUser from "../../components/EditUser/EditUser";

const url = "http://localhost:8080/users/";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, info } = useSelector((state) => state.auth);

  const posts = info.postIds;
  const followers = info.followers;
  const following = info.following;

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (!user) {
    return <>Cargando Perfil...</>;
  }
  return (
    <div className="ProfileContainer">
      <Navbar />
        <div className="UserContainer">
          <div className="WrapperContainerCard ">
            <header>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </header>
            <div className="row">
              <div className="left col-lg-4">
                <div className="photo-left">
                  <img className="photo" src={url + info?.imagepath} alt="" />
                </div>
                <h4 className="name">{info?.name}</h4>
                <p className="info">UI/UX Designer</p>
                <p className="info">{info.email}</p>
                <div className="stats row">
                  <div className="stat col-xs-4">
                    <p className="number-stat">{followers?.length}</p>
                    <p className="desc-stat">Followers</p>
                  </div>
                  <div className="stat col-xs-4">
                    <p className="number-stat">{following?.length}</p>
                    <p className="desc-stat">Following</p>
                  </div>
                  <div className="stat col-xs-4">
                    <p className="number-stat">{posts?.length}</p>
                    <p className="desc-stat">Posts</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ContainerButton">
              <EditUser />
            </div>
          </div>

          <UserLogged />
        </div>
      </div>
  );
};

export default Profile;
