import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { AlignJustify, LogOutIcon, X } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { useEffect, useRef, useState } from "react";
import Avatar from "../../assets/images/Avatar.png";

interface HeaderProps {
  type: string;
}

const Header = (props: HeaderProps) => {
  const { users, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white flex justify-between items-center py-2 px-2 md:px-16 sticky z-50 top-0 shadow">
      <img src={Logo} alt="" width="170px" />

      <div className="flex gap-2">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex gap-2 "
        >
          <p className="items-center gap-2 mt-1 text-sm text-[#333333AD] hidden md:flex cursor-pointer">
            Kategori
          </p>
          <img src={Avatar} alt="User" className="w-6 h-6 rounded-md" />
        </div>
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <AlignJustify className="w-6 h-6" />
          )}
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 text-sm text-[#333] z-50"
          >
            {props.type === "dashboard" && (
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Admin Dashboard
              </Link>
            )}

            {props.type === "admin" && (
              <Link
                to="/products"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Products
              </Link>
            )}

            <div className="border-t my-1" />
            {users ? (
              <button
                onClick={logout}
                title="Logout"
                className="flex space-x-1 items-center px-4 py-2 w-full text-red-500 hover:bg-gray-100 transition"
              >
                <h1>Keluar</h1>
                <LogOutIcon
                  size={14}
                  className="text-red-600 hover:text-red-800"
                />
              </button>
            ) : null}
          </div>
        )}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="flex flex-col bg-white shadow-md border-t text-[#333] text-sm animate-slide-down"
          >
            {props.type === "dashboard" && (
              <Link
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Admin Dashboard
              </Link>
            )}

            {props.type === "admin" && (
              <Link
                to="/products"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Products
              </Link>
            )}
            <div className="border-t my-1" />
            {users ? (
              <button
                onClick={logout}
                title="Logout"
                className="flex space-x-1 items-center px-4 py-2 w-full text-red-500 hover:bg-gray-100 transition"
              >
                <h1>Keluar</h1>
                <LogOutIcon
                  size={14}
                  className="text-red-600 hover:text-red-800"
                />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
