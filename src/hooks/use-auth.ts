import { useState } from "react";
import axiosInstance from "../libs/axios";
import { useNavigate } from "react-router-dom";

interface UserSchema {
  email: string;
  password: string;
  username: string;
}

export const useAuth = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.get("/users");
      const users = res.data;

      const foundUser = users.find(
        (u: UserSchema) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("users", JSON.stringify(foundUser));
        setUsers(foundUser);
        return { success: true, message: "Login berhasil" };
      } else {
        return { success: false, message: "Email atau password salah" };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "Login Gagal" };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await axiosInstance.get("/users");
      const user = res.data;

      const exists = user.find((u: UserSchema) => u.email === email);
      if (exists) {
        return { success: false, message: "Email sudah digunakan" };
      }

      const newUser = { email, username, password };
      const createRes = await axiosInstance.post("/users", newUser);
      const createdUser = createRes.data;

      localStorage.setItem("users", JSON.stringify(createdUser));
      setUsers(createdUser);
      return { success: true, message: "Berhasil registrasi" };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Gagal register" };
    }
  };

  const logout = () => {
    const confirmed = window.confirm("Apakah kamu yakin ingin logout?");
    if (!confirmed) return;

    localStorage.removeItem("user");
    setUsers(null);
    navigate("/");
  };

  return { users, login, register, logout };
};
