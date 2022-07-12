import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, FolderOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { getAll, reset } from "../../features/posts/postsSlice";
import { useEffect } from "react";
import PostAdmin from "./PostAdmin/PostAdmin";
import UserAdmin from "./UserAdmin/UserAdmin";
import Navbar from "../Navbar/Navbar";
import "./Admin.scss";
import { getUserInfo } from "../../features/auth/authSlice";

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
    dispatch(getUserInfo())
  }, []);
  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }

  return (
    <div className="MainContainer">
      <Navbar />
      <div className="TabContainer">
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <span>
                <FolderOutlined />
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
                <UserOutlined />
                <span>Usuarios</span>
              </span>
            }
            key="2"
          >
            <UserAdmin />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
