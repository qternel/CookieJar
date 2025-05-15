export default function AuthForm({ type = "login", onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h1>{type === "login" ? "Вход" : "Регистрация"}</h1>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Пароль" required />
      {type === "signup" && <input type="text" placeholder="Имя" required />}
      <button type="submit">{type === "login" ? "Войти" : "Зарегистрироваться"}</button>
    </form>
  );
}