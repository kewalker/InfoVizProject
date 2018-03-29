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
    "font-family": "'Quicksand', sans-serif",
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
var namesFormated = [];
var justNames = [];


var sortedDance = [];
var sortedEnergy = [];
var sortedKey = [];
var sortedLoud = [];
var sortedMode = [];
var sortedSpeech = [];
var sortedAcous = [];
var sortedInstru = [];
var sortedLive = [];
var sortedVale = [];
var sortedTempo = [];
var sortedDura = [];
var sortedTime = [];

var danceNames = [];
var energyNames = [];
var keyNames = [];
var loudNames = [];
var modeNames = [];
var speechNames = [];
var acoustNames = [];
var instrumeNames = [];
var valNames = [];
var liveNames = [];
var tempoNames = [];
var duraNames = [];
var timeNames = [];

// function sortEm(datazz) {
//     datazz.sort(function(a, b) { return a - b; });
// }

d3.csv("song_data.csv", function(error, data) {
    if (error) throw error;
    for (var row in data) {
        var list = [];
        for (var item in data[row]) {
            list.push(data[row][item]);
        }
        // other x axis placement styles
        justNames.push(list[1].slice(0, 50));
        // names.push (list[1].slice(0,50) + " " + list[2]);
        names.push(list[1].slice(0, 50) + " by " + list[2]);
        namesFormated.push("<strong style='color: midnightblue;'>" + list[1].slice(0, 50) + " </strong>" + "<br><strong>" + list[2] + "</strong>");

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
        // alert("List: " + list);
    }
    names.pop();
    namesFormated.pop();

    // The ultimate Super Sorter! -------------------------------
    for (var i = 0; i < names.length; i++) {
        sortedDance.push({
            song: namesFormated[i],
            feature: danceability[i]
        });
        sortedEnergy.push({
            song: namesFormated[i],
            feature: energy[i]
        });
        sortedKey.push({
            song: namesFormated[i],
            feature: key[i]
        });
        sortedLoud.push({
            song: namesFormated[i],
            feature: loudness[i]
        });
        sortedMode.push({
            song: namesFormated[i],
            feature: mode[i]
        });
        sortedSpeech.push({
            song: namesFormated[i],
            feature: speechiness[i]
        });
        sortedAcous.push({
            song: namesFormated[i],
            feature: acousticness[i]
        });
        sortedInstru.push({
            song: namesFormated[i],
            feature: instrumentalness[i]
        });
        sortedLive.push({
            song: namesFormated[i],
            feature: liveness[i]
        });
        sortedVale.push({
            song: namesFormated[i],
            feature: valence[i]
        });
        sortedTempo.push({
            song: namesFormated[i],
            feature: tempo[i]
        });
        sortedDura.push({
            song: namesFormated[i],
            feature: duration[i]
        });
        sortedTime.push({
            song: namesFormated[i],
            feature: time[i]
        });
    }
    // alert("Ressss: " + sortedDance[78].song);

    sortedDance.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedEnergy.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedKey.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedLoud.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedMode.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedSpeech.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedAcous.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedInstru.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedVale.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedTempo.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedDura.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedTime.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    sortedLive.sort(function(a, b) { return (a.feature > b.feature) ? 1 : ((b.feature > a.feature) ? -1 : 0); });
    // alert("Ressss: " + sortedDance[78].song);

    for (var ji = 0; ji < sortedDance.length; ji++) {
        danceNames[ji] = sortedDance[ji].song;
        energyNames[ji] = sortedEnergy[ji].song;
        keyNames[ji] = sortedKey[ji].song;
        loudNames[ji] = sortedLoud[ji].song;
        modeNames[ji] = sortedMode[ji].song;
        speechNames[ji] = sortedSpeech[ji].song;
        acoustNames[ji] = sortedAcous[ji].song;
        instrumeNames[ji] = sortedInstru[ji].song;
        valNames[ji] = sortedVale[ji].song;
        liveNames[ji] = sortedLive[ji].song;
        tempoNames[ji] = sortedTempo[ji].song;
        duraNames[ji] = sortedDura[ji].song;
        timeNames[ji] = sortedTime[ji].song;

        danceability[ji] = sortedDance[ji].feature;
        energy[ji] = sortedEnergy[ji].feature;
        key[ji] = sortedKey[ji].feature;
        loudness[ji] = sortedLoud[ji].feature;
        mode[ji] = sortedMode[ji].feature;
        speechiness[ji] = sortedSpeech[ji].feature;
        acousticness[ji] = sortedAcous[ji].feature;
        instrumentalness[ji] = sortedInstru[ji].feature;
        valence[ji] = sortedVale[ji].feature;
        liveness[ji] = sortedLive[ji].feature;
        tempo[ji] = sortedTempo[ji].feature;
        duration[ji] = sortedDura[ji].feature;
        time[ji] = sortedTime[ji].feature;
    }

    // Super Sorter Ends here! --------------------------------------------------

    // alert(xc[7] + " ANND " + xxc[7]);

    // set X labels
    myBarConfig.scaleX.labels = danceNames;
    myBarConfig.series = [{
        values: danceability
    }];


    // call to render the chart
    zingchart.render({
        id: 'myBarChart',
        data: myBarConfig,
        "font-family": "'Quicksand', sans-serif",
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
    var sortedNames = [danceNames, energyNames, keyNames, loudNames, modeNames, speechNames, acoustNames, instrumeNames, valNames, liveNames, tempoNames, duraNames, timeNames];
    // var feArr = [sortedDance, sortedEnergy, sortedKey, sortedLoud, sortedMode, sortedSpeech, sortedAcous, sortedInstru, sortedLive, sortedVale, sortedTempo, sortedDura, sortedTime];
    var featureList = [danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration, time];
    var featureListStr = ["Danceability", "Energy", "Key", "Loudness", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo", "Duration", "Time Sign"];

    if (i <= 0) {
        i = featureList.length;
    }

    $("#featName").html(featureListStr[i - 1]);

    myBarConfig.scaleX.labels = sortedNames[i - 1];
    myBarConfig.series = [{
        values: featureList[i - 1]
    }];
    myBarConfig.plot.tooltip.text = "%kl <br />" + featureListStr[i - 1] + " = %vt.";

    i--;

    $("#myBarChart").fadeOut("fast").fadeIn("fast");
    $(document).ready(function() {
        setTimeout(function() {
            zingchart.render({
                id: 'myBarChart',
                data: myBarConfig,
                height: '100%',
                width: '100%'
            });
        }, 200);
    });
    // zingchart.render({
    //     id: 'myBarChart',
    //     data: myBarConfig,
    //     "font-family": "'Quicksand', sans-serif",
    //     height: '100%',
    //     width: '100%'
    // });
});

// Funtion triggered on clicking 'next' button
$("#next").on('click', function() {
    var sortedNames = [danceNames, energyNames, keyNames, loudNames, modeNames, speechNames, acoustNames, instrumeNames, valNames, liveNames, tempoNames, duraNames, timeNames];
    // var feArr = [sortedDance, sortedEnergy, sortedKey, sortedLoud, sortedMode, sortedSpeech, sortedAcous, sortedInstru, sortedLive, sortedVale, sortedTempo, sortedDura, sortedTime];
    var featureList = [danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration, time];
    var featureListStr = ["Danceability", "Energy", "Key", "Loudness", "Mode", "Speechiness", "Acousticness", "Instrumentalness", "Liveness", "Valence", "Tempo", "Duration (in ms)", "Time Sign"];

    if (i >= featureList.length - 1) {
        i = -1;
    }

    $("#featName").html(featureListStr[i + 1]);

    myBarConfig.scaleX.labels = sortedNames[i + 1];
    myBarConfig.series = [{
        values: featureList[i + 1]
    }];
    myBarConfig.plot.tooltip.text = "%kl <br /> " + featureListStr[i + 1] + " = %vt.";

    i++;

    $("#myBarChart").fadeOut("fast").fadeIn("fast");
    $(document).ready(function() {
        setTimeout(function() {
            zingchart.render({
                id: 'myBarChart',
                data: myBarConfig,
                height: '100%',
                width: '100%'
            });
        }, 200);
    });
});