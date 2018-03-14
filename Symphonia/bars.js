var selectOption = "Danceability";

var myBarConfig = {
    type: "bar",
    plotarea: {
        adjustLayout: true
    },
    plot: {
        tooltip: {
            // this sets the flag for scroll-over text
            text: "%kl <br />" + selectOption + " = %vt.",
            "font-family": "font-family: 'Quicksand', sans-serif;"
        }
    },
    scaleX: {
        label: {
            text: "Song Names",
            "font-family": "font-family: 'Quicksand', sans-serif;"
        },

        // this will hold our x axis names eventually
        labels: [],

        // lets x axis things overlap
        itemsOverlap: true,

        // change the number of names on x axis
        maxItems: 20,

        // change font angle and size
        item: {
            "font-angle": -30,
            "font-size": 12,
            "font-family": "font-family: 'Quicksand', sans-serif;"
        }
    },
    scaleY: {
        label: {
            text: "Values",
            "font-family": "font-family: 'Quicksand', sans-serif;"
        }
    },
    series: [{

    }]
};
// call to render the chart
zingchart.render({
    id: 'myBarChart',
    data: myBarConfig,
    height: '100%',
    width: '100%'
});

// holds the names for the x axis, and  and enery values (here's where you can add more features)
var names = [];

var danceability = [];
var energy = [];
var key = [];
var loudness = [];
var mode = [];
var speechiness = [];
var acousticness = [];
var instrumentalness = [];
var liveness = [];
var valence = [];
var tempo = [];
var duration = [];
var time = [];
var dictionary = {};
var data;

d3.csv("song_data.csv", function(error, data) {
    if (error) throw error;
    for (var row in data) {
        var list = [];
        for (var item in data[row]) {
            list.push(data[row][item]);
        }
        // other x axis placement styles
        // names.push (list[1].slice(0,50));
        // names.push (list[1].slice(0,50) + " " + list[2]);
        names.push("<strong style='color: midnightblue;'>" + list[1].slice(0, 50) + " </strong>" + "<br><strong>" + list[2] + "</strong>");

        // get values from csv and add them to the feature list
        danceability.push(parseFloat(list[3]));
        energy.push(parseFloat(list[4]));
        key.push(parseFloat(list[5]));
        loudness.push(parseFloat(list[6]));
        mode.push(parseFloat(list[7]));
        speechiness.push(parseFloat(list[8]));
        acousticness.push(parseFloat(list[9]));
        instrumentalness.push(parseFloat(list[10]));
        liveness.push(parseFloat(list[11]));
        valence.push(parseFloat(list[12]));
        tempo.push(parseFloat(list[13]));
        duration.push(parseFloat(list[14]));
        time.push(parseFloat(list[15]));

        // set a dictionary of name to list
        dictionary[list[1]] = list;
    }
    names.pop();

    // set X labels
    myBarConfig.scaleX.labels = names;
    myBarConfig.series = [{
        values: danceability
    }];

    // call to render the chart
    zingchart.render({
        id: 'myBarChart',
        data: myBarConfig,
        height: '100%',
        width: '100%'
    });
});

// -----------Dropdown-----------

// function updateSong(selection) {

//     // get selection
//     var x = document.getElementById("mySelect").selectedIndex;
//     var y = document.getElementsByTagName("option")[x].value;
//     selectOption = y;
//     // alert(selectOption + " is a " + typeof selectOption);

//     // Change chart according to selection
//     switch (selectOption) {
//         case "danceability":
//             myBarConfig.series = [{
//                 values: danceability
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Danceability = %vt.";
//             break;
//         case "energy":
//             myBarConfig.series = [{
//                 values: energy
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Energy = %vt.";
//             break;
//         case "key":
//             myBarConfig.series = [{
//                 values: key
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Key = %vt.";
//             break;
//         case "loudness":
//             myBarConfig.series = [{
//                 values: loudness
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Loudness = %vt.";
//             break;
//         case "mode":
//             myBarConfig.series = [{
//                 values: mode
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Mode = %vt.";
//             break;
//         case "speechiness":
//             myBarConfig.series = [{
//                 values: speechiness
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Speechiness = %vt.";
//             break;
//         case "acousticness":
//             myBarConfig.series = [{
//                 values: acousticness
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Acousticness = %vt.";
//             break;
//         case "instrumentalness":
//             myBarConfig.series = [{
//                 values: instrumentalness
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Instrumentalness = %vt.";
//             break;
//         case "liveness":
//             myBarConfig.series = [{
//                 values: liveness
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Liveness = %vt.";
//             break;
//         case "valence":
//             myBarConfig.series = [{
//                 values: valence
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Valence = %vt.";
//             break;
//         case "tempo":
//             myBarConfig.series = [{
//                 values: tempo
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Tempo = %vt.";
//             break;
//         case "duration":
//             myBarConfig.series = [{
//                 values: duration
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Duration = %vt ms.";
//             break;
//         case "time":
//             myBarConfig.series = [{
//                 values: time
//             }];
//             myBarConfig.plot.tooltip.text = "%kl <br /> Time Sign = %vt.";
//             break;
//     }

//     // This is a jQuery animation to add the 'fade' effect on the transitions. It is currently
//     // disabled but just remove the /* */ style comments them to enable and check out...

//     /* $("#myBarChart").fadeOut("fast").fadeIn("fast");
//        $(document).ready(function($) {
//     		setTimeout(function() { */
//     zingchart.render({
//         id: 'myBarChart',
//         data: myBarConfig,
//         height: '100%',
//         width: '100%'
//     });
/*     }, 200);
  }); */

// }

// ------------------------------

// -----------Buttons------------

var i = 0;

// Function triggered on clicking 'previous' button
$("#prev").on('click', function() {
    var featureList = [danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration, time];
    var featureListStr = ["Danceability", "Energy", "Key", "Loudness", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo", "Duration", "Time Sign"];

    if (i <= 0) {
        i = featureList.length;
    }

    $("#featName").html(featureListStr[i - 1]);

    myBarConfig.series = [{
        values: featureList[i - 1]
    }];
    myBarConfig.plot.tooltip.text = "%kl <br />" + featureListStr[i - 1] + " = %vt.";

    i--;

    zingchart.render({
        id: 'myBarChart',
        data: myBarConfig,
        height: '100%',
        width: '100%'
    });
});

// Funtion triggered on clicking 'next' button
$("#next").on('click', function() {
    var featureList = [danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration, time];
    var featureListStr = ["Danceability", "Energy", "Key", "Loudness", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo", "Duration (in ms)", "Time Sign"];

    if (i >= featureList.length - 1) {
        i = -1;
    }

    $("#featName").html(featureListStr[i + 1]);

    myBarConfig.series = [{
        values: featureList[i + 1]
    }];
    myBarConfig.plot.tooltip.text = "%kl <br /> " + featureListStr[i + 1] + " = %vt.";

    i++;

    zingchart.render({
        id: 'myBarChart',
        data: myBarConfig,
        height: '100%',
        width: '100%'
    });
});