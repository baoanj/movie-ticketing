var express = require('express');
var router = express.Router();
var debug = require('debug')('movie-ticketing:routes:index');

module.exports = function(db) {
  var getMovies = require('./getMovies');

  /* GET home page. */
  router.get('/', function(req, res, next) {
    let username = '登录/注册';
    if (req.session.user) {
      username = req.session.user.username;
    }
    let obj = {
      title: '12345电影',
      username: username
    };
    res.render('index', obj);
  });

  router.get('/getMovies', function(req, res, next) {
    if (req.query.type === '1') {
      getMovies.getCarouImgs(res);
    } else if (req.query.type === '2') {
      getMovies.getAllMovies(res);
    } else if (req.query.type === '3') {
      getMovies.getBoxOffice(res);
    } else {
      res.redirect('/');
    }
  });

  return router;
};
