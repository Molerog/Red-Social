import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { Button, Card } from "antd";
import {
  UserOutlined ,
  SendOutlined ,
  NotificationOutlined,
  UsergroupAddOutlined,
  SearchOutlined   
} from '@ant-design/icons';
import {
  deleteUsers,
  follow,
  getUsers,
  getUsersByName,
  unfollow,
} from "../../../features/users/usersSlice";
import "./User.scss";

const url = "http://localhost:8080/users/";

const { Search } = Input;

const User = () => {
  const navigate = useNavigate();
  const admin = window.location.pathname.includes("admin");
  const [data, setData] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setData(e.target.value);
  };

  const destroyPost = (value) => {
    dispatch(deleteUsers(value));
  };

  const onSearch = (_id) => {
    navigate("/search/users/" + _id);
  };

  useEffect(() => {
    if (data.length !== 0) {
      dispatch(getUsersByName(data));
    } else {
      dispatch(getUsers());
    }
    // eslint-disable-next-line
  }, [data]);

  const allUsers = users?.map((element) => {
    const isAlreadyFollowed = element.followers?.includes(user?.user?._id);
    return (
      <div className="WraperContainer" key={element._id}>
        <Card className="Cards " hoverable="true" style={{ width: 400 }}>
          <div className="avatar-name">
            <img
              alt="example"
              src={url + element.imagepath}
              style={{ width: 40 }}
            />
            <span className="ant-card-head">{element.name}</span>
          </div>
          <div className="Grid">
            <div className="Container">
              <li className="Usuario">
              <UserOutlined /> Nombre de usuario:<h3>{element.name}</h3>
              </li>
            </div>
            <div className="Container">
              <li className="Email">
              <SendOutlined /> Email de usuario:<h4>{element.email}</h4>
              </li>
            </div>
            <div className="Container">
              <li className="Rol">
              <NotificationOutlined /> Role de usuario:<h4>{element.role}</h4>
              </li>
            </div>
            <div className="Container">
              <li className="Followers">
              <UsergroupAddOutlined /> Followers:<h4>{element.followers.length}</h4>
              </li>
            </div>
            <div className="Container">
              <li className="Following">
              <SearchOutlined /> Following:<h4>{element.following.length}</h4>
              </li>
            </div>          
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
              <Button type="primary" onClick={() => onSearch(element._id)}>
                Ver Perfil
              </Button>
              {user.user?.role === "admin" && admin ? (
                <Button
                  type="danger"
                  onClick={() => {
                    destroyPost(element._id);
                  }}
                >
                  Eliminar Usuario
                </Button>
              ) : null}
           
          </div>
        </Card>
      </div>
    );
  });

  return (
    <>
      <div className="SearchAndUsersContainer">
        <div className="SearchBox">
          <Search
            allowClear
            placeholder="Buscar usuario"
            size="medium"
            onChange={onChange}
            name="search"
            style={{
              width: 304,
            }}
          />
        </div>
        <div className="UsersGeneralContainer">{allUsers}</div>
      </div>
    </>
  );
};

export default User;
