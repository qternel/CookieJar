import styles from "./AuthForm.module.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import cookieLogo from "/src/assets/cookie-jar-logo.png";

export default function AuthForm({ type, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.username.trim().length >= 3 &&
    formData.password.trim().length >= 6;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <img src={cookieLogo} alt="Cookie Jar Logo" className={styles.logo} />
        <h2 className={styles.title}>
          {type === "login" ? "Вход" : "Регистрация"}
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); if (isFormValid) onSubmit(formData); }}>
          <div className={styles.inputGroup}>
            <input
              name="username"
              type="text"
              placeholder="Логин (мин. 3 символа)"
              required
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль (мин. 6 символов)"
                required
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={styles.eyeButton}
                aria-label="Показать или скрыть пароль"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.button}
              disabled={!isFormValid}
            >
              {type === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}