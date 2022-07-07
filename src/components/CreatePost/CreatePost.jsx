import { createPost } from "../../features/posts/postsSlice";
import { Button, Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

// const validateMessages = {
//   required: "${label} es requerido",
// };

const CreatePost = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    console.log(e.target.myFile.files[0])
    e.preventDefault()
    const formData = new FormData();
    if (e.target.myFile.files[0]) formData.set('imagePost', e.target.myFile.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("body", e.target.content.value);
    if ( e.target.title.value != null && e.target.content.value != null) {
      setVisible(false);
      await dispatch(createPost(formData))
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Crear un Post
      </Button>
      <Modal
        title="Nuevo Post"
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
         <form
          onSubmit={onSubmit}
          className="form card animate__animated animate__fadeIn"
        >
          <input type="file" name="myFile"/>
          <input type="text" placeholder="Title..." name="title" />
          <input type="text" placeholder="Description..." name="content" />
          <button type="submit">Añade una publicación</button>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
