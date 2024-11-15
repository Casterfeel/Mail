const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer'); 

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'mrcrimson123@gmail.com', 
        pass: 'ezai nojj bwwy gxxh',     
    },
});


app.post('/send-email', (req, res) => {
    const { question1, question2, question3, question4, phone, email } = req.body;

    if (!email) {
        return res.status(400).send('Email не был предоставлен');
    }

    console.log('Полученные данные:', req.body);

    
    const message = `
        1. ${question1}
        2. ${question2}
        3. ${question3}
        4. ${question4}

        Контактные данные:
        Телефон: ${phone}
        E-mail: ${email}
    `;

    
    const mailOptions = {
        from: email, 
        to: 'rom1@fedresurs.online',  
        subject: 'Ответы на квиз и контактные данные',
        text: message,
        replyTo: email,  
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке email:', error);
            return res.status(500).json({ message: 'Ошибка при отправке email', error: error.message });
        }
        console.log('Письмо отправлено:', info.response);
        return res.status(200).json({ message: 'Email отправлен успешно' });
    });
});


app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
