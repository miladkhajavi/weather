$(document).ready(function () {
  const items = []
  $(".card-error").hide();
  $('#search').change(function (e) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      dataType: 'jsonp',
      crossDomain: true,
      type: 'GET',
      data: {
        q: e.target.value,
        appid: 'bdd9a45ed7233bd99b307aa4fbb6019f',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
      },
      success: function (data) {
        console.log(data);
        // image 
        $(".image").html('<img src="' + `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` + '" />');

        // status
        let temp = Math.round(data.main.temp - 273.15)
        $('#city').html(`${data.sys.country.toLowerCase()}-${data.name.toLowerCase()}`);
        $('#tem').html(`${temp}&#8451`);

        // weather status

        $('.p1').html(`status: ${data.weather[0].description}`);
        $('.p2').html(`clouds: ${data.clouds.all} %`);
        $('.p3').html(`wind: ${data.wind.speed}/${data.wind.deg}`);
        $('.p4').html(`visibility: ${data.visibility}M`);

        //background 

        if (data.dt > data.sys.sunrise) {
          $('.card').css('background-image', 'url(' + './bg/bg2.jpg' + ')');
        }
        if (data.dt < data.sys.sunrise) {
          $('.card').css('background-image', 'url(' + './bg/bg3.jpg' + ')');
        }
      },
      error: function (err) {

        $(".card").hide();
        $(".card-error").show();

        $(".card-error").animate({
          height: '+10px',
        });

      }
    })
  });


})