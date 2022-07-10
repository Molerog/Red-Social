import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { updateUsers } from "../../features/auth/authSlice";


const EditUser = () => {
  const { user, info } = useSelector((state) => state.auth);
  const initialState = {
    name: "",
    email: "",
    password: "",
    imageUser: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { name, email, imageUser } = formData; //Se destructura por comodidad para no utilizar formData
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  
  // const { userUpdated } = useSelector((state) => state.auth)

 
  const onSubmit = async (e) => {
    e.preventDefault();
    const editedData = new FormData(); //si pulso F2 sobre una variable me cambia de nombre todas (con el mismo nombre[creo que solo en este archivo])
    if (e.target.myFile.files[0]) {
      editedData.set("imageUser", e.target.myFile.files[0]);
    }
    editedData.set("name", e.target.name.value);
    editedData.set("email", e.target.email.value);
    // editedData.set("password", e.target.password.value);
    setVisible(false);
    // setFormData(initialState);

    await dispatch(updateUsers(editedData));
    
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormData(info); //
  }, [info]);

  return (
    <>
      <div key={user.user?._id}>
        <Button type="primary" onClick={() => setVisible(true)}>
          Editar Usuario
        </Button>
      </div>
      <Modal
        title="Editar usuario"
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <form
          onSubmit={onSubmit}
          className="form card animate__animated animate__fadeIn"
        >
          <input
            onChange={onChange}
            type="text"
            placeholder="Nombre"
            name="name"
            value={name}
          />
          <input
            onChange={onChange}
            type="text"
            placeholder="email"
            name="email"
            value={email}
          />
          {/* <input
            onChange={onChange}
            type="text"
            placeholder="password"
            name="password"
            value={password}
          /> */}
          <br />
          <input
            onChange={onChange}
            type="file"
            name="myFile"
            value={imageUser}
          />
          <br />
          <button type="submit">Añade una publicación</button>
        </form>
      </Modal>
    </>
  );
};

export default EditUser;
