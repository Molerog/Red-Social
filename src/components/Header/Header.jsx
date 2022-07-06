import { useNavigate } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;

const Header = () => {
    const navigate = useNavigate();
    const onSearch = (e) => {
        navigate("/search/" + e);
      };
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
  )
}

export default Header