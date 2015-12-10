"use strict";

var traficNewsScripts = traficNewsScripts || {};

traficNewsScripts.MapFunctions = function(mapId) {
    var map; 
    var traficNewsData;
    var traficNewsListFunc;
    var googleMarkers = [];
    var markerClickWindow = null;
    
    map = new google.maps.Map(document.getElementById(mapId), {
        center: {lat: 62.383256, lng: 16.0198304},
        zoom: 4
    });
    
    traficNewsData = new traficNewsScripts.JsonFunctions();
    traficNewsData.loadData();

    this.getTraficNewData = function() {
        return traficNewsData.getTraficNewData();
    };
    
    this.getMap = function() {
        return map;
    };
    
    this.setMarkerClickWindow = function(openWindow) {
        markerClickWindow = openWindow;
    };
    
    this.closeMarkerClickWindow = function() {
        if(markerClickWindow !== null) {
            markerClickWindow.close();
        }
        markerClickWindow = null;
    };
    
    this.AddGoogleMarkers();  

    traficNewsListFunc = new traficNewsScripts.ListFunctions(this.getTraficNewData());
};

traficNewsScripts.MapFunctions.prototype.AddGoogleMarkers = function() {  
    var googleMarkers = [];
    var traficNewsData = this.getTraficNewData();
    
    for(var i = 0; i < traficNewsData.length; i++) {
        googleMarkers.push(this.CreateMarker(traficNewsData[i]));
    }
};

traficNewsScripts.MapFunctions.prototype.CreateMarker = function(traficNewsDataObject) {
    var marker;
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