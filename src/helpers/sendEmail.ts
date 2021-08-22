import * as nodemailer from 'nodemailer'

export const sendEmail = async () => {
  
  const smtpConfig =  nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    // secure: true,
    auth: {
        user: 'c0d1cc59b906c647d2555f44f00fba47',
        pass: '2e87d7f1315807fa2296040f84a824cf'
    }
  })

  
  
  await smtpConfig.sendMail({
    from: '"Jim Ntare" <jim.ntare@gmail.com>', // sender address
    to: "jim@ntare.xyz", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}


 