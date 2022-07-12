import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../../../features/auth/authSlice";
import Navbar from "../../Navbar/Navbar";
import EditUser from "../../EditUser/EditUser";
import './OtherUserDetail.scss'

const url = "http://localhost:8080/users/";

const OtherUserDetail = () => {
  const dispatch = useDispatch();
  const { user, info } = useSelector((state) => state.auth);
  const {user: userProfile} = useSelector((state)=> state.users)

  const posts = userProfile.postIds;
  const followers = userProfile.followers;
  const following = userProfile.following;

  console.log(userProfile)

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
          <main>
            <div className="row">
              <div className="left col-lg-4">
                <div className="photo-left">
                  <img className="photo" src={url + userProfile?.imagepath} alt="" />
                </div>
                <h4 className="name">{userProfile?.name}</h4>
                <p className="info">UI/UX Designer</p>
                <p className="info">{userProfile.email}</p>
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
          </main>
        </div>
        {/* <div>
              <h1>Profile</h1>
              <img src={url + info?.imagepath} alt="" width="100px" />
              <p>{info?.name}</p>
              <p>{info?.email}</p>
            </div>
            <div> */}
      </div>
    </div>
    // </div>
  );
};

export default OtherUserDetail;
