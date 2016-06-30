var folderName = 'imagenesTrucks';
var fileName;
var root = null; // File System root variable
var currentDir = null; // Current DirectoryEntry listed
var parentDir = null; // Parent of the current directory

var activeItem = null; // The clicked item
var activeItemType = null; // d-directory, f-file
var clipboardItem = null; // file or directory for copy or move 
var clipboardAction = null; // c-copy, m-move
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);        
        //Se busca la versión de json
        var paramFecha = "";
                
        console.log('Buscando fecha de version de los trucks en general  a actualizar:');
        var versionJSON = localStorage.getItem('version');
        var paramFecha = "";
        console.log(versionJSON);
        if (versionJSON != null) {
            paramFecha = versionJSON;
            console.log('Ultima fecha de actualización:' + paramFecha);
            document.getElementById('textoLoader').innerHTML = "ACTUALIZANDO DATOS DE LOS TRUCKS";            
        }
        else {
            console.log('Se busca por primera vez');
            paramFecha = "2014-10-01 13:00:0";
            document.getElementById('textoLoader').innerHTML = "DESCARGANDO DATOS DE LOS TRUCKS";
        }        
        console.log(versionJSON);                
        function listDir(fileEntry)
        {  
            console.log("folder:"+JSON.stringify(fileEntry.fullPath));
            var directoryReader = fileEntry.createReader();    
            directoryReader.readEntries(onSuccess,onError);
        }  
        function fail() {
            console.log("ERROR ");
        }
        function onSuccess(entries) 
        {      
            var myarray = [];
            var myJSON = "";
            for (var i = 0; i < entries.length; i++) 
            {
                console.log("valor"+entries[i].name)    
            }
        }
        function onError() {
            console.log("ERROOR")
        }

        if (versionJSON != null) {
            paramFecha = versionJSON;
            console.log(versionJSON);            
        }
        else {
            console.log('Se busca por primera vez');
            paramFecha = "2014-10-01 13:00:0";
            document.getElementById('textoLoader').innerHTML = "DESCARGANDO DATOS DE LOS TRUCKS";
        }
        console.log("dirección:"+'http://www.s544443713.onlinehome.mx/AppTrucks/app/getUpdates.php?d=' + encodeURI(paramFecha));
        $.ajax({
            type: "POST",
            url: 'http://www.s544443713.onlinehome.mx/AppTrucks/app/getUpdates.php?d=' + encodeURI(paramFecha),
            dataType: 'JSON',
            async: true,
            cache: false,
            beforeSend: function () {                    
            },
            success: function (result) {
                console.log(result)
                var dataToStore = JSON.stringify(result);                
                localStorage.setItem('version', (JSON.parse(dataToStore)).version);
                localStorage.setItem('trucks', dataToStore);
                document.getElementById('textoLoader').innerHTML = "TRUCKS ENONTRADOS";
                console.log("TRUCKS ENCONTRADOS")
                console.log((JSON.parse(dataToStore)).numTrucks);
                if (parseInt((JSON.parse(dataToStore)).numTrucks) > 0)
                    getImages(paramFecha);
                else {
                    console.log("NO se irá por las imágenes")
                    window.location = "pages/inicio.html";
                }
                //alert("Por obtener imagenes")                
             },
             error: function (request, error) {
                 console.log(request);
                 window.location = "pages/inicio.html";
             }
        });        
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };
        
    function getImages(paramFecha) {
        console.log("Obteniendo imágenes desde:" + paramFecha);
        document.getElementById('textoLoader').innerHTML = "DESCARGANDO IMÁGENES DE LOS TRUCKS, SE RECOMIENDA WI-FI";
        downloadFile('http://s544443713.onlinehome.mx/AppTrucks/app/getZipTest.php?d='+paramFecha);            
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    
    function downloadFile(URL) {
        //step to request a file system 
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
        console.log("Guardando")
        function fileSystemSuccess(fileSystem) {
            var download_link = encodeURI(URL);
            fileName = download_link.substr(download_link.lastIndexOf('/') + 1); //Get filename of URL
            var directoryEntry = fileSystem.root; // to get root path of directory
            directoryEntry.getDirectory(folderName, {
                create: true,
                exclusive: false
            }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
            var rootdir = fileSystem.root;
            var fp = fileSystem.root.toNativeURL(); // Returns Fullpath of local directory

            fp = fp + "/" + folderName + "/" + fileName; // fullpath and name of the file which we want to give
            // download function call
            filetransfer(download_link, fp);
        }

        function onDirectorySuccess(parent) {
            // Directory created successfuly
            console.log("OK")
            console.log(parent);
        }

        function onDirectoryFail(error) {
            //Error while creating directory
            console.log("Guardando no dir" + error.code)
            alert("Unable to create new directory: " + error.code);

        }

        function fileSystemFail(evt) {
            //Unable to access file system
            console.log("Guardando no" + evt.target.error.code)
            alert(evt.target.error.code);
        }
    }

    function filetransfer(download_link, fp) {
        var fileTransfer = new FileTransfer();
        // File download function with URL and local path
        fileTransfer.download(download_link, fp,
            function (entry) {
                console.log("!download complete: " + entry.fullPath);
                console.log("fp" + fp);
                console.log("descargado el archivo en:" + entry.fullPath);
                var ruta = entry.fullPath;
                zip.unzip(fp,
                    "file:///data/data/smart.mx.io.cordova.radarfoodtruck/files/files//imagenesTrucks/",
                    function () {
                		document.getElementById('textoLoader').innerHTML = "TRUCKS LISTOS";
                        console.log('Zip decompressed successfully');
                        window.location = "pages/inicio.html";
                    }
                );
            },
            function (error) {
                //Download abort errors or download failed errors
                alert("download error source " + error.source);
                window.location = "pages/inicio.html";
            }
        );
    }

} )();