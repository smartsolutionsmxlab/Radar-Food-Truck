function initMap() {
  
  function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
        return vars;
  }
  console.log("Buscando localmente antes de petición en Detalle" + getUrlVars()["d"]);
  var fType = getUrlVars()["d"];
  console.log(fType);
  var jsonFile = JSON.parse(localStorage.getItem('trucks'));  
  console.log(jsonFile.trucks);
  
    //alert("Se buscarán los datos de los trucks");
  var trucks = jsonFile.trucks;
 
  console.log(trucks.length);
  
  var myLatLng = { lat: 19.444827, lng: -99.167437 };
  if (jsonFile != null && trucks.length > 0) {
      for (i = 0; i < trucks.length; i++) {
          if (fType == trucks[i].idTruck) {
              myLatLng = { lat: parseFloat(trucks[i].latitud), lng: parseFloat(trucks[i].longitude) }
              break;
          }          
      }
  }
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: myLatLng
  });

  var numTrucks = 0;
  
  //var menu = "<ul data-role='listview' data-inset='false'>";
  var location = "file:///data/data/smart.mx.io.cordova.radarfoodtruck/files/files//imagenesTrucks/";
  var markers = new Array(trucks.length)
  var myLatLng2 = { lat: 19.444827, lng: -99.167437 };
  if (jsonFile != null && trucks.length > 0) {
      for (i = 0; i < trucks.length; i++) {
          myLatLng2 = { lat: parseFloat(trucks[i].latitud), lng: parseFloat(trucks[i].longitude) };
          if (fType == trucks[i].idTruck) {
              console.log(location + (trucks[i].idTruck) + "l.jpg");
              document.getElementById('imagenLarge').src = location + (trucks[i].idTruck) + "l.jpg";
              document.getElementById('imagenLarge').class = "imgLrg";
              document.getElementById('imagenIcono').src = location + (trucks[i].idTruck) + ".jpg";
              document.getElementById('textoTruck').innerHTML = "<font color='black'>" + trucks[i].nombre + "</font>" + "<br><font color='black'>" + trucks[i].tipo + "</font><br><font color='black'>8am - 9pm</font>";
              document.getElementById('textoDireccion').innerHTML = "<font color='white'>Ubicaci&oacute;n: " + trucks[i].direccion + "</font>";              
              document.getElementById('textoInfo').innerHTML = "<font color='white'>" + trucks[i].info + "</font>";
              document.getElementById('textoRedes1').innerHTML = "<font color='black'>" + trucks[i].facebook + "</font>";
              document.getElementById('textoRedes2').innerHTML = "<font color='black'>@" + trucks[i].twitter + "</font>";
              console.log(trucks[i].nombre + myLatLng2)
              markers[i] = new google.maps.Marker({
                  position: myLatLng2,
                  map: map,
                  title: trucks[i].nombre,
                  icon: location + (i + 1) + "s.png"
              });
              break;
          }
      }
  }
}