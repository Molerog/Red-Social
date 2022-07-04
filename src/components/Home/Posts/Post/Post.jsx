import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Form, Input} from "antd";
import React, { useState } from "react";
import './Post.scss'
import { createPost } from "../../../../features/posts/postsSlice";

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

const Post = () => {
  const [visible, setVisible] = useState(false);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  //Aplicar useEffect en el futuro
  const onFinish = (values) => {
    if (values != null){
      setVisible(false)
      dispatch(createPost(values))
      // Form.Item.props.form.resetFields()
    }
  };
  const post = posts.map((post) => {
    return (
      <div className="post" key={post._id}>
        <Link to={"/posts/id/" + post._id}>
          <p className='prueba'>{post.title}</p>
        </Link>
      </div>
    );
  });
  return (
    <>
      <div>{post}</div>
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
    </>
  );
};

export default Post;
