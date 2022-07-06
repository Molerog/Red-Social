import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Input } from "antd";
const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onSearch = (e) => {
    navigate("/search/" + e);
  };
  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav>
      <span>header</span>
      <div>
        {user ? (
          <>
            <span>
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
            </span>
            <span>
              <Link to="/profile">{user.user.name} </Link>
            </span>
            <span>
              <Link to="/home">Home</Link>
            </span>
            <Search
              placeholder="Título del Post"
              // allowClear
              enterButton="Buscar"
              size="large"
              onSearch={onSearch}
              style={{
                width: 304,
              }}
            />
            <span>
              {user.user.role === "admin" ? (
                <span>
                  <Link to="/admin">Admin</Link>
                </span>
              ) : (
                ""
              )}
            </span>
          </>
        ) : (
          <>
            <span>
              <Link to="/login">Login</Link>
            </span>
            <span>
              <Link to="/register">Register</Link>
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
