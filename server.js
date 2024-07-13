const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()
const port = process.env.PORT || 3001

app.use(cors());
app.use(bodyParser.json())

app.post('/submit', (req, res) => {
    const {name, mobileNumber, formType, link} = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'joseph.ecktech@gmail.com',
            pass: 'Joseph66715'
        }
    })

    const mailOptions = {
        from: 'joseph.ecktech@gmail.com',
        to: 'acheampongjoseph470@gmail.com',
        subject: 'New Form Submission',
        text: `User ${name} with mobile number ${mobileNumber} has filled the form or followed the link: ${formType} - ${link}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.status(500).send('Error sending email')
        }
        else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully')
        }
    })
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})