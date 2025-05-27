import styles from "./AuthForm.module.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import cookieLogo from "/src/assets/cookie-jar-logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api/client';

export default function AuthForm({ type }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.username.trim().length >= 3 &&
    formData.password.trim().length >= 6 &&
    (type === "login" || formData.password === formData.passwordConfirmation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = type === 'login' ? '/auth/signin' : '/auth/signup';
      const payload = {
        login: formData.username,
        password: formData.password
      };
      
      if (type === 'signup') {
        payload.password_confirmation = formData.passwordConfirmation;
      }

      const response = await api.post(endpoint, payload);
      
      localStorage.setItem('token', response.data.token);
      if (response.data.user_id) {
        localStorage.setItem('userId', response.data.user_id);
      }
      
      navigate('/profile'); // Перенаправляем на страницу профиля
      
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setErrorMessage(
        error.response?.data?.error || 
        error.response?.data?.errors?.join(', ') || 
        'Произошла ошибка'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.container}>
        <img src={cookieLogo} alt="Cookie Jar Logo" className={styles.logo} />
        <h2 className={styles.title}>
          {type === "login" ? "Вход" : "Регистрация"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              name="username"
              type="text"
              placeholder="Логин (мин. 3 символа)"
              required
              minLength={3}
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль (мин. 6 символов)"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={styles.eyeButton}
                aria-label="Показать или скрыть пароль"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {type === "signup" && (
            <div className={styles.inputGroup}>
              <input
                name="passwordConfirmation"
                type={showPassword ? "text" : "password"}
                placeholder="Подтвердите пароль"
                required
                value={formData.passwordConfirmation}
                onChange={handleChange}
                className={styles.input}
                disabled={isLoading}
              />
            </div>
          )}

          {errorMessage && (
            <div className={styles.error}>{errorMessage}</div>
          )}

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.button}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                type === "login" ? "Войти" : "Зарегистрироваться"
              )}
            </button>
          </div>
        </form>

        <div className={styles.switchLink}>
          {type === "login" ? (
            <p>
              Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
            </p>
          ) : (
            <p>
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}