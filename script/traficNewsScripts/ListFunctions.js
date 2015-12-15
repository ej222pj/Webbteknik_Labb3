"use strict";

var traficNewsScripts = traficNewsScripts || {};

traficNewsScripts.ListFunctions = function(traficNewsData) 
{
    this.AddDataToList(traficNewsData);
};

traficNewsScripts.ListFunctions.prototype.AddDataToList = function(traficNewsData) {  
    var listDivs = [];
    var that = this;

    for(var i = 0; i < traficNewsData.length; i++) {
        listDivs.push(this.CreateList(traficNewsData[i]));
    }

    document.getElementById('numberOfNews').innerHTML = 
    '<p>' + listDivs.length + ' Trafiknyheter presenteras</p>'; 

    if(listDivs.length == 0)
    {
        document.getElementById('accidentList').innerHTML = "<p>Finns inget att visa!</p>"
    }
    else 
    {
        document.getElementById('accidentList').innerHTML = listDivs;
    }
};

traficNewsScripts.ListFunctions.prototype.CreateList = function(traficDataObject) {

    var div = '<div class="listItem"><p><strong>Kategori: '+ 
        traficDataObject.getCategory() + '</strong></p></br><p>Underkategori: ' +
        traficDataObject.getSubCategory() + '</p></br><p>Datum: ' +
        traficDataObject.getCreatedDate() + '</p></br><p>Titel: ' +
        traficDataObject.getTitle() + '</p></br><p>Plats: ' +
        traficDataObject.getExactLocation() + '</p></br><p>Beskrivning: ' +
        traficDataObject.getDescription() +'</p></div>';

    return div;  
}