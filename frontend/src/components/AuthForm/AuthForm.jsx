import styles from "./AuthForm.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import cookieLogo from "/src/assets/cookie-jar-logo.png";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("signup");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    signIn,
    signUp,
    isLoadingSignIn,
    isLoadingSignUp,
    errorSignIn,
    errorSignUp,
  } = useAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const isFormValid = useMemo(() => {
    return (
      formData.username.trim().length >= 3 &&
      formData.password.trim().length >= 6 &&
      (type === "login" || formData.password === formData.passwordConfirmation)
    );
  }, [formData, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setErrorMessage("");
    if (type === "login") {
      signIn({ login: formData.username, password: formData.password });
    } else {
      signUp({
        login: formData.username,
        password: formData.password,
        secondPassword: formData.passwordConfirmation,
      });
    }
  };

  useEffect(() => {
    if (type === "login" && errorSignIn) setErrorMessage(errorSignIn);
    if (type === "signup" && errorSignUp) setErrorMessage(errorSignUp);
  }, [errorSignIn, errorSignUp, type]);

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

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.button}
              disabled={!isFormValid || isLoading}
            >
              {isLoadingSignIn || isLoadingSignUp ? (
                <span className={styles.spinner}></span>
              ) : type === "login" ? (
                "Войти"
              ) : (
                "Зарегистрироваться"
              )}
            </button>
          </div>
        </form>

        <div className={styles.switchLink}>
          {type === "login" ? (
            <p>
              Нет аккаунта?{" "}
              <button onClick={() => setType("signup")}>
                Зарегистрироваться
              </button>
            </p>
          ) : (
            <p>
              Уже есть аккаунт?{" "}
              <button onClick={() => setType("login")}>Войти</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
