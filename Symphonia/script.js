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
    if (window.innerWidth < 991) {
        // Introduction Div
        $(".SText").html('<div style="cursor: pointer"><div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden" id="SContent"><div class="my-3 py-3"><h2 class="display-5">ScatterPlot</h2><p class="lead">Compare different features of all songs</p></div><div class="bg-light box-shadow mx-auto" style="background: white !important; width: 80%; height: 300px; border-radius: 21px 21px 0 0; overflow:hidden"><img src="Symphonia/scatterplotEdit.png" width="650" height="auto"></div></div></div>');
        $("#frontS").html('Lorem Ipsum is the single greatest threat. We are not - we are not keeping up with other websites. Lorem Ipsum best not make any more threats to your website. It will be met with fire and fury like the world has never seen. Does everybody know that pignamed Lorem Ipsum? An ‘extremely credible source’ has called my office and told me that Barack Obama’s placeholder text is a fraud. Click the image to browse');
    } else {
        $("#frontS").html('<div style="cursor: pointer"><div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden" id="SContent"><div class="my-3 py-3"><h2 class="display-5">ScatterPlot</h2><p class="lead">Compare different features of all songs</p></div><div class="bg-light box-shadow mx-auto" style="background: white !important; width: 80%; height: 300px; border-radius: 21px 21px 0 0; overflow:hidden"><img src="Symphonia/scatterplotEdit.png" width="650" height="auto"></div></div></div>');
        $(".SText").html('Lorem Ipsum is the single greatest threat. We are not - we are not keeping up with other websites. Lorem Ipsum best not make any more threats to your website. It will be met with fire and fury like the world has never seen. Does everybody know that pignamed Lorem Ipsum? An ‘extremely credible source’ has called my office and told me that Barack Obama’s placeholder text is a fraud. Click the image to browse');
    }
});
