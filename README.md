# CookieJar
Перед запуском:
1) bundle install
2) rails db:migrate
   
Запуск: rails server

регистрация на бэкенде(возвращает jwt токен)

post http://localhost:3000/auth/signup 
{
    "login": "example_user",
    "password": "securepassword",
    "password_confirmation": "securepassword"
}

авторизация на бэкенде(возвращает jwt токен)

post http://localhost:3000/auth/signin
{
    "login": "example_user",
    "password": "securepassword"
}

получить информацию о пользователе и его достижениях

get http://localhost:3000/user/me
(Требуется токен авторизации в заголовке Authorization)

добавить достижение(при успешном добавлении возвращает информацию о достижении)

post http://localhost:3000/achievements
{
    "description": "cool achievement"
}
