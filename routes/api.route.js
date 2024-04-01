const cronController = require('../controller/birthday-cron-job');
const express = require('express');
const ApiRouter = express.Router();

ApiRouter.post('/collectBirthDate', cronController.CollectInfo);
ApiRouter.get('/RetrieveBirthDateInfo', cronController.findAllBirthDate);

module.exports = ApiRouter;
