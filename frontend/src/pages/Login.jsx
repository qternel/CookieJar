import AuthForm from "../components/AuthForm";
import axios from "axios";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post("http://localhost:3000/login", data); // пока мок, потом реальный урл вставлю
      console.log("Успешный вход!", response.data);
      // тут будет редирект на главную
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  return <AuthForm type="login" onSubmit={handleSubmit} />;
}