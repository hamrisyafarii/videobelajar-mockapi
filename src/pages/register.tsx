import RegisterForm from "../components/Fragments/RegisterForm";
import AuthLayouts from "../components/Layouts/AuthLayouts";
import Header from "../components/Layouts/Header";

const RegisterPage = () => {
  return (
    <>
      <Header type="register" />
      <AuthLayouts title="Pendaftaran akun">
        <RegisterForm />
      </AuthLayouts>
    </>
  );
};
export default RegisterPage;
