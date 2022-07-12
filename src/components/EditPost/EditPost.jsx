import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import {
  destroy,
  editPost,
  setPostToEdit,
} from "../../features/posts/postsSlice";
import "./EditPost.scss";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const url = "http://localhost:8080/posts/";

const validateMessages = {
  required: "${label} es requerido",
};

const EditPost = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { info, post, postToEdit } = useSelector((state) => state.posts);

  const getId = (_id) => {
    const superPost = info.postIds.filter((e) => e._id === _id)[0];
    dispatch(setPostToEdit(superPost));
    setVisible(true);
  };

  const onFinish = async (values) => {
    if (values != null) {
      const data = { ...values, _id: post._id };
      setVisible(false);
      await dispatch(editPost(data));
    }
  };

  useEffect(() => {
    form.setFieldsValue(postToEdit);
  }, [postToEdit]);

  const dispatch = useDispatch();

  const destroyPost = (value) => {
    dispatch(destroy(value));
  };

  const editButton = info?.postIds?.map((e) => {
    return (
      <div className="MegaSuper" key={e._id}>
        <div className="Super">
          <div className="PostUserContainer">
            <span className="Title">
              <h3>{e.title}</h3>
            </span>
            <div className="ImageContainer">
              <img className="Image" src={url + e.imagepath} alt='' />
            </div>
            <div className="Buttons">
              <Button
                type="primary"
                onClick={() => {
                  getId(e._id);
                }}
              >
                Editar Post
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  destroyPost(e._id);
                }}
              >
                Borrar Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      {editButton}
      <Modal
        title="titulo"
        visible={visible}
        width={1000}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item
            name={"title"}
            label="Título"
            placeholder="hola"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["body"]}
            label="Texto del post"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditPost;
