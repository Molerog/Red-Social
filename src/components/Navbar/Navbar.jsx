import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined, HomeOutlined, TeamOutlined, RocketOutlined  } from '@ant-design/icons';
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
        <div className= 'SideBarList'>
          <div className= 'sideBarListItem'>
          
            <Link to="/" onClick={onLogout}>
            <LogoutOutlined /> Logout
            </Link>
          </div>
          <div className= 'sideBarListItem'>
         
            <Link to="/profile"> <UserOutlined />Perfil</Link>
          </div>
          <div className= 'sideBarListItem'>
          
            <Link to="/home"><HomeOutlined />Feed</Link>
          </div>
          <div className= 'sideBarListItem'>
         
            <Link to="/users"><TeamOutlined />Usuarios</Link>
          </div>
            {user.user?.role === "admin" ? (
              <div className= 'sideBarListItem'>
               
                <Link to="/admin"> <RocketOutlined />Admin</Link>
              </div>
            ) : (
              ""
            )}
          <div>
            <CreatePost/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
