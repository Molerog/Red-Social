import "./Sidebar.scss";
import UserRegistered from "./UserRegistered/UserRegistered";

const Sidebar = () => {
  return (
    <div className="RightBar">
      <h4 className="RightBarTitle">Usuarios Online</h4>
      <UserRegistered />
    </div>
  );
};

export default Sidebar;
