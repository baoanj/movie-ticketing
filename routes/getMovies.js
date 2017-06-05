var request = require('request');
var cheerio = require('cheerio');

function getAllMovies(res) {
  request('http://maoyan.com/films?showType=1', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      try {
        var $ = cheerio.load(body);
        let moviePosters = $('div.movie-poster img:nth-child(2)');
        let movieNames = $('div.movie-item-title a');
        let moviePostersArr = [];
        let movieNamesArr = [];
        let movieHref = [];
        for (let i in movieNames) {
          if (movieNames.hasOwnProperty(i) && !isNaN(parseInt(i))) {
            movieNamesArr.push(movieNames[i]['children'][0]['data']);
            movieHref.push('http://maoyan.com' + movieNames[i]['attribs']['href']);
          }
        }
        for (let i in moviePosters) {
          if (moviePosters.hasOwnProperty(i) && !isNaN(parseInt(i))) {
            moviePostersArr.push(moviePosters[i]['attribs']['data-src']);
          }
        }
        res.json({ movieNames: movieNamesArr, moviePosters: moviePostersArr, movieHref: movieHref });
      } catch (err) {
        res.json({ movieNames: [], moviePosters: [], movieHref: [] });
      }
    } else {
      res.json({ movieNames: [], moviePosters: [], movieHref: [] });
    }
  });
};

function getCarouImgs(res) {
  request('http://maoyan.com/', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      try {
        var $ = cheerio.load(body);
        let movieCarous = $('div.banner a');
        let movieCarousArr = [];
        let movieCarousHref = [];
        for (let i in movieCarous) {
          if (movieCarous.hasOwnProperty(i) && !isNaN(parseInt(i))) {
            movieCarousArr.push(movieCarous[i]['attribs']['data-bgurl']);
            movieCarousHref.push('http://maoyan.com' + movieCarous[i]['attribs']['href']);
          }
        }
        res.json({ movieCarous: movieCarousArr, movieCarousHref: movieCarousHref });
      } catch (err) {
        res.json({ movieCarous: [], movieCarousHref: [] });
      }
    } else {
      res.json({ movieCarous: [], movieCarousHref: [] });
    }
  });
};

function getBoxOffice(res) {
  request('http://www.cbooo.cn/', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      try {
        var $ = cheerio.load(body);
        let boxOfficeName = $('tbody#topdatatr tr td:nth-child(2)');
        let boxOfficeRealtime = $('tbody#topdatatr tr td:nth-child(3)');
        let boxOfficeCumulate = $('tbody#topdatatr tr td:nth-child(5)');
        
        let boxOfficeNameArr = [];
        let boxOfficeRealtimeArr = [];
        let boxOfficeCumulateArr = [];
        for (let i in boxOfficeName) {
          if (boxOfficeName.hasOwnProperty(i) && !isNaN(parseInt(i))) {
            boxOfficeNameArr.push(boxOfficeName[i]['children'][0]['data']);
          }
        }
        for (let i in boxOfficeRealtime) {
          if (boxOfficeRealtime.hasOwnProperty(i) && !isNaN(parseInt(i))) {
            boxOfficeRealtimeArr.push(boxOfficeRealtime[i]['children'][0]['data']);
          }
        }
        for (let i in boxOfficeCumulate) {
          if (boxOfficeCumulate.hasOwnProperty(i) && !isNaN(parseInt(i))) {
            boxOfficeCumulateArr.push(boxOfficeCumulate[i]['children'][0]['data']);
          }
        }
        res.json({ boxOfficeName: boxOfficeNameArr, boxOfficeRealtime: boxOfficeRealtimeArr, boxOfficeCumulate: boxOfficeCumulateArr });
      } catch (err) {
        res.json({ boxOfficeName: [], boxOfficeRealtime: [], boxOfficeCumulate: [] });
      }
    } else {
      res.json({ boxOfficeName: [], boxOfficeRealtime: [], boxOfficeCumulate: [] });
    }
  });
};

exports.getAllMovies = getAllMovies;
exports.getCarouImgs = getCarouImgs;
exports.getBoxOffice = getBoxOffice;
