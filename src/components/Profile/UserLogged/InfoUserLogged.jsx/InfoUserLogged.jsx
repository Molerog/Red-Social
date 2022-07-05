import {useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { destroy } from "../../../../features/posts/postsSlice";


const InfoUserLogged = () => {
    const dispatch = useDispatch()
    const onFinish = (value) => {
       dispatch(destroy(value))
  };
  const { info } = useSelector((state) => state.auth);
  const userInfo = info.postIds?.map((e) => {
    return (
      <>
        <div>{e.title}</div>       
        <Button type="primary" onClick={() =>{onFinish(e._id)}}>Borrar Post</Button>
        <Button type="primary" onClick={() =>{onFinish(e._id)}}>Editar Post</Button>
      </>
    );
  });
  return <div>{userInfo}</div>;
};

export default InfoUserLogged;
