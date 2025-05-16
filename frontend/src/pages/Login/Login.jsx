import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post("http://localhost:3000/login", data, {
        withCredentials: true
      }); // пока мок, потом реальный урл вставлю
      console.log("Успешный вход!", response.data);
      navigate("/dashboard"); // переход на главную
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return <AuthForm type="login" onSubmit={handleSubmit} />;
}