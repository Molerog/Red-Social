import "./Sidebar.scss";
import UserRegistered from "./UserRegistered/UserRegistered";

const Sidebar = () => {
  return (
    <div className="RightBar">
      <h4 className="RightBarTitle">Usuarios Registrados</h4>
      <div className='Scroll'>
      <UserRegistered />
      </div>
    </div>
  );
};

export default Sidebar;
