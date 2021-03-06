$(function() {
  $.get('/getMovies', { type: '1' }, (data) => {
    let movieCarous = data.movieCarous;
    let movieCarousHref = data.movieCarousHref;
    for (let i = 0; i < movieCarous.length; i++) {
      let div = $('<div></div>');
      if (i == 0) div.addClass('active');
      div.addClass('item');
      div.click(function() {
        window.open(movieCarousHref[i]);
      });
      let img = $('<img />');
      img.attr({ alt: '12345电影', src: movieCarous[i] });
      div.append(img);
      $('.carousel-inner').append(div);
    }
  });

  $.get('/getMovies', { type: '2' }, (data) => {
    let movieNames = data.movieNames;
    let moviePosters = data.moviePosters;
    let movieHref = data.movieHref;
    for (let i = 0; i < movieNames.length; i++) {
      let div1 = $("<div></div>");
      div1.addClass('col-md-4 movie-card');
      let div2 = $("<div></div>");
      div2.addClass('thumbnail');
      div2.click(function() {
        window.open(movieHref[i]);
      });
      let div3 = $("<div></div>");
      div3.addClass('caption');
      let h6 = $("<h6></h6>");
      h6.attr('title', movieNames[i]);
      h6.text(movieNames[i]);
      div3.append(h6);
      let img = $("<img />");
      img.attr({ class: 'movie-img', alt: '12345电影', src: moviePosters[i] });
      div2.append(img, div3);
      div1.append(div2);
      $('#movies').append(div1);
    }
  });

  $.get('/getMovies', { type: '3' }, (data) => {
    let boxOfficeName = data.boxOfficeName;
    let boxOfficeRealtime = data.boxOfficeRealtime;
    let boxOfficeCumulate = data.boxOfficeCumulate;
    for (let i = 0; i < boxOfficeName.length; i++) {
      let tr = $('<tr></tr>');
      let td0 = $('<td></td>');
      td0.text(i + 1);
      let td1 = $('<td></td>');
      td1.text(boxOfficeName[i]);
      let td2 = $('<td></td>');
      td2.text(boxOfficeRealtime[i]);
      let td3 = $('<td></td>');
      td3.text(boxOfficeCumulate[i]);
      tr.append(td0, td1, td2, td3);
      $('tbody').append(tr);
    }
  });
});
