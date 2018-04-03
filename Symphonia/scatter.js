var myScatterConfig = {
    "type": "mixed",
    plotarea: {
        adjustLayout: true
    },
    scaleX: {
        label: {
            text: "Name of Song",
            "font-family": "'Quicksand', sans-serif"
        },
        // <!-- this will hold our x axis names eventually -->
        labels: [],
        // <!-- lets x axis things overlap -->
        itemsOverlap: true,
        // <!-- change the number of names on x axis -->
        maxItems: 20,
        // <!-- change font angle and size -->
        item: {
            "font-angle": -45,
            "font-size": 10,
            "font-family": "'Quicksand', sans-serif"
        }
    },



    series: []
};

//    <!-- lists for data -->
var names = [];

var danceability = [];
var dance_avg = 0;
var dance_avg_list = [];
var dance_min = Number.POSITIVE_INFINITY;
var dance_max = 0;

var energy = [];
var energy_avg = 0;
var energy_avg_list = [];
var energy_min = Number.POSITIVE_INFINITY;
var energy_max = 0;

var key = [];
var key_avg = 0;
var key_avg_list = [];

var loudness = [];
var loudness_avg = 0;
var loudness_avg_list = [];
var loudness_min = Number.POSITIVE_INFINITY;
var loudness_max = Number.NEGATIVE_INFINITY;

var mode = [];
var mode_avg = 0;
var mode_avg_list = [];

var speechiness = [];
var speechiness_avg = 0;
var speechiness_avg_list = [];
var speechiness_min = Number.POSITIVE_INFINITY;
var speechiness_max = 0;

var acousticness = [];
var acousticness_avg = 0;
var acousticness_avg_list = [];
var acousticness_min = Number.POSITIVE_INFINITY;
var acousticness_max = 0;

var instrumentalness = [];
var instrumentalness_avg = 0;
var instrumentalness_avg_list = [];
var instrumentalness_min = Number.POSITIVE_INFINITY;
var instrumentalness_max = 0;

var liveness = [];
var liveness_avg = 0;
var liveness_avg_list = [];
var liveness_min = Number.POSITIVE_INFINITY;
var liveness_max = 0;

var valence = [];
var valence_avg = 0;
var valence_avg_list = [];
var valence_min = Number.POSITIVE_INFINITY;
var valence_max = 0;

var tempo = [];
var tempo_avg = 0;
var tempo_avg_list = [];
var tempo_min = Number.POSITIVE_INFINITY;
var tempo_max = 0;

var duration = [];
var duration_avg = 0;
var duration_avg_list = [];
var duration_min = Number.POSITIVE_INFINITY;
var duration_max = 0;

var time_signature = [];
var time_signature_avg = 0;
var time_signature_avg_list = [];

var dictionary = {};
var data;

// <!-- document.getElementById("danceability").style.color = "#ff0000"; -->

d3.csv("song_data_pop.csv", function(error, data) {
    if (error) throw error;

    for (var row in data) {
        var list = [];

        for (var item in data[row]) {
            list.push(data[row][item]);
        }
        // <!-- other x axis placement styles -->
        // <!-- names.push (list[1].slice(0,50)); -->
        // <!-- names.push (list[1].slice(0,50) + " " + list[2]); -->
        names.push("<strong style='color: midnightblue'>" + list[1].slice(0, 50) + "</strong><strong>" + "<br>" + list[2] + "</strong>");

        // <!-- get values from csv and add them to the feature list -->
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
        time_signature.push(parseFloat(list[15]));

        // <!-- set a dictionary of name to list -->
        dictionary[list[1]] = list;

    }

    // <!-- set x labels -->
    myScatterConfig.scaleX.labels = names;

    getMinMax();
    normalize();

    setAvg(danceability, dance_avg, dance_avg_list);
    setAvg(energy, energy_avg, energy_avg_list);
    setAvg(key, key_avg, key_avg_list);
    setAvg(loudness, loudness_avg, loudness_avg_list);
    setAvg(mode, mode_avg, mode_avg_list);
    setAvg(speechiness, speechiness_avg, speechiness_avg_list);
    setAvg(acousticness, acousticness_avg, acousticness_avg_list);
    setAvg(instrumentalness, instrumentalness_avg, instrumentalness_avg_list);
    setAvg(liveness, liveness_avg, liveness_avg_list);
    setAvg(valence, valence_avg, valence_avg_list);
    setAvg(tempo, tempo_avg, tempo_avg_list);
    setAvg(duration, duration_avg, duration_avg_list);
    setAvg(time_signature, time_signature_avg, time_signature_avg_list);

    myScatterConfig.series = [{}];

    // <!-- call to render the chart -->
    zingchart.render({
        id: 'myScatterChart',
        data: myScatterConfig,
        height: "90%",
        width: "100%"
    });
});

