import { Link, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./Navbar.scss";
import CreatePost from "../CreatePost/CreatePost";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="NavBar">
      <div className="NavBarWrapper">
        <div className="SideBarList">
          <div className="sideBarListItem">
            <Link to="/" onClick={onLogout}>
            <div className='Icon'>
              <LogoutOutlined />
              </div>
              <div className='Word'>
                <span >Logout</span>
              </div>
            </Link>
          </div>
          <div className="sideBarListItem">
            <Link to="/profile">
              {" "}
              <div className='Icon'>
              <UserOutlined />
              </div>
              <div className='Word'>
                <span className='Word'>Perfil</span>
              </div>
            </Link>
          </div>
          <div className="sideBarListItem">
            <Link to="/home">
            <div className='Icon'>
              <HomeOutlined />
              </div>
              <div>
                <span className='Word'>Feed</span>
              </div>
            </Link>
          </div>
          <div className="sideBarListItem">
            <Link to="/users">
            <div className='Icon'>
              <TeamOutlined />
              </div>
              <div>
                <span className='Word'>Usuarios</span>
              </div>
            </Link>
          </div>
          {user.user?.role === "admin" ? (
            <div className="sideBarListItem">
              <Link to="/admin">
              <div className='Icon'>
                <RocketOutlined />
                </div>
                <div>
                  <span className='Word'>Admin</span>
                </div>
              </Link>
            </div>
          ) : (
            ""
          )}
          <div>
            <CreatePost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
