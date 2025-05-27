import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async ({ username, password }) => {
    try {
      const response = await api.post("/auth/signin", {
        login: username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.error || "Неверные учетные данные");
      console.error("Ошибка входа:", error);
    }
  };

  return <AuthForm type="login" onSubmit={handleSubmit} errorMessage={error} />;
}