import AuthForm from "../components/AuthForm";
import axios from "axios";

export default function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post("http://localhost:3000/signup", data); // мокаем запрос
      console.log("Успешная регистрация!", response.data);
      // редирект на логин
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSubmit} />;
}