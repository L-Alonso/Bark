// show about us info when button is clicked on navbar
$("#about-us-btn").click(function() {
    $("#about-us-modal").addClass("is-active")
});

// close about us info
$("#about-us-close").click(function() {
    $("#about-us-modal").removeClass("is-active")
});

// show contact info when button is clicked
$("#contact-us-btn").click(function() {
    $("#contact-us-modal").addClass("is-active")
});

// close contact us info
$("#contact-us-close").click(function() {
    $("#contact-us-modal").removeClass("is-active")
});