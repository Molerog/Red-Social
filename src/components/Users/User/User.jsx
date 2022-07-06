import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "antd";
import { follow, getUsers } from "../../../features/users/usersSlice";

const User = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state)=> state.users)
  const dispatch = useDispatch();

  const Users = async () => {
    await dispatch(getUsers());
  };

  useEffect(() => {
    Users();
  }, []);

  const isAlreadyFollowed = users.followers?.includes(user?.user._id);

  const allUsers = users?.map((user) => {
    return (
      <ul key={user._id}>
        <li>Nombre de usuario:{user.name}</li>
        <li>Email de usuario:{user.email}</li>
        <li>Role de usuario:{user.role}</li>
        <li>Followers:{user.followers.length}</li>
        {isAlreadyFollowed ? (
          <Button type="danger" onClick={() => dispatch((user._id))}>
            Dejar de seguir
          </Button>
        ) : (
          <Button type="primary" onClick={() => dispatch(follow(user._id))}>
            Seguir
          </Button>
        )}
      </ul>
    );
  });

  return <div>{allUsers}</div>;
};

export default User;
