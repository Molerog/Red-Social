import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "antd";
import { follow, getUsers, unfollow } from "../../../features/users/usersSlice";

const User = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const Users = async () => {
    await dispatch(getUsers());
  };

 

  useEffect(() => {
    Users();
    // eslint-disable-next-line
  }, []);
  
  const allUsers = users?.map((element) => {
    const isAlreadyFollowed = element.followers?.includes(user?.user?._id);   
    return (
      <ul key={element._id}>
        <li>Nombre de usuario:{element.name}</li>
        <li>Email de usuario:{element.email}</li>
        <li>Role de usuario:{element.role}</li>
        <li>Followers:{element.followers.length}</li>
        {isAlreadyFollowed ? (
          <Button type="danger" onClick={() => dispatch(unfollow(element._id))}>
            Dejar de seguir
          </Button>
        ) : (
          <Button type="primary" onClick={() => dispatch(follow(element._id))}>
            Seguir
          </Button>
        )}
      </ul>
    );
  });

  return <div>{allUsers}</div>;
};

export default User;
