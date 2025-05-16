import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    try {
      await axios.post("http://localhost:3000/signup", {
        login: username,
        password,
        password_confirmation: password
      }, {
        withCredentials: true
      });

      navigate("/login");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
}
