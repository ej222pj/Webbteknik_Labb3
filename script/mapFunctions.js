"use strict";

var latlng = {lat: 57.469304, lng: 15.507875};

// create map component in div with the id = "map"
var map = new google.maps.Map(document.getElementById('map'), {
	center: latlng,
	zoom: 13
});

var marker = new google.maps.Marker(
{
	position: latlng,
	map: map,
	title: 'Pauli'
});