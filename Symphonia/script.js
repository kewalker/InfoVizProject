$(document).ready(function() {
    $("#frontB").click(function() {
        $("#frontB, .barText").fadeOut("fast");
        $("#backB").fadeIn("fast");
    });
    $("#closeB").click(function() {
        $("#backB").fadeOut("fast");
        $("#frontB, .barText").fadeIn("fast");
    });
});

$(document).ready(function() {
    $("#frontS").click(function() {
        $("#frontS, .SText").fadeOut("fast");
        $("#backS").fadeIn("fast");
    });
    $("#closeS").click(function() {
        $("#backS").fadeOut("fast");
        $("#frontS, .SText").fadeIn("fast");
    });
    $("#frontR").click(function() {
        $("#frontR, .RText").fadeOut("fast");
        $("#backR").fadeIn("fast");
    });
    $("#closeR").click(function() {
        $("#backR").fadeOut("fast");
        $("#frontR, .RText").fadeIn("fast");
    });
    $("#selAll").click(function() {
        $("[type='checkbox']", "#checBoxes").each(function() { this.checked = true; });
    });
    $("#selNo").click(function() {
        $("[type='checkbox']", "#checBoxes").each(function() { this.checked = false; });
    });
});