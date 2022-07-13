import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../../../features/auth/authSlice";
import Navbar from "../../Navbar/Navbar";
import "./OtherUserDetail.scss";

const url = "http://localhost:8080/posts/";
const url2 = "http://localhost:8080/users/";

const OtherUserDetail = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { user: userProfile } = useSelector((state) => state.users);

  const posts = userProfile.postIds;
  const followers = userProfile.followers;
  const following = userProfile.following;

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (!user) {
    return <>Cargando Perfil...</>;
  }
  const postInfo = userProfile?.postIds?.map((e) => {
    
    return (
      <div className="MegaSuper" >
        <div className="Super" key={e._id}>
          <div className="PostUserContainer">
            <span className="Title">
              <h3>{e.title}</h3>
            </span>
            <div className="ImageContainer">
              <img className="Image" src={url + e.imagepath} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  });
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
                  <img
                    className="photo"
                    src={url2 + userProfile?.imagepath}
                    alt=""
                  />
                </div>
                <h4 className="name">{userProfile?.name}</h4>
                <p className="info">UI/UX Designer</p>
                <p className="info">{userProfile?.email}</p>
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
            <div className=' SuperGeneralContainer'>{postInfo}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OtherUserDetail;
