function currentWeatherCheck(e){
  if(e == "Ciel voilé" || e == "Nuit légèrement voilée" || e == "Faibles passages nuageux" || e == "Faiblement nuageux" || e == "Fortement nuageux" || e == "Développement nuageux" || e == "Nuit avec développement nuageux"){
    $("#bg").removeClass();
    $("#bg").addClass("bg-cloudy");
  }else if(e == "Ensoleillé" || e == "Eclaircies"){
    $("#bg").removeClass();
    $("#bg").addClass("bg-sun");
  }else if(e == "Nuit claire" || e == "Nuit bien dégagée"){
    $("#bg").removeClass();
    $("#bg").addClass("bg-moon");
  }else if(e == "Orage" || e == "Orage modéré" || e == "Faiblement orageux"){
    $("#bg").removeClass();
    $("#bg").addClass("bg-thunder");
  }else if(e == "Pluie faible" || e == "Pluie forte" || e == "Pluie modérée" || e == "Averses de pluie faible" || e == "Averses de pluie modérée" || e == "Averses de pluie forte" || e == "Couvert avec averses"){
    $("#bg").removeClass();
    $("#bg").addClass("bg-rain");
  }else if(e == "Neige faible" || e == "Neige modérée" || e == "Neige forte" || e == "Nuit avec averses de neige faible" || e == "Averses de neige faible"){
    $("#bg").removeClass();
    $("#bg").addClass("bg-snow");
  }
}

function dailyWeather(e){
  if(e == "Ciel voilé" || e == "Nuit légèrement voilée" || e == "Faibles passages nuageux" || e == "Faiblement nuageux" || e == "Fortement nuageux" || e == "Développement nuageux" || e == "Nuit avec développement nuageux"){
    $("#day-icon_"+[i]).removeClass();
    $("#day-icon_"+[i]).addClass("icon-cloudy");
  }else if(e == "Ensoleillé" || e == "Eclaircies"){
    $("#day-icon_"+[i]).removeClass();
    $("#day-icon_"+[i]).addClass("icon-sunny");
  }else if(e == "Nuit claire" || e == "Nuit bien dégagée"){
    $("#day-icon_"+[i]).removeClass();
    $("#day-icon_"+[i]).addClass("icon-sunny");
  }else if(e == "Orage" || e == "Orage modéré" || e == "Faiblement orageux"){
    $("#day-icon_"+[i]).removeClass();
    $("#day-icon_"+[i]).addClass("icon-thunder");
  }else if(e == "Pluie faible" || e == "Pluie forte" || e == "Pluie modérée" || e == "Averses de pluie faible" || e == "Averses de pluie modérée" || e == "Averses de pluie forte" || e == "Couvert avec averses"){
    $("#day-icon_"+[i]).removeClass();
    $("#day-icon_"+[i]).addClass("icon-rain");
  }else if(e == "Neige faible" || e == "Neige modérée" || e == "Neige forte" || e == "Nuit avec averses de neige faible" || e == "Averses de neige faible"){
    $("#day-icon_"+[i]).removeClass();
    $("#day-icon_"+[i]).addClass("icon-snow");
  }
}

