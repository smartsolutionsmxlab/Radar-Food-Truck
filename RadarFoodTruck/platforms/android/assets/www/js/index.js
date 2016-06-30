var print = function(o){
	var str='';
	for(var p in o){
		if(typeof o[p] == 'string'){
			str+= p + ': ' + o[p]+'; </br>';
		}else{
			str+= p + ': { </br>' + print(o[p]) + '}';
		}
	}
	return str;
}

var app = {
	initialize: function() {
		this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        alert('Received Event: ' + id);
        $.getJSON("datos/version.json", function(json) {		 
        	var paramFecha="";
            console.log(json.version);
            if (json.version=='0'){
            	alert("Se buscarán los datos de los trucks");
           		paramFecha= "2014-10-01 13:00:0";			     	
            }
            else{
          		paramFecha=json.version;			     	
            }
        });
        $.ajax({        	
        	type:"GET",
            url: 'http://s544443713.onlinehome.mx/AppTrucks/app/test/getUpdates.php',
            dataType: 'text',            
            async: false,
            cache: false,
            beforeSend: function() {
            	alert("BS")
            },
            success: function (result) {
            	alert("OK"+result);        
            },
            error: function (request,error) {
            	alert( print(request))
            	alert( print(error))            	
                
            }
        });                       
    }
};
app.initialize();