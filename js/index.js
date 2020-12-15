$(document).ready(function(){
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $.ajax({
      url:"https://us1.locationiq.com/v1/reverse.php?key=pk.5394ff94ca4956f9522ea94531cbf602&lat="+lat+"&lon="+lng+"&format=json&accept-language=en",
      method:"GET",
      dataType:"json",
      success:function(data){
        var city = data.address.city_district
        var country = data.address.country
        $.ajax({
          url:"https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lng+"&appid=b3bd8829084bc0b1c5c50d2e43469b8a&units=metric",
          dataType:"json",
          success:function(data){
            // Current day
            const unixTimestamp = data.current.dt
            const milliseconds = unixTimestamp * 1000 
            const dateObject = new Date(milliseconds)
            var hours = dateObject.getHours();
            if(hours <10){
              hours = "0"+hours
            }
            if(hours >=18 || hours <= 6){
              $("body").removeClass();
              $("body").addClass("night");
            }else{
              $("body").removeClass();
              $("body").addClass("morning");
            }
            var minutes = dateObject.getMinutes();
            if(minutes < 10){
              minutes = "0"+minutes
            }
            var day = dateObject.getDay();
            if(day < 10){
              day = "0"+day
            }
            var month = dateObject.getMonth();
            var year = dateObject.getFullYear();
            switch (data.current.weather[0].main){
              case "Clouds":
                $(".bg").addClass("bg-cloudy");
              break
              case "Rain":
                $(".bg").addClass("bg-rain");
              break
              case "Snow":
                $(".bg").addClass("bg-snow");
              break
              case "Clear":
                $(".bg").addClass("bg-snow");
              break
              case "Thunderstorm":
                $(".bg").addClass("bg-thunder");
              break
            }
            $(".datestamp").html(day+"/"+month+"/"+year+" - "+hours+":"+minutes);
            $(".loc").html(city+" - "+country);
            $(".temp").html(Math.round(data.current.temp)+"°C");
            $(".tempname").html(data.current.weather[0].description);
            $(".min").html(Math.floor(data.daily[0].temp.min)+"°C");
            $(".max").html(Math.floor(data.daily[0].temp.max)+"°C");
            $(".wind").html(Math.round(data.current.wind_speed)+" m/sec");
            // 4 next days
            for(i=1;i<5;i++){
              var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
              var dayDate = data.daily[i].dt;
              const ms = unixTimestamp * 1000;
              const dateDay = new Date(ms);
              var dd = dateDay.getDay();
              $(".others").append("<div class='day col-3'><p class='name'>"+days[dd+i]+"</p><div id='day-icon_"+[i]+"'></div><p class='day-temp'>"+Math.floor(data.daily[i].temp.min)+"° - "+Math.round(data.daily[i].temp.max)+"°</p></div>");
              switch (data.daily[i].weather[0].main){
                case "Clouds":
                  $("#day-icon_"+[i]).removeClass();
                  $("#day-icon_"+[i]).addClass("icon-cloudy");
                break
                case "Rain":
                  $("#day-icon_"+[i]).removeClass();
                  $("#day-icon_"+[i]).addClass("icon-rain");
                break
                case "Snow":
                  $("#day-icon_"+[i]).removeClass();
                  $("#day-icon_"+[i]).addClass("icon-snow");
                break
                case "Clear":
                  $("#day-icon_"+[i]).removeClass();
                  $("#day-icon_"+[i]).addClass("icon-sunny");
                break
                case "Thunderstorm":
                  $("#day-icon_"+[i]).removeClass();
                  $("#day-icon_"+[i]).addClass("icon-thunder");
                break
              }
            }
          }
        });
      }
    });

  });
  $(".search").click(function(){
    alert("hey")
  })

});
