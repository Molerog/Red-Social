import { Form, Input, Button } from "antd";


const Register = () => {
       
    const onFinish = (values)=>{
        console.log(values)        
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