Продукт компании «SSMR Group»

Описание проекта: 
Веб-приложение «Cookie Jar»
(Трекер личных достижений)
Идея: Веб-приложение, где пользователи отмечают маленькие ежедневные победы (например: «Прочитал 10 страниц», «Пробежал 1 км»), а система «награждает» их виртуальным «печеньем» — внутренней валютой, которую можно будет конвертировать во что-то крутое.

Состав команды:
1. Ростислав Шведов
2. Михаил Сидорченко
3. Ростислав Макайда
4. Денис Рыпунов


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
