import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav>
      <h2>Navbar</h2>
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
              <Link to="/home">Feed</Link>
            </span>
            <span>
              <Link to="/users">Usuarios</Link>
            </span>
            <div>
              {user.user.role === "admin" ? (
                <span>
                  <Link to="/admin">Admin</Link>
                </span>
              ) : (
                ""
              )}
            </div>
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
