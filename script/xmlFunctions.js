"use strict";

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/traffic/messages",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('sr').each(function()
            {
                $(this).find('messages').each(function()
                {
                    $(this).find('message').each(function()
                    {
                        $("#accidentList").append(
                            "<div class='listItem'><p><strong>Plats: "+ 
                            $(this).find('title').text() + "</strong></p></br><p>Tid: " +
                            $(this).find('createddate').text() + "</p></br><p>Position: " +
                            $(this).find('exactlocation').text() + "</p></br><p>Beskrivning: " +
                            $(this).find('description').text() + "</p></br><p>Kategori: " +
                            $(this).find('subcategory').text() 
                            +"</p></div>");
                    });
                });
            });
        }
    });
});