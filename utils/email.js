const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const AppError = require('./../utils/appError');

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(toAddress, subject, text, html) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: toAddress,
        subject: subject,
        text: text,
        html: html,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email sent to:', toAddress);
    } catch (error) {
      throw new AppError(error, 500);
    }
  }

  async sendGeneralEmail(users) {
    try {
      for (const user of users) {
        try {
          const toAddress = user.email;
          const username = user.username;

          if (!toAddress) {
            console.error('Invalid user email:', user);
            continue;
          }
          const messagePersonal = `Hi ${username},from the utmost part of our heart we want wish you an amazing brithday filled with awesomeness 🎉🎉. We hold you dear to our heart, keep soaring high.`;
          const messageOther = `Hi  ${username}, Today is ${
            user.otherPerson
          }'s birthday🎉. Do not forget to let ${
            user.gender === 'male' ? 'him' : 'her'
          } know you care and adore ${
            user.gender === 'male' ? 'him' : 'her'
          }. Make ${user.gender === 'male' ? 'him' : 'her'} feel Special`;
          const heading = 'Happy Birthday 🙂🎉';
          const footerPersonal = `Happy Birthday ${username} 🎉🎉`;
          const footerOther = `Happy Birthday to ${user.otherPerson} 🎉🎉`;
          const message = user.isOther ? messageOther : messagePersonal;
          const footer = user.isOther ? footerOther : footerPersonal;
          const templatePath = path.join(__dirname, '../views/email.ejs');
          const template = await ejs.renderFile(templatePath, {
            message,
            footer,
            heading,
          });

          await this.sendEmail(toAddress, heading, message, template);
        } catch (error) {
          throw new AppError(error, 500);
        }
      }

      return 'All emails sent successfully';
    } catch (error) {
      throw new AppError(error, 500);
    }
  }
}

module.exports = EmailSender;
