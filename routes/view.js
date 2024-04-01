const express = require('express');
const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
  res.status(200).render('indexView');
});
viewRouter.get('*', (req, res) => {
  res.status(404).render('404');
});
module.exports = viewRouter;
