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
                    console.log($(this).find('title').text());
                });
            });
        }
    });
});