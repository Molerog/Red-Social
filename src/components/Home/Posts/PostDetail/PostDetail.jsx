import { useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../features/posts/postsSlice";
import { Avatar, Comment, Form, Input, Button } from "antd";
import React, { useState } from "react";
import moment from "moment";
import { createComment, dislike, like } from "../../../../features/comments/commentsSlice";


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
  const { comments }= useSelector((state) => state.comments);
  const { post } = useSelector((state) => state.posts);
  const { user } = useSelector ((state) => state.auth);
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
  
  const commentUser = post.comments?.map((element) => {
    const isAlreadyLiked = element.likes?.includes(user?.user._id)
    return (
      <div key={element._id}>
        <Comment
          author={<a>{element.userId?.name}</a>}
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={<p>{element.body}</p>}
        />
        {isAlreadyLiked ? (
          <HeartFilled onClick={() => dispatch(dislike(element._id))} />
        ): (
          <HeartOutlined onClick={() => dispatch(like(element._id))} />
        )}
      </div>
    );
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, [comments]);
  return (
    <>
      <div>
        <h1>PostDetail</h1>
        <p>{post.title}</p>
        <p>{post.body}</p>
        <ul>{commentUser}</ul>
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
