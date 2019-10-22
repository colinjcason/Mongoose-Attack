// Grab articles as and display to the page
$.getJSON("/", function(data) {
    for(var i = 0; i < data.length; i++) {
        $("#articles").append("<p>" + data[i].title + data[i].link + "</p>");
    }
});