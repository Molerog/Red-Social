import { Form, Input, Button, notification, Space } from "antd";
import {useDispatch} from 'react-redux';
import {register} from '../../features/auth/authSlice';
import {useNavigate} from "react-router-dom";



const Register = () => {

    const openNotificationWithIcon = (type) => {
        notification[type]({
          message: 'Registro realizado con éxito!',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
      };
    const navigate = useNavigate();   
    const dispatch = useDispatch()
    const onFinish = (values)=>{
             dispatch(register(values))
             openNotificationWithIcon('success')
             setTimeout(() => {
                navigate('/login');
             }, 3000);
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input />
                </Form.Item>

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

                {/* <div className='textContainer'>
                    <span>¿Ya estás registrado?</span> <Link to='/login'>Inicia sesión</Link>
                </div>

                {message} */}

                <br/>

                <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
            </Form>
        </div>
  )
}

export default Register