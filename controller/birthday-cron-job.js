const userModel = require('../model/user');
const AppError = require('../utils/appError');
const cron = require('node-cron');
const EmailSender = require('../utils/email');
const CollectInfo = async (req, res, next) => {
  try {
    const details = req.body;
    if (!details || details === null) {
      next(new AppError('Kindly fill all field', 400));
      return;
    } else {
      if (details.otherPerson && details.otherPerson !== '')
        details.isOther = true;
      const saveDetails = await userModel.create(details);
      res.status(201).json({
        status: 'success',
        message: 'Birthday reminder is set. Keep an eye for a message',
        saveDetails,
      });
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

const findAllBirthDate = async (req, res) => {
  try {
    const currentTime = new Date();
    currentTime.setMilliseconds(0);
    const currentDate = currentTime.toISOString();
    const birthdateStr = currentDate.split('T')[0] + 'T00:00:00.000Z';
    const birthdate = new Date(birthdateStr);
    const findAll = await userModel.find({ birthDay: birthdate });
    if (!findAll || findAll.length === 0 || findAll === null)
      return new AppError('No Birthday to send Today', 400);
    const Email = new EmailSender();
    await Email.sendGeneralEmail(findAll);
    res.status(200).json({
      status: 'success',
      message: `Sending Birthday Message to ${findAll.length} ${
        findAll.length > 1 ? 'people' : 'person'
      } Today`,
      data: findAll,
    });
  } catch (error) {
    new AppError(error, 500);
  }
};

const SendBirthDayMessage = () => {
  console.log('sending message..');
};

const SendCronJob = () => {
  const birthdayTask = cron.schedule('0 7 * * *', () => {
    const birthdays = findAllBirthDate();
    birthdayTask.destroy();
    return birthdays;
  });
};

module.exports = { CollectInfo, findAllBirthDate, SendCronJob };
