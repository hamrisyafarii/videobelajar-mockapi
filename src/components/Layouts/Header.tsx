import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";

interface HeaderProps {
  type: string;
}

const Header = (props: HeaderProps) => {
  const { users, logout } = useAuth();
  return (
    <div className="bg-white flex justify-between items-center py-2 px-2 md:px-16 sticky z-50 top-0 shadow">
      <img src={Logo} alt="" width="170px" />

      <div className="flex gap-2">
        {props.type === "dashboard" && (
          <Link to="/dashboard">
            <div className="border bg-gray-800 rounded-md px-2 py-1 text-white text-sm">
              Admin Dashboard
            </div>
          </Link>
        )}
        {props.type === "admin" && (
          <Link to="/products">
            <div className="border bg-blue-700 hover:bg-blue-500 rounded-md px-2 py-1 text-white text-sm">
              Products
            </div>
          </Link>
        )}

        {users && (
          <button onClick={logout} title="Logout">
            <LogOutIcon size={16} className="text-red-600 hover:text-red-800" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
