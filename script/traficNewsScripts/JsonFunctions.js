"use strict";

var traficNewsScripts = traficNewsScripts || {};

traficNewsScripts.JsonFunctions = function() 
{
    var traficNewsData;
    
    this.getNewsData = function() {
        return traficNewsData;
    };
    
    this.setData = function(_traficNewsData) 
    {
        traficNewsData = _traficNewsData;
    };
};

traficNewsScripts.JsonFunctions.prototype.getTraficNewData = function() 
{
    return this.getNewsData();
};

//http://stackoverflow.com/a/31060596
Date.prototype.getFromFormat = function(format) {
    var yyyy = this.getFullYear().toString();
    format = format.replace(/yyyy/g, yyyy)
    var mm = (this.getMonth()+1).toString(); 
    format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
    var dd  = this.getDate().toString();
    format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
    var hh = this.getHours().toString();
    format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
    var ii = this.getMinutes().toString();
    format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
    var ss  = this.getSeconds().toString();
    format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
    return format;
};

//https://developer.appcelerator.com/question/156511/sorting-a-json-object#answer-267826
function sortData(data) 
{
    for(var i = 0; i < data.messages.length; i++) {
        data.messages[i].createddate = new Date(parseInt(data.messages[i].createddate.substr(6))).getFromFormat('yyyy-mm-dd hh:ii:ss');
    }

    var sorted = [];
    Object.keys(data.messages).sort(function(a,b){
        return data.messages[a].createddate > data.messages[b].createddate ? -1 : 1
    }).forEach(function(key){
        sorted.push(data.messages[key]);
    });
    return sorted;
}

//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
traficNewsScripts.JsonFunctions.prototype.loadData = function() 
{
    var oReq;
    var parsedJsonData;
    var traficNewsData = [];
    var that = this;
    var tempDataObject;

    try
    {
        // Opera 8.0+, Firefox, Chrome, Safari
        oReq = new XMLHttpRequest();
    }
    catch (e)
    {
        // Internet Explorer Browsers
        try
        {
            oReq = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) 
        {
            try
            {
                oReq = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e)
            {
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }   
       }
    }
    //http://mdn.beonex.com/en/DOM/XMLHttpRequest/Synchronous_and_Asynchronous_Requests.html
    oReq.open("GET", "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false", false);
    oReq.onreadystatechange = function() {
        if(oReq.readyState === 4 && oReq.status === 200) 
        {
            //Går inte att få json sorterad ifrån sr
            parsedJsonData = JSON.parse(oReq.responseText);

            //Formaterar, sorterar och ger bara tillbaka messages!
            var sortedJsonData = sortData(parsedJsonData);

            for(var i = 0; i < sortedJsonData.length; i++) {
            tempDataObject = 
            {
                priority: "", 
                createdDate: "", 
                traficTitle: "", 
                exactLocation: "", 
                descript: "", 
                latitude: "", 
                longitude: "", 
                category: "", 
                subCategory: ""
            };

            tempDataObject.priority = sortedJsonData[i].priority.toString();
            tempDataObject.createdDate = sortedJsonData[i].createddate
            tempDataObject.traficTitle = sortedJsonData[i].title;
            tempDataObject.exactLocation = sortedJsonData[i].exactlocation;
            tempDataObject.descript = sortedJsonData[i].description;
            tempDataObject.latitude = sortedJsonData[i].latitude.toString();
            tempDataObject.longitude = sortedJsonData[i].longitude.toString();
            tempDataObject.category = sortedJsonData[i].category.toString();
            tempDataObject.subCategory = sortedJsonData[i].subcategory;

            traficNewsData.push(new traficNewsScripts.JsonFunctions.TraficNewsObject(tempDataObject));
            }

            that.setData(traficNewsData);
        }
        else
        {
            //Kan inte tanka json, fixa ett error
        }
    };
    oReq.send();
};

traficNewsScripts.JsonFunctions.TraficNewsObject = function(dataObject) 
{    
    this.getPriority = function() 
    {
        return dataObject.priority;
    };

    this.getCreatedDate = function() 
    {
        return dataObject.createdDate;
    };
    
    this.getTitle = function() 
    {
        return dataObject.traficTitle;
    };
    
    this.getExactLocation = function() 
    {
        return dataObject.exactLocation;
    };
    
    this.getDescription = function() 
    {
        return dataObject.descript;
    };
    
    this.getLatitude = function() 
    {
        return dataObject.latitude;
    };
    
    this.getLongitude = function() 
    {
        return dataObject.longitude;
    };
    
    this.getCategory = function() 
    {
        var categories = ["Vägtrafik", "Kollektivtrafik", "Planerad störning", "Övrigt"];
        
        return categories[dataObject.category];
    };
    
    this.getSubCategory = function() 
    {
        return dataObject.subCategory;
    };
};