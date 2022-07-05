import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import { destroy } from "../../features/posts/postsSlice"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} es requerido",
};

const EditPost = () => {
  const [visible, setVisible] = useState(false);
  const { info } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    if (values != null) {
      console.log(values);
      setVisible(false);
      //   await dispatch(createPost(values))
    }
  };

  const dispatch = useDispatch();
  const destroyPost = (value) => {
    dispatch(destroy(value));
  };
 
  const editButton = info.postIds?.map((e) => {
    return (
      <div key= {e._id}>
        <span>{e.title}</span>
        <Button
          type="primary"
          onClick={() => {
            destroyPost(e._id);
          }}
        >
          Borrar Post
        </Button>
        <Button type="primary" onClick={() => setVisible(true)}>
          Editar Post
        </Button>
        <Modal
          title="Nuevo Post"
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
          >
            <Form.Item
              name={"title"}
              label="Título"
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
      </div>
    );
  });
  return <>{editButton}</>;
};

export default EditPost;
