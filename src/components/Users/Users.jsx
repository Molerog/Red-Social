import User from "./User/User";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
// import { Input } from "antd";
// import { useNavigate } from "react-router-dom";
import { getUsers } from "../../features/users/usersSlice";
// const { Search } = Input;

const Users = () => {
  // const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const onSearch = (e) => {
  //   navigate("searchByName/" + e);
  // };

  const Users = async () => {
    await dispatch(getUsers());
  };

  useEffect(() => {
    Users();
    // eslint-disable-next-line
  }, []);
  console.log('hola')
  return (
    <>
      <h2>Usuarios</h2>
      {/* <Search
        // allowClear
        placeholder="Buscar usuario"
        enterButton="Buscar"
        size="medium"
        onSearch={onSearch}
        style={{
          width: 304,
        }}
      /> */}
      <User />
    </>
  );
};

export default Users;
