$(doument).ready,function(){
	//Buscamos versión de json
	var paramFecha="";
	console.log("Buscando datos localmente antes de petición")
	var versionJSON = JSON.parse(localStorage.getItem('version'));
	console.log(versionJSON.version);
	paramFeccha = versionJSON.version;
	if(versionJSON.version != null){
		$.each(versionJSON, function (key, value){
			console.log(key + '=' + value);
		});
	}
};