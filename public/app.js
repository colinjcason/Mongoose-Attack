// save a note function
$(document).on("click", "#save-btn", function() {
    var id = $(this).attr("data-id");
   
   $.ajax({
       method: "POST",
       url: "/notes",
       data: {
           body: $("#comment-text").val()
       }
   }).then(function(data) {
       console.log(data);
   });

});