function getMinMax() {
    for (var key in dictionary) {
        if (parseFloat(dictionary[key][6]) > loudness_max && dictionary[key][6] != "loudness") {
            loudness_max = parseFloat(dictionary[key][6]);
        }
        if (parseFloat(dictionary[key][6]) < loudness_min && dictionary[key][6] != "loudness") {
            loudness_min = parseFloat(dictionary[key][6]);
        }
        if (parseFloat(dictionary[key][14]) > duration_max && dictionary[key][14] != "duration_ms") {
            duration_max = parseFloat(dictionary[key][14]);
        }
        if (parseFloat(dictionary[key][14]) < duration_min && dictionary[key][14] != "duration_ms") {
            duration_min = parseFloat(dictionary[key][14]);
        }
        if (parseFloat(dictionary[key][13]) > tempo_max && dictionary[key][13] != "tempo") {
            tempo_max = parseFloat(dictionary[key][13]);
        }

        if (parseFloat(dictionary[key][13]) < tempo_min && dictionary[key][13] != "tempo") {
            tempo_min = parseFloat(dictionary[key][13]);
        }
    }
}

function normalize() {
    console.log("in here");
    loudness = [];
    tempo = [];
    duration = [];
    // <!-- energy.push(parseFloat(list[4])); -->
    for (var key in dictionary) {
        dictionary[key][6] = (parseFloat(dictionary[key][6]) - loudness_min) / (loudness_max - loudness_min);
        dictionary[key][13] = (parseFloat(dictionary[key][13]) - tempo_min) / (tempo_max - tempo_min);
        dictionary[key][14] = (parseFloat(dictionary[key][14]) - duration_min) / (duration_max - duration_min);
        loudness.push(dictionary[key][6]);
        tempo.push(dictionary[key][13]);
        duration.push(dictionary[key][14]);
    }
}

function setAvg(feature, feature_avg, feature_avg_list) {
    for (i = 0; i < feature.length; i++) {
        if (!isNaN(feature[i])) {
            feature_avg += feature[i];
            // <!-- console.log (dance_avg); -->
        }

    }
    feature_avg = parseFloat(parseFloat(feature_avg) / parseFloat(feature.length));
    feature_avg = Math.round(feature_avg * 1000) / 1000;

    for (i = 0; i < feature.length; i++) {
        feature_avg_list.push(feature_avg);
    }
}


// <!-- setInterval(function() { -->
//   <!-- zingchart.exec('myScatterChart', 'reload'); -->
//   <!-- updateFeature(); -->
// <!-- }, 2000); -->

