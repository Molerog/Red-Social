import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "antd";
import "./Header.scss";
import { useSelector } from "react-redux";

const url = "http://localhost:8080/users/";

const { Search } = Input;
const Header = () => {
  const { info } = useSelector((state) => state.auth);
  console.log(info);
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
          <div>
            <div className="TopBarIconItem">
              <span>Algo</span>
              <span className="TopBarIconBadge">2</span>
            </div>
          </div>
          <div>
            <div className="TopBarIconItem">
              <span>Algo</span>
              <span className="TopBarIconBadge">3</span>
            </div>
          </div>
          <div className="TopBarIcons">
            <div className="TopBarIconItem">
              <img className="TopBarImg" src={url + info?.imagepath}></img>
              <span className="TopBarIconBadge"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