$(document).ready(function(){
  var dateObject = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  navigator.geolocation.getCurrentPosition(function(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $.ajax({
      url:"https://us1.locationiq.com/v1/reverse.php?key=pk.5394ff94ca4956f9522ea94531cbf602&lat="+lat+"&lon="+lng+"&format=json&accept-language=en",
      method:"GET",
      dataType:"json",
      success:function(data){
        if(data.address.town){
          var city = data.address.town
        }else if(data.address.city){
          var city = data.address.city
        }else if(data.address.county){
          var city = data.address.county
        }
        var country = data.address.country
        $.ajax({
          url :"https://www.prevision-meteo.ch/services/json/"+city,
          dataType:"json",
          success:function(data){
            console.log(data)
            // Current day
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
            var day = dateObject.getDate();
            if(day < 10){
              day = "0"+day
            }
            var month = dateObject.getMonth();
            var year = dateObject.getFullYear();
            currentWeatherCheck(data.current_condition.condition)
            $(".datestamp").html(day+"/"+(month+1)+"/"+year+" - "+hours+":"+minutes);
            $(".loc").html(city+" - "+country);
            $(".temp").html(Math.round(data.current_condition.tmp)+"°C");
            $(".tempname").html(data.current_condition.condition);
            $(".min").html(Math.floor(data.fcst_day_0.tmin)+"°C");
            $(".max").html(Math.floor(data.fcst_day_0.tmax)+"°C");
            $(".wind").html(Math.round(data.current_condition.wnd_spd)+" km/h");
            // 4 next days
            for(i=1;i<5;i++){
              $(".day_"+i).html("<p class='name'>"+data['fcst_day_'+i].day_short+"</p><div id='day-icon_"+[i]+"'></div><p class='day-temp'>"+Math.floor(data['fcst_day_'+i].tmin)+"° - "+Math.round(data['fcst_day_'+i].tmax)+"°</p>");
              dailyWeather(data['fcst_day_'+i].condition);
            }
          }
        });
      }
    });

  });
  $(".pin").click(function(event){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $.ajax({
        url:"https://us1.locationiq.com/v1/reverse.php?key=pk.5394ff94ca4956f9522ea94531cbf602&lat="+lat+"&lon="+lng+"&format=json&accept-language=en",
        method:"GET",
        dataType:"json",
        success:function(data){
          if(data.address.town){
            var city = data.address.town
          }else if(data.address.city){
            var city = data.address.city
          }else if(data.address.county){
            var city = data.address.county
          }
          var country = data.address.country
          $.ajax({
            url :"https://www.prevision-meteo.ch/services/json/"+city,
            dataType:"json",
            success:function(data){
              console.log(data)
              // Current day
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
              var day = dateObject.getDate();
              if(day < 10){
                day = "0"+day
              }
              var month = dateObject.getMonth();
              var year = dateObject.getFullYear();
              currentWeatherCheck(data.current_condition.condition)
              $(".datestamp").html(day+"/"+(month+1)+"/"+year+" - "+hours+":"+minutes);
              $(".loc").html(city+" - "+country);
              $(".temp").html(Math.round(data.current_condition.tmp)+"°C");
              $(".tempname").html(data.current_condition.condition);
              $(".min").html(Math.floor(data.fcst_day_0.tmin)+"°C");
              $(".max").html(Math.floor(data.fcst_day_0.tmax)+"°C");
              $(".wind").html(Math.round(data.current_condition.wnd_spd)+" km/h");
              // 4 next days
              for(i=1;i<5;i++){
                $(".day_"+i).html("<p class='name'>"+data['fcst_day_'+i].day_short+"</p><div id='day-icon_"+[i]+"'></div><p class='day-temp'>"+Math.floor(data['fcst_day_'+i].tmin)+"° - "+Math.round(data['fcst_day_'+i].tmax)+"°</p>");
                dailyWeather(data['fcst_day_'+i].condition);
              }
            }
          });
        }
      });
  
    });
  })
  $("form").submit(function(event){
    event.preventDefault();
    var city_search = $(".city-search").val();
    if(city_search == "Bruxelles"){
      var city_search = "Bruxelles-1";
    }else{
      var city_search = $(".city-search").val();
    }
    $.ajax({
      url :"https://www.prevision-meteo.ch/services/json/"+city_search,
      dataType:"json",
      success:function(data){
        console.log(data)
        // Current day
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
        var day = dateObject.getDate();
        if(day < 10){
          day = "0"+day
        }
        var month = dateObject.getMonth();
        var year = dateObject.getFullYear();
        currentWeatherCheck(data.current_condition.condition)
        $(".datestamp").html(day+"/"+(month+1)+"/"+year+" - "+hours+":"+minutes);
        $(".loc").html(data.city_info.name+" - "+data.city_info.country);
        $(".temp").html(Math.round(data.current_condition.tmp)+"°C");
        $(".tempname").html(data.current_condition.condition);
        $(".min").html(Math.floor(data.fcst_day_0.tmin)+"°C");
        $(".max").html(Math.floor(data.fcst_day_0.tmax)+"°C");
        $(".wind").html(Math.round(data.current_condition.wnd_spd)+" km/h");
        // 4 next days
        for(i=1;i<5;i++){
          $(".day_"+i).html("<p class='name'>"+data['fcst_day_'+i].day_short+"</p><div id='day-icon_"+[i]+"'></div><p class='day-temp'>"+Math.floor(data['fcst_day_'+i].tmin)+"° - "+Math.round(data['fcst_day_'+i].tmax)+"°</p>");
          dailyWeather(data['fcst_day_'+i].condition);
        }
      }
    });
  });
});
