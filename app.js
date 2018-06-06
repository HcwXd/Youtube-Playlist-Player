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
const axios = require('axios');

const url = 'https://www.youtube.com/playlist?list=PLCd1VmF_W0mzDbbIpJh7pBm26H663Yn37';

async function getPlayListInfo(url) {
  const body = await axios.get(url);
  const $ = cheerio.load(body.data)
  // console.log($);

  let songs_info = {
    titles: [],
  };
  let title_odd_counter = 0;
  $('#pl-load-more-destination tr .pl-video-title a').each(function (i, elem) {
    if (title_odd_counter % 2 === 0) {
      const title = $(this).text().split('\n');
      songs_info.titles.push(title[1].trim());
    }
    title_odd_counter++;
  });
  return songs_info;
}

io.on('connection', async (socket) => {
  console.log("+1");

  socket.on("getPlaylistUrl", async (url) => {
    socket.emit("generatePlayer", url);
    const songs_info = await getPlayListInfo(url);
    console.log(songs_info);
    socket.emit("generateSongsTitle", songs_info);
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