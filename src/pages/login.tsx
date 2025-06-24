import LoginForm from "../components/Fragments/LoginForm";
import AuthLayouts from "../components/Layouts/AuthLayouts";
import Header from "../components/Layouts/Header";

const LoginPage = () => {
  return (
    <>
      <Header type="login" />
      <AuthLayouts title="Masuk ke Akun">
        <LoginForm />
      </AuthLayouts>
    </>
  );
};
export default LoginPage;
