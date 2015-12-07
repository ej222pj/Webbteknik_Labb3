"use strict";

if (GBrowserIsCompatible())
{
	// create map component in div with the id = "map"
	var map = new GMap2(document.getElementById("map"));
	// create center point when map is displayed
	map.setCenter(new GLatLng(37.4419, -122.1419), 13);
	map.openInfoWindow(map.getCenter(),
	"<b>Your Company Here</b>");
	// re-open the info balloon if they close it
	var point = new GLatLng(37.395746, -121.952234);
	map.addOverlay(createMarker(point, 1));
}


function createMarker(point, number)
{
	var marker = new GMarker(point);
	// create clickable point with title for address
	GEvent.addListener(marker, "click", function()
	{
		marker.openInfoWindowHtml("<b>Your Company Here</b>");
	});
	return marker;
}