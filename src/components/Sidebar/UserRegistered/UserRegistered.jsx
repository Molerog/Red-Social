import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "antd";
import { follow, getUsers, unfollow } from "../../../features/users/usersSlice";
import "./UserRegistered.scss";
const User = () => {
  const url = "http://localhost:8080/users/";
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);
  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  const allUsers = users?.map((element) => {
    const isAlreadyFollowed = element.followers?.includes(user?.user?._id);
    return (
      <div className="RightBarContainer">
        <div className="WrapContainer">
          <ul className="RightBarUserList" key={element._id}>
            <li className="RightBarUser">
              <div className="RightProfileImgContainer">
                <img
                  className="RightBarProfileImg"
                  src={url + element?.imagepath}
                  alt=""
                />

                <span className="RightBarOnline"></span>
              </div>
              <span className="RightBarUserName">{element.name}</span>
            </li>

            {isAlreadyFollowed ? (
              <Button
                type="danger"
                onClick={() => dispatch(unfollow(element._id))}
              >
                Dejar de seguir
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => dispatch(follow(element._id))}
              >
                Seguir
              </Button>
            )}
          </ul>
        </div>
      </div>
    );
  });

  return <div>{allUsers}</div>;
};

export default User;
