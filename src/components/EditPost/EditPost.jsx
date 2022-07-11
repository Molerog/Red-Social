import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import { destroy, editPost, getById } from "../../features/posts/postsSlice";
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
  const { info, post } = useSelector((state) => state.posts);

  console.log(info);

  const getId = (_id) => {
    dispatch(getById(_id));
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
    form.setFieldsValue(post);
  }, [post]);

  const dispatch = useDispatch();

  const destroyPost = (value) => {
    dispatch(destroy(value));
  };

  const editButton = info?.postIds?.map((e) => {
    console.log(e.imagepath);
    return (
      <div key={e._id}>
        <div class="PostContainer">
          <main>
            <div className="BottomContainer">
              <div className="row">
                <div className="left col-lg-4">
                  <div className="row gallery">
                    <div className="GaleryContainer">
                      <div className="PostUserContainer">
                        <span className= 'Title'>
                          <h3>{e.title}</h3>
                        </span>
                        <img src={url + e.imagepath} />
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
                </div>
              </div>
            </div>
          </main>
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
