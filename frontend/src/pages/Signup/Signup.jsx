import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import { useState } from 'react';

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async ({ username, password, passwordConfirmation }) => {
    try {
      const response = await api.post("/auth/signup", {
        login: username,
        password,
        password_confirmation: passwordConfirmation
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.errors || "Ошибка регистрации");
      console.error("Ошибка регистрации:", error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} errorMessage={error} />;
}