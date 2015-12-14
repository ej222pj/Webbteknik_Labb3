"use strict";

var traficNewsScripts = traficNewsScripts || {};

traficNewsScripts.MapFunctions = function(mapId) {
    var map; 
    var traficNewsData;
    var traficNewsListFunc;
    var googleMarkers = [];
    var markerClickWindow = null;
    var that = this;
    var categories = document.querySelector("#categories");
    // Create cache object with up to 1000 elements
    cache = new ObjectCache( 1000);

    map = new google.maps.Map(document.getElementById(mapId), {
        center: {lat: 62.383256, lng: 16.0198304},
        zoom: 4
    });
    
    traficNewsData = new traficNewsScripts.JsonFunctions();
    traficNewsData.loadData(categories.value);

    categories.addEventListener("change", function() {
        traficNewsData = new traficNewsScripts.JsonFunctions();
        traficNewsData.loadData(categories.value); 
        
        that.getTraficNewData = function() {
            return traficNewsData.getTraficNewData();
        };
    
        that.getMap = function() {
            return map;
        };
        
        that.setMarkerClickWindow = function(openWindow) {
            markerClickWindow = openWindow;
        };
        
        that.closeMarkerClickWindow = function() {
            if(markerClickWindow !== null) {
                markerClickWindow.close();
            }
            markerClickWindow = null;
        };

        that.setMarkers = function(markers) {
            googleMarkers = markers;
        };

        //Plockar bort alla markers
        for (var i = 0; i < googleMarkers.length; i++) {
            googleMarkers[i].setMap(null);
        }
        that.AddGoogleMarkers();  

        traficNewsListFunc = new traficNewsScripts.ListFunctions(that.getTraficNewData());  
    });


    that.getTraficNewData = function() {
        return traficNewsData.getTraficNewData();
    };
    
    that.getMap = function() {
        return map;
    };
    
    that.setMarkerClickWindow = function(openWindow) {
        markerClickWindow = openWindow;
    };

    that.setMarkers = function(markers) {
        googleMarkers = markers;
    };
    
    that.closeMarkerClickWindow = function() {
        if(markerClickWindow !== null) {
            markerClickWindow.close();
        }
        markerClickWindow = null;
    };
    
    that.AddGoogleMarkers();  
    traficNewsListFunc = new traficNewsScripts.ListFunctions(that.getTraficNewData());
};

traficNewsScripts.MapFunctions.prototype.AddGoogleMarkers = function() {  
    var googleMarkers = [];
    var traficNewsData = this.getTraficNewData();
    
    for (var i = 0; i < googleMarkers.length; i++) {
        googleMarkers[i].setMap(null);
    }
    
    for(var i = 0; i < traficNewsData.length; i++) {
        googleMarkers.push(this.CreateMarker(traficNewsData[i]));
    }

    this.setMarkers(googleMarkers);

};

traficNewsScripts.MapFunctions.prototype.CreateMarker = function(traficNewsDataObject) {
    var marker = [];
    var markerClickWindow;
    var latlong;
    var that = this;    

    function markerClickWindowContent() {
        return '<div class="popupWindow">' +
        '<span>' + traficNewsDataObject.getCategory() + '</span>-' +
        '<span>' + traficNewsDataObject.getSubCategory() + '</span>' +
        '<span>: ' + traficNewsDataObject.getCreatedDate() + '</span>' +
        '<h1>' + traficNewsDataObject.getTitle() + '</h1>' +
        '<h2>' + traficNewsDataObject.getExactLocation() + '</h2>' +
        '<p>' + traficNewsDataObject.getDescription() + '</p>' +
        '</div>';
    }
    
    //Gör hela markern i en färg
    function markerColor() {
        var markerColor = [ 
        "http://maps.google.com/mapfiles/ms/icons/red.png",
        "http://maps.google.com/mapfiles/ms/icons/orange.png",
        "http://maps.google.com/mapfiles/ms/icons/yellow.png", 
        "http://maps.google.com/mapfiles/ms/icons/blue.png", 
        "http://maps.google.com/mapfiles/ms/icons/green.png" ];
        return markerColor[traficNewsDataObject.getPriority() - 1];
    }
    //Sätter nummer och ändrar färgen på nummret
    function markerLableColor() {
        var markerLableColor = [ 
        "red",
        "orange",
        "yellow", 
        "blue", 
        "green" ];
        return markerLableColor[traficNewsDataObject.getPriority() - 1];
    }
    
    latlong = new google.maps.LatLng(traficNewsDataObject.getLatitude(), traficNewsDataObject.getLongitude());
    
    marker = new google.maps.Marker({
        map: this.getMap(),
        position: latlong,
        //icon: markerColor(), //Använd om de ska va färg på markerna.
        label: {
            text: traficNewsDataObject.getPriority().toString(),
            color: markerLableColor()
        }
    });
    
    markerClickWindow = new google.maps.InfoWindow({
        content: markerClickWindowContent()
    });
    
    marker.addListener('click', function() {
        markerClickWindow.open(this.getMap(), marker);
        that.closeMarkerClickWindow();
        that.setMarkerClickWindow(markerClickWindow);
    });
    
    return marker;  
}