// <!-- trying button here -->
function updateFeature() {

    myScatterConfig.series = [{}];

    var dance_selected = document.getElementById("danceability").checked;
    var energy_selected = document.getElementById("energy").checked;
    var loudness_selected = document.getElementById("loudness").checked;
    var speechiness_selected = document.getElementById("speechiness").checked;
    var acousticness_selected = document.getElementById("acousticness").checked;
    var instrumentalness_selected = document.getElementById("instrumentalness").checked;
    var liveness_selected = document.getElementById("liveness").checked;
    var valence_selected = document.getElementById("valence").checked;
    var tempo_selected = document.getElementById("tempo").checked;
    var duration_selected = document.getElementById("duration").checked;

    if (dance_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: danceability,
            text: "Danceability",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#377eb8",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Danceability = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: dance_avg_list,
            aspect: "spline",
            text: "Line Chart",
            "font-family": "'Quicksand', sans-serif",
            lineColor: "#377eb8",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Danceability: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }

    if (energy_selected) {
        myScatterConfig.series.push({

                type: "scatter",
                values: energy,
                text: "Energy",
                "font-family": "'Quicksand', sans-serif",
                marker: {
                    backgroundColor: "#e41a1c",
                },
                tooltip: {
                    text: "%kl<br>Energy = %vt.",
                    "font-family": "'Quicksand', sans-serif"
                }

            },

            {
                type: "line",
                values: energy_avg_list,
                aspect: "spline",
                text: "Line Chart",
                lineColor: "#e41a1c",
                "font-family": "'Quicksand', sans-serif",
                marker: {
                    visible: false
                },
                tooltip: {
                    // <!-- visible: "false" -->
                    alpha: 0.5,
                    text: "Average Energy: %v",
                    "font-family": "'Quicksand', sans-serif"
                }

            })
    }

    if (loudness_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: loudness,
            text: "Loudness",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#4daf4a",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Loudness = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: loudness_avg_list,
            aspect: "spline",
            text: "Line Chart",
            lineColor: "#4daf4a",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Loudness: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }

    if (acousticness_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: acousticness,
            text: "Acoustiness",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#984ea3",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Acoustiness = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: acousticness_avg_list,
            aspect: "spline",
            text: "Line Chart",
            lineColor: "#984ea3",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Acousticness: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }

    if (speechiness_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: speechiness,
            text: "Speechiness",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#ff7f00",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Speechiness = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: speechiness_avg_list,
            aspect: "spline",
            text: "Line Chart",
            "font-family": "'Quicksand', sans-serif",
            lineColor: "#ff7f00",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Speechiness: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }

    if (instrumentalness_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: instrumentalness,
            text: "Instrumentalness",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#daa520",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Instrumentalness = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: instrumentalness_avg_list,
            aspect: "spline",
            "font-family": "'Quicksand', sans-serif",
            text: "Line Chart",
            lineColor: "#daa520",
            marker: {
                visible: false
            },
            tooltip: {
                text: "Average Instrumentalness: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }


    if (liveness_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: liveness,
            text: "Liveness",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#a65628",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Liveness = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: liveness_avg_list,
            aspect: "spline",
            text: "Line Chart",
            lineColor: "#a65628",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Liveness: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }



    if (valence_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: valence,
            text: "Valence",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#f781bf",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Valence = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: valence_avg_list,
            aspect: "spline",
            "font-family": "'Quicksand', sans-serif",
            text: "Line Chart",
            lineColor: "#f781bf",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Valence: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }

    if (tempo_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            "font-family": "'Quicksand', sans-serif",
            values: tempo,
            text: "Tempo",
            marker: {
                backgroundColor: "#6a3d9a",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Tempo = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: tempo_avg_list,
            aspect: "spline",
            text: "Line Chart",
            "font-family": "'Quicksand', sans-serif",
            lineColor: "#6a3d9a",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Tempo: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }

    if (duration_selected) {
        myScatterConfig.series.push({
            type: "scatter",
            values: duration,
            text: "Duration",
            "font-family": "'Quicksand', sans-serif",
            marker: {
                backgroundColor: "#696969",
            },
            tooltip: {
                // <!-- this sets the flag for scroll-over text -->
                text: "%kl<br>Duration = %vt.",
                "font-family": "'Quicksand', sans-serif"
            },
        }, {
            type: "line",
            values: tempo_avg_list,
            aspect: "spline",
            text: "Line Chart",
            "font-family": "'Quicksand', sans-serif",
            lineColor: "#696969",
            marker: {
                visible: false
            },
            tooltip: {
                alpha: 0.5,
                text: "Average Duration: %v",
                "font-family": "'Quicksand', sans-serif"
            }
        })
    }


    $("#myScatterChart").fadeOut("fast").fadeIn("fast");
    $(document).ready(function() {
        setTimeout(function() {
            zingchart.render({
                id: 'myScatterChart',
                data: myScatterConfig,
                height: '100%',
                width: '100%'
            });
        }, 200);
    });

}



// <!-- nothing below here is used but I left it to check dictionary access or whatever else -->
// function updateSong(selection) {

//     // <!-- get selection -->
//     var song_to_select = selection.options[selection.selectedIndex].text;
//     // <!-- update min and max duration once -->
//     if (max_duration == 0) {

//         for (var key in dictionary) {
//             if (dictionary[key][14] > max_duration && dictionary[key][14] != "duration_ms") {
//                 max_duration = dictionary[key][14]
//             }

//             if (dictionary[key][14] < min_duration && dictionary[key][14] != "duration_ms") {
//                 min_duration = dictionary[key][14]
//             }
//             if (parseFloat(dictionary[key][13]) > max_tempo && dictionary[key][13] != "tempo") {
//                 max_tempo = parseFloat(dictionary[key][13])
//             }

//             if (parseFloat(dictionary[key][13]) < min_tempo && dictionary[key][13] != "tempo") {
//                 min_tempo = parseFloat(dictionary[key][13])
//             }
//         }
//     }

//     // <!-- console.log (max_tempo); -->
//     // <!-- console.log (min_tempo); -->

//     if (song_to_select != "Select a Song") {
//         // <!-- update chart to reflect selected name and artist -->
//         myScatterConfig.title.text = dictionary[song_to_select][1] + '\nby\n' + dictionary[song_to_select][2];

//         // <!-- id = [0], name = [1], artist = [2] -->
//         myScatterConfig.series = [{
//             values: [
//                     // <!-- danceability -->
//                     dictionary[song_to_select][3] * 100,
//                     // <!-- energy -->
//                     dictionary[song_to_select][4] * 100,
//                     // <!-- key: normalized over 12 intervals -->
//                     dictionary[song_to_select][5] / 12 * 100,
//                     // <!-- loudness: look at normalizing a % -->
//                     parseFloat(dictionary[song_to_select][6]) + 100,
//                     // <!-- mode: only over 0 or 1 -->
//                     dictionary[song_to_select][7] * 100,
//                     // <!-- speechiness -->
//                     dictionary[song_to_select][8] * 100,
//                     // <!-- acousticness -->
//                     dictionary[song_to_select][9] * 100,
//                     // <!-- instrumentalness -->
//                     dictionary[song_to_select][10] * 100,
//                     // <!-- liveness -->
//                     dictionary[song_to_select][11] * 100,
//                     // <!-- valence -->
//                     dictionary[song_to_select][12] * 100,
//                     // <!-- tempo: look at normalizing -->
//                     parseFloat(dictionary[song_to_select][13]) / max_tempo * 100,
//                     // <!-- duration: converted from millisecs to secs -->
//                     // <!-- (dictionary[song_to_select][14]-min_duration)/(max_duration - min_duration) * 100,  -->
//                     dictionary[song_to_select][14] / max_duration * 100,
//                     // <!-- time_signature: normalized over [0,4] -->
//                     dictionary[song_to_select][15] / 4 * 100,
//                 ]
//                 // <!-- },  -->
//                 // <!-- { -->
//                 // <!-- values: [20, 20, 54, 41, 41, 35], -->
//                 // <!-- lineColor: '#53a534', -->
//                 // <!-- backgroundColor: '#689F38' -->
//         }];

//         // <!-- console.log(dictionary[song_to_select][13]); -->
//         // <!-- console.log(typeof dictionary[song_to_select][13]) -->

//     } else {
//         // <!-- set to default -->
//         myScatterConfig.title.text = "";
//         myScatterConfig.series = [{
//             values: []
//         }];
//     }

//     // <!-- re-render chart after values updated -->
//     // <!-- re-render chart after values updated -->
//     zingchart.render({
//         id: 'myScatterChart',
//         data: myScatterConfig,
//         height: '100%',
//         width: '100%'
//     });

// }