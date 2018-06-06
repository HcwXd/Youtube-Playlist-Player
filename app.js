var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const request = require('request');
const cheerio = require('cheerio');
//https://www.youtube.com/playlist?list=PLCd1VmF_W0mzDbbIpJh7pBm26H663Yn37
const url = 'https://www.youtube.com/playlist?list=PLCd1VmF_W0mzDbbIpJh7pBm26H663Yn37';
// const url = 'https://www.youtube.com/playlist?list=PLu-X8ZEXML8p2trBAf08UYkabKt-82te2&disable_polymer=true';
request(url, (err, res, body) => {

  const $ = cheerio.load(body);
  let songs_titles = [];
  let title_odd_counter = 0;
  $('#pl-load-more-destination tr .pl-video-title a').each(function (i, elem) {
    if (title_odd_counter % 2 === 0) {
      const title = $(this).text().split('\n');
      songs_titles.push(title[1].trim());
    }
    title_odd_counter++;
  })
  console.log(songs_titles);
})


io.on('connection', async (socket) => {
  console.log("+1");

  socket.on("getPlaylistUrl", (url) => {
    socket.emit("generatePlayer", url);
  });
})
server.listen(3001);


































// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;