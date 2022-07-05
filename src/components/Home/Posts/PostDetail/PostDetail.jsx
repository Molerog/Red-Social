import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../features/posts/postsSlice";
// import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip, Form, Input, Button } from "antd";

import React, { useState } from "react";
import moment from "moment";
import createComment from "../../../../features/comments/commentsSlice";

const { TextArea } = Input;
const validateMessages = {
  required: '${label} es requerido',
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form validateMessages={validateMessages}>
      <Form.Item name={['comentario']} rules={[{ required: true }]}>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Comentar
        </Button>
      </Form.Item>
    </Form>
  </>
);

const PostDetail = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const [comment, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) return;
    let data = { body:value, postId:_id }; 
    setSubmitting(true);
    await dispatch(createComment(data))
    dispatch(getById(_id));
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComment([
        ...comment,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = async (e) => {
    setValue(e.target.value);
  };

  const comments = post.comments?.map((comment) => {
    return (
      <div key={comment._id}>
        <Comment
          author={<a>{comment.userId?.name}</a>}
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={<p>{comment.body}</p>}
        />
      </div>
    );
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, []);
  return (
    <>
      <div>
        <h1>PostDetail</h1>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <ul>{comments}</ul>
      </div>
      <div>
        <Comment
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    </>
  );
};

export default PostDetail;
