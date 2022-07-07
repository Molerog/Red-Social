import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { follow ,getUsersByName,unfollow } from "../../../features/users/usersSlice";
import './Users.scss'
const { Search } = Input;


const User = () => {

  const [data, setData] = useState('');
   
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  
 
  const onChange = (e) =>{
     setData(e.target.value)
  }


  // const url = 'searchByName/';
  // const navigate = useNavigate();
  // const onSearch = (name) => { 
  //   navigate(url + name); 
  // };

  // const Users = async () => {
  //   await dispatch(getUsers());
  // };

  useEffect(() => {
    if(data.length !== 0){
      dispatch(getUsersByName(data))   
    }    
      // eslint-disable-next-line
    },[data])
  
  
  
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

  return <div>
     <Search
        allowClear
        placeholder="Buscar usuario"
        size="medium"
        onChange={onChange}
        name= 'search'
        style={{
          width: 304,
        }}
      />
    {allUsers}
    </div>;
};

export default User;
