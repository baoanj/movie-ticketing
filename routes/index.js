var express = require('express');
var router = express.Router();
var debug = require('debug')('movie-ticketing:routes:index');

module.exports = function(db) {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
};
