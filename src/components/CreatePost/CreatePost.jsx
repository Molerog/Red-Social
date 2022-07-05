import { createPost } from "../../features/posts/postsSlice";
import { Button, Modal, Form, Input} from "antd";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
const validateMessages = {
    required: '${label} es requerido',
  };

 
const CreatePost = () => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        if (values != null){
          setVisible(false)
          await dispatch(createPost(values))
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
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
        name={'title'}
        label="Título"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={['body']} label="Texto del post"  rules={[
          {
            required: true,
          },
        ]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Publicar
        </Button>
      </Form.Item>
      </Form>
        </Modal>
      </>
  )
}

export default CreatePost