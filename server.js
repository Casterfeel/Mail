const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Импортируем nodemailer для работы с SMTP

const app = express();

// Используем middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка Gmail SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail', // Используем Gmail для отправки
    auth: {
        user: 'mrcrimson123@gmail.com', // Ваш email в Gmail
        pass: 'ezai nojj bwwy gxxh',     // Пароль приложения, если включена двухфакторная аутентификация
    },
});

// Маршрут для отправки email
app.post('/send-email', (req, res) => {
    const { question1, question2, question3, question4, phone, email } = req.body;

    if (!email) {
        return res.status(400).send('Email не был предоставлен');
    }

    console.log('Полученные данные:', req.body);

    // Формируем текст сообщения
    const message = `
        1. ${question1}
        2. ${question2}
        3. ${question3}
        4. ${question4}

        Контактные данные:
        Телефон: ${phone}
        E-mail: ${email}
    `;

    // Настроим параметры письма
    const mailOptions = {
        from: email, // Ваш email
        to: 'sanikovmaxim@mail.ru',  // Почта, на которую будут отправляться данные
        subject: 'Ответы на квиз и контактные данные',
        text: message,
        replyTo: email,  // Используем email, введенный пользователем
    };

    // Отправляем письмо
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке email:', error);
            return res.status(500).json({ message: 'Ошибка при отправке email', error: error.message });
        }
        console.log('Письмо отправлено:', info.response);
        return res.status(200).json({ message: 'Email отправлен успешно' });
    });
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
