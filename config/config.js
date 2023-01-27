module.exports ={
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI, /*mongodb connection url*/
    mailer: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        type: 'OAuth2',
        user: process.env.EMAIL_USER, /*User for email services*/
        pass: process.env.EMAIL_PASS, /*Password for email services*/
        secureConnection: true,
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS: true
    },
    security: {
        secretKey: process.env.SECRET_KEY,
        expTime: process.env.EXP_TIME
    }
}