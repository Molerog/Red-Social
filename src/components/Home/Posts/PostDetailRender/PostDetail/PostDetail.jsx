import { useEffect } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../../../../features/posts/postsSlice";
import { Avatar, Comment, Form, Input, Button } from "antd";
import React, { useState } from "react";
import moment from "moment";
import {
  createComment,
  dislike,
  like,
} from "../../../../../features/comments/commentsSlice";
import "./PostDetail.scss";
import { getUserInfo } from "../../../../../features/auth/authSlice";

const { TextArea } = Input;
const validateMessages = {
  required: "${label} es requerido",
};

const url = "http://localhost:8080/users/"

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form validateMessages={validateMessages}>
      <Form.Item name={["comentario"]} rules={[{ required: true }]}>
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
  const { comments } = useSelector((state) => state.comments);
  const { post } = useSelector((state) => state.posts);
  const { user, info } = useSelector((state) => state.auth);
  const [comment, setComment] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) return;
    let data = { body: value, postId: _id };
    setSubmitting(true);
    await dispatch(createComment(data));
    dispatch(getById(_id));
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComment([
        ...comment,
        {
          author: post.userId.name,
          avatar: url+ info.imagepath,
          content: <p>{value}</p>,
        },
      ]);
    }, 1000);
  };




  

  const handleChange = async (e) => {
    setValue(e.target.value);
  };

  const commentUser = post.comments?.map((element) => {
    const isAlreadyLiked = element.likes?.includes(user?.user._id);
    return (
      <>
      <div className= 'animate__animated animate__fadeIn'key={element._id}>
        <Comment
          author={<a>{element.userId?.name}</a>}
          avatar={
            <Avatar src={url+element.userId.imagepath} alt="" />
          }
          content={<p>{element.body}</p>}
        />
        {isAlreadyLiked ? (
          <HeartFilled style={{fontSize: '18px', color: '#f5222d', marginRight: '0.5em'}} onClick={() => dispatch(dislike(element._id))} /> 
        ) : (
          <HeartOutlined style={{ fontSize: '15px', color: '#f5222d', marginRight: '0.5em' }} onClick={() => dispatch(like(element._id))} />
        )}
        {element.likes?.length} personas dieron like
      </div>
      <hr></hr>
      </>
    );
  });

  useEffect(() => {
    dispatch(getById(_id));
  }, [comments]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className="Caja">
      <div className="WrapperContainer">
        <div className="CommentsContainer">
          <p><img className='ImageUserPost' src= {url + post?.userId?.imagepath} alt=''></img>{post.userId?.name}</p>
          <p>{post.title}</p>
          <p>{post.body}</p>
          <ul>{commentUser}</ul>
        </div>
        <div>
          <Comment
            avatar={
              <Avatar src={url + info.imagepath} alt="alt" />
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
      </div>
    </div>
  );
};

export default PostDetail;
