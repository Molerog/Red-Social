import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onSearch = (e) => {
    navigate("/search/" + e);
  };
  if (pathname === "/login" || pathname === "/register") return null;
  return (
    <>
      <div>Header</div>
      <Search
        placeholder="Título del Post"
        enterButton="Buscar"
        size="large"
        onSearch={onSearch}
        style={{
          width: 304,
        }}
      />
    </>
  );
};

export default Header;
