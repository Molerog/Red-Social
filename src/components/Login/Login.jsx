import React, { useEffect } from 'react'
import { Form, Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const {isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isError){
            notification.error({message: 'Error', description:message})
        }
        if (isSuccess){
            notification.success({message:'Success', description:message})          
                navigate('/profile')
        }
        dispatch(reset())
    }, [isError, isSuccess, message])
    const onFinish = (values)=>{
        console.log(values)
               dispatch(login(values)) 
    } 
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    }
  return (
    <div className="container">
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
            </Form>
        </div>
  )
}

export default Login