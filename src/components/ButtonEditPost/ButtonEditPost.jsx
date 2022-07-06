import { useState } from "react";
import { useSelector} from "react-redux";
import { Button, Modal, Form, Input } from "antd";

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
      setVisible(false);
    }
  };
  const editButton = info.postIds?.map((e) => {
    return (
      <>
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
          </Form>
        </Modal>
      </>
    );
  });
  return [editButton]
};

export default EditPost;
