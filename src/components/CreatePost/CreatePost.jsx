import { createPost, getInfo } from "../../features/posts/postsSlice";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React, { useState } from "react";
import "./CreatePost.scss";

const CreatePost = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { newPost } = useSelector((state) => state.posts);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.target.myFile.files[0])
      formData.set("imagePost", e.target.myFile.files[0]);
    formData.set("title", e.target.title.value);
    formData.set("body", e.target.content.value);
    if (e.target.title.value != null && e.target.content.value != null) {
      setVisible(false);
      await dispatch(createPost(formData));
    }
  };

  useEffect(() => {
    dispatch(getInfo()); //
  }, [newPost]);

  return (
    <div className="CreateButton">
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
          className="Form"
          onSubmit={onSubmit}
          // className="form card animate__animated animate__fadeIn"
        >
          <div className="InputForm">
            <input type="file" id="myFile" name="myFile" />
            <input type="text" placeholder="Título del post" name="title" />
            <textarea type="text" placeholder="¿En qué estás pensando?" name="content"  rows="10" cols="50"></textarea>
            <button type="submit">Añade una publicación</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreatePost;
