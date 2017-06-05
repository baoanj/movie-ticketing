var CITY = '广州市';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    $('#cityChoice').html('广州市<strong class="caret"></strong>');
  }
}

function showPosition(position) {
  var latlon = position.coords.latitude + ',' + position.coords.longitude;
  //google
  var url = 'http://maps.google.cn/maps/api/geocode/json?latlng=' + latlon + '&language=CN';
  $.ajax({
    type: "GET",
    url: url,
    beforeSend: function() {
      $('#cityChoice').html('定位中..<strong class="caret"></strong>');
    },
    success: function(json) {
      if (json.status == 'OK') {
        var results = json.results;
        CITY = results[3]['address_components'][0]['long_name'];
        $('#cityChoice').html(results[3]['address_components'][0]['long_name'] + '<strong class="caret"></strong>');
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      $('#cityChoice').html('广州市<strong class="caret"></strong>');
    }
  });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      $('#cityChoice').html('广州市<strong class="caret"></strong>');
      break;
    case error.POSITION_UNAVAILABLE:
      $('#cityChoice').html('广州市<strong class="caret"></strong>');
      break;
    case error.TIMEOUT:
      $('#cityChoice').html('广州市<strong class="caret"></strong>');
      break;
    case error.UNKNOWN_ERROR:
      $('#cityChoice').html('广州市<strong class="caret"></strong>');
      break;
  }
}

getLocation();
