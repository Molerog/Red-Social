import { useNavigate, useLocation, Link } from "react-router-dom";
import { Input } from "antd";
import "./Header.scss";
import { useSelector } from "react-redux";

const url = "http://localhost:8080/users/";

const { Search } = Input;
const Header = () => {
  const { info } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onSearch = (e) => {
    navigate("/search/" + e);
  };
  if (pathname === "/" || pathname === "/register") return null;
  return (
    <>
      <div className="TopBarContainer">
        <div className="TopBarLeft">
          <span className="Logo">LOGO</span>
        </div>
        <div className="TopBarCenter">
          <Search
            className="SearchInput"
            placeholder="Buscar publicación..."
            enterButton="Buscar"
            size="large"
            onSearch={onSearch}
            style={{
              width: 600,
            }}
          />
        </div>
        <div className="TopBarRight">
          <div className="TopBarLink">Homepage</div>
          <div className="TopBarLink">Timeline</div>
          <div></div>
          <div className="TopBarIcons">
            <div className="TopBarIconItem">
              <Link to="/profile">
                <img
                  className="TopBarImg"
                  src={url + info?.imagepath}
                  alt=""
                ></img>
              </Link>
              <span className="TopBarIconBadge"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
