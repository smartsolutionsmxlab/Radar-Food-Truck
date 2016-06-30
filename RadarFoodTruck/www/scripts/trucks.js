var folderName = 'imagenesTrucks/';

$(document).ready(function () {
    //Se busca la versión de json
    var numTrucks = 0;
    console.log("Buscando localmente antes de petición en Trucks")
    var jsonFile = JSON.parse(localStorage.getItem('trucks'));
    console.log(jsonFile.trucks);
    //alert("Se buscarán los datos de los trucks");
    var trucks = jsonFile.trucks;
    console.log(trucks.length)
    var menu = "<table border=0 width='95%' height='80%'>";
    var location = "file:///data/data/smart.mx.io.cordova.radarfoodtruck/files/files//imagenesTrucks/";
    //document.getElementById("img1").style.display = 'block';
    //document.getElementById("img1").src = location;
    if (jsonFile != null && trucks.length > 0) {
        for (i = 0; i < trucks.length; i++) {
            menu = menu +                           
                "<tr><td align=center><img src='" + location + (i + 1) + ".jpg' width=100 height=100 onclick='openDetalle(" + (trucks[i].idTruck) + ")'/></td><td bgcolor='black' align=left onclick='openDetalle(" + (trucks[i].idTruck) + ")'><font size='5' color='#4DB6AC'>" + trucks[i].nombre + "</font>" + "<br><font size='3' color='white'>Comida de Tipo:" + trucks[i].tipo + "</font></td></tr>";
        }
    }    
    console.log(menu)
    $("#contenido").html(menu+"</table>");
});

function openDetalle(i) {
    window.location = "../common/detalle.html?d="+i;
}