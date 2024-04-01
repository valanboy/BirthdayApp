const express = require('express');
const mongoDbConnection = require('./config');
const errorhandler = require('./controller/errorController');
const ApiRouter = require('./routes/api.route');
const viewRouter = require('./routes/view');
const { SendCronJob } = require('./controller/birthday-cron-job');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

mongoDbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', ApiRouter);
app.use('/', viewRouter);

SendCronJob();
app.all('*', (req, res, next) => {
  res.status(404).render('404');
});
app.use(errorhandler);
app.listen(PORT, () => {
  console.log('Server is up and paying attention');
});
