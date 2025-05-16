import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post("http://localhost:3000/signup", data, {
        withCredentials: true
      });
      console.log("Успешная регистрация!", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
}