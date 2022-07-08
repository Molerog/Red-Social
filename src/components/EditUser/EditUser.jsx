import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { getUsersById, updateUsers } from "../../features/users/usersSlice";

const EditUser = () => {
  const initialState = {
    name: '',
    email:'',
    password:'',
    imageUser:''
  }
  const [formData, setFormData] = useState(initialState)
  const {name, email, password, imageUser} = formData;
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { user: userPrint } = useSelector((state) => state.users)

//   const getData = (_id) => {
//     dispatch(getUsersById(_id));
//     setVisible(true);
//   };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    const formData = new FormData();
    if (e.target.myFile.files[0])
    formData.set("imageUser", e.target.myFile.files[0]);
    formData.set("name", e.target.name.value);
    formData.set("email", e.target.email.value);
    formData.set("password", e.target.password.value);    
      setVisible(false);
      setFormData(initialState)
      await dispatch(updateUsers(formData));
      
  };

  const onChange = (e) =>{
    setFormData((prevState)=>({
        ...prevState,
    [e.target.name]: e.target.value,
    }))
  }
 

  useEffect(() => {
    setFormData(userPrint)
    // eslint-disable-next-line
  }, [userPrint]);

  return (
    <>
      <div key={user.user._id}>
        <Button
          type="primary"
          onClick={setVisible()}
        >
          Editar Perfil
        </Button>
      </div>
      <Modal
        title="Editar perfil"
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <form          
          onSubmit={onSubmit}
          className="form card animate__animated animate__fadeIn"
        >
            
          <input onChange={onChange} type="text" placeholder="Nombre" name="name" value={name}/>
          <input onChange={onChange} type="text" placeholder="email" name="email" value={email} />
          <input onChange={onChange} type="text" placeholder="password" name="password" value={password} />
          <br />
          <input onChange={onChange} type="file" name="myFile" value={imageUser} />
          <br />
          <button type="submit">Añade una publicación</button>
        </form>
      </Modal>
    </>
  );
};

export default EditUser;
