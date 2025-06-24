import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface UserSchema {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<UserSchema>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await login(formData.email, formData.password);

    if (res.success) {
      navigate("/products");
    } else {
      alert(res.message);
      setMessage(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className="text-center font-semibold border w-full rounded-md bg-red-500 text-white py-1 my-1">
          {message}
        </div>
      )}
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
      <p className="text-sm text-end text-gray-500 hover:underline cursor-pointer my-4 font-medium">
        Lupa Password?
      </p>
      <div className="space-y-2">
        <button
          type="submit"
          className="w-full px-2 py-1 rounded-md bg-[#3ECF4C] hover:bg-[#E2FCD9CC] hover:text-[#3ECF4C] text-white font-medium cursor-pointer"
        >
          Masuk
        </button>
        <button
          onClick={() => navigate("/register")}
          type="button"
          className="w-full px-2 py-1 rounded-md bg-[#E2FCD9CC] text-[#3ECF4C] hover:bg-[#3ECF4C] hover:text-white font-medium cursor-pointer"
        >
          Daftar
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
export default LoginForm;
