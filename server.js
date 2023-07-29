const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');
// app.use(express.static(__dirname + '/public'));

const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user:"abishanmugam2k6@gmail.com",
        pass:"rqxuxngmdkhdkclq"
    },
    secureConnection: false,
    tls: {
        ciphers:'SSLv3'
    }
});

app.get('/nodeapp', (req, res) => {
    res.send('Hello World!')
  })

app.post('/hel',(req,res)=>{
    const name= req.body.name
    res.send('hello '+ name+" hi")
})

app.post('/send-mail', (req, res) => {
    const to = req.body.to;
    const name = req.body.name;
    const amount = req.body.amount;
    const date = req.body.date;
    const mailData = {
        from: "abishanmugam2k6@gmail.com",
        to: to,
        subject: "Your payment is due!",
        html: ` <p>
                    Hello ${name},
                </p>
                <p>
                    This is a reminder email that your payment of amount - ${amount} is due on date - ${date}
                </p>
                <p>
                    Kindly make the payment before the due date to avoid any inconvenience.
                </p>
                <p>
                    Thanks and Regards,
                </p>`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Invitation sent!", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);