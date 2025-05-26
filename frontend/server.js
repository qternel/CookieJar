import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
  console.log("Получен запрос на регистрацию:", req.body);
  res.json({ message: "Регистрация прошла успешно (заглушка)" });
});

app.listen(3000, () => console.log('Заглушка сервер запущена на порту 3000'));