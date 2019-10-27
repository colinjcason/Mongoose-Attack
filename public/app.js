$(function () {

    // save a note function
    $(document).on("click", "#save-btn", function (e) {
        e.preventDefault();

        var id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            method: "POST",
            url: "/notes/" + id,
            data: {
                body: $("#comment-text").val()
            }
        }).then(function (data) {
            console.log(data);
        });

    });
});