import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import React, { useState } from "react";

interface RegisterSchema {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterSchema>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await register(
      formData.username,
      formData.email,
      formData.password
    );

    if (res.success) {
      alert("Register success");
      navigate("/");
    } else {
      alert(res.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="flex-flex-col mb-4">
        <label htmlFor="" className="text-gray-500">
          Username
        </label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
          className="border border-gray-200 px-2 py-1 rounded-md w-full"
        />
      </div>

      <div className="flex-flex-col mb-4">
        <label htmlFor="" className="text-gray-500">
          E-mail
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          className="border border-gray-200 px-2 py-1 rounded-md w-full"
        />
      </div>

      <div className="flex-flex-col mb-4">
        <label htmlFor="" className="text-gray-500">
          Password
        </label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          className="border border-gray-200 px-2 py-1 rounded-md w-full"
        />
      </div>

      <div className="space-y-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full px-2 py-1 rounded-md bg-[#3ECF4C] hover:bg-[#E2FCD9CC] hover:text-[#3ECF4C] text-white font-medium cursor-pointer"
        >
          {loading ? "mendaftar..." : "Daftar"}
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full px-2 py-1 rounded-md bg-[#E2FCD9CC] text-[#3ECF4C] hover:bg-[#3ECF4C] hover:text-white  font-medium cursor-pointer"
        >
          Masuk
        </button>
      </div>
      <span className="flex items-center my-4">
        <span className="h-px flex-1  bg-gray-300"></span>

        <span className="shrink-0 px-4 text-md text-gray-500">atau</span>

        <span className="h-px flex-1 bg-gray-300"></span>
      </span>

      <button
        disabled
        type="button"
        className="w-full flex items-center justify-center font-semibold border hover:bg-gray-100 cursor-pointer border-gray-300 text-[#4A505C] px-2 py-1 rounded-md"
      >
        <FcGoogle size="20px" />
        Masuk dengan google
      </button>
    </form>
  );
};
export default RegisterForm;
