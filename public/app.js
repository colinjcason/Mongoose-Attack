$(function() {
    $("#save-btn").on("click", function(e) {
        e.preventDefault();
        console.log("click");
    });
});

// save note function
$(docmuent ).on("click", "#save-btn", function() {
    console.log()
   var id = $(this).attr("data-id");
   
   $.ajax({
       method: "POST",
       url: "/articles/" + id,
       data: {
           body: $("#comment-text").val()
       }
   }).then(function(data) {
       console.log(data);
   });
});
