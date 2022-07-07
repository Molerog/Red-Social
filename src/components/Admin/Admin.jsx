import { useDispatch, useSelector } from "react-redux";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { getAll, reset } from "../../features/posts/postsSlice";
import { useEffect } from "react";
import PostAdmin from "./PostAdmin/PostAdmin";
import UserAdmin from "./UserAdmin/UserAdmin";

const { TabPane } = Tabs;

const Admin = () => {
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const getPostsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getPostsAndReset();
  }, []);
  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }

  return (
    <>
      <h1>Admin</h1>
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              <span>Posts</span>
            </span>
            
          }
          key="1"
        >
          <PostAdmin />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              <span>Usuarios</span>
            </span>
          }
          key="2"
        >
          <UserAdmin />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Admin;
