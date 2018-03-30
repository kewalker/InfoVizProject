$(document).ready(function() {

    $("#intro").fadeIn("slow");
    $(".footer").fadeIn("slow");

    $("#openAll, #barImg, #scImg, #radarImg").click(function() {
        $("#iconBar").addClass("goUpDown");
        $(".introHeader, .introText").slideUp();
        $("#banner").addClass("blurIt");
        $(".iconCap").css("color", "white");
    });
    $("#openAll").click(function() {
        $("#scatterFrame").css("transform", "translateY(70px)");
        $("#barFrame").css("transform", "translateY(100px)");
        $("#barFrame, #scatterFrame, #radarFrame").delay(300).slideDown();
    });
    $("#closeAll").click(function() {
        $("#barFrame, #scatterFrame, #radarFrame").slideUp();
        $(".introHeader, .introText").slideDown();
        $("#iconBar").removeClass("goUpDown");
        $("#banner").removeClass("blurIt");
        $(".iconCap").css("color", "darkslategray");
    });

    $("#barImg").click(function() {
        $("#scatterFrame, #radarFrame").slideUp();
        $("#barFrame").css("transform", "translateY(-550px)");
        $("#barFrame").delay(600).slideDown();
    });
    $("#scImg").click(function() {
        $("#barFrame, #radarFrame").slideUp();
        $("#scatterFrame").css("transform", "translateY(-300px)");
        $("#scatterFrame").delay(600).slideDown();
    });
    $("#radarImg").click(function() {
        $("#barFrame, #scatterFrame").slideUp();
        $("#radarFrame").delay(600).slideDown();
    });
    $("#selAll").click(function() {
        $("[type='checkbox']", "#checBoxes").each(function() { this.checked = true; });
    });
    $("#selNo").click(function() {
        $("[type='checkbox']", "#checBoxes").each(function() { this.checked = false; });
    });
    if (window.innerWidth < 768) {
        $("#openAll").click(function() {
            $("#radarFrame").css("transform", "translateY(50px)");
            $("#scatterFrame").css("transform", "translateY(70px)");
            $("#barFrame").css("transform", "translateY(100px)");
            $("#barFrame, #scatterFrame, #radarFrame").delay(300).slideDown();
        });
    } else {

    }
});