$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/traffic/messages",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('sr').each(function(){

                //var id = $(this).attr('id');
               // var title = $(this).find('title').text();
                
                $(this).find('messages').each(function()
                {
                    $(this).find('message').each(function()
                    {
                        $("#accidentList").append(
                            "<p class='list'>"+ 
                            $(this).find('title').text() + "</br>" +
                            $(this).find('createddate').text() + "</br>" +
                            $(this).find('exactlocation').text() + "</br>" +
                            $(this).find('description').text() + "</br>" +
                            $(this).find('subcategory').text() 
                            +"</p>");
                    });
                });
            });
        }
    });
});