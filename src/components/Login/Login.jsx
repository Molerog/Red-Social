import React, { useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import './Login.scss'

const Login = () => {
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      notification.error({ message: "Error", description: message });
    }
    if (isSuccess) {
      notification.success({ message: "Success", description: message });
      navigate("/home");
    }
    dispatch(reset());
  }, [isError, isSuccess, message]);

  const onFinish = (values) => {
    dispatch(login(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="GlobalContainer">
      <div className='Image'>Image</div>
      <div className="ModalLogin">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>

          <div className="textContainer">
            <span>¿No tienes cuenta?</span>{" "}
            <Link to="/register">Regístrate</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
