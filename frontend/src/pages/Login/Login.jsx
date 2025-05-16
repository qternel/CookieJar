import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async ({ username, password }) => {
    try {
      await axios.post("http://localhost:3000/signin", {
        login: username,
        password,
      }, {
        withCredentials: true
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return <AuthForm type="login" onSubmit={handleSubmit} />;
}
