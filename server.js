const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
    try {
        let { subject, to, alias, base64String } = req.body;

        if (!subject || !to || !alias || !base64String) {
            throw new Error('Datos incompletos');
        }

        const buffer = Buffer.from(base64String, 'base64');
        const text = buffer.toString('utf8');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: `${alias}`,
            to,
            subject,
            html: text // Envía el texto como HTML
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${to} con éxito`);  // Log para cuando el correo se envía exitosamente

        res.status(200).json({ status: 'ok' }); // Solo retorna el estado 200 y un ok

    } catch (error) {
        console.error(`Error: ${error.message}`); // Log en caso de error
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`);
});