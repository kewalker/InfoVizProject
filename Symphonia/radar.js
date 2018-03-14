var dictionary = {};

var max_duration = 0;
var min_duration = Number.POSITIVE_INFINITY;

var max_tempo = 0;
var min_tempo = Number.POSITIVE_INFINITY;

var data;

var first_song_name_and_artist;

d3.csv("song_data.csv", function(error, data) {
    if (error) throw error;
    // <!-- console.log (data); -->

    var catOptions1 = "<option>Select First Song</option>";
    var catOptions2 = "<option>Select Second Song</option>";
    for (var row in data) {
        var list = [];

        for (var item in data[row]) {
            // <!-- console.log (data[row][item]) -->
            list.push(data[row][item]);
            // <!-- console.log ('oi'); -->
            // <!-- console.log (list); -->
        }
        // <!-- console.log (list[1]); -->
        dictionary[list[1]] = list.slice(0, 100);

        catOptions1 += "<option>" + data[row]['name'] + "</option>";
        catOptions2 += "<option>" + data[row]['name'] + "</option>";

    }
    document.getElementById("song").innerHTML = catOptions1;
    document.getElementById("song2").innerHTML = catOptions2;
});



//console.log (data);

var myConfig = {
    type: 'radar',
    title: {
        text: "",
        "font-family": "font-family: 'Quicksand', sans-serif;"
    },
    // <!-- refresh: { -->
    // <!-- interval: 1}, -->
    // <!-- csv: { -->
    // <!-- url: './zingchart/song_data.csv', -->
    // <!-- "vertical-labels":true, -->
    // <!-- "smart-scales":true, -->
    // <!-- "horizontal-labels":true -->
    //   <!-- }, -->

    plot: {
        aspect: 'area',
        animation: {
            effect: 3,
            sequence: 1,
            speed: 700
        }
    },
    scaleV: {
        values: "0:100:5",
        visible: true,
        "font-family": "font-family: 'Quicksand', sans-serif;"
    },
    scaleK: {
        // <!-- values: '0:11:1', -->
        values: '0:9:1',
        // <!-- labels: ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'duration_ms', 'time_signature'], -->
        // <!-- labels: ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'duration_ms', 'time_signature'], -->
        labels: ['Danceability', 'Energy', 'Loudness', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence', 'Tempo', 'Duration (in ms)'],
        item: {
            fontColor: '#607D8B',
            "font-family": "font-family: 'Quicksand', sans-serif;",
            backgroundColor: "white",
            borderColor: "#aeaeae",
            borderWidth: 1,
            padding: '5px 15px',
            borderRadius: 100
        },
        refLine: {
            lineColor: '#c10000'
        },
        tick: {
            lineColor: '#59869c',
            lineWidth: 2,
            lineStyle: 'dotted',
            size: 20
        },
        guide: {
            lineColor: "#607D8B",
            lineStyle: 'solid',
            alpha: 0.3,
            backgroundColor: "#c5c5c5 #718eb4"
        }
    },
    series: [{
        // <!-- values: [100, 90, 80, 70, 60, 50, 100, 50, 60, 70, 80, 90, 100], -->
        // <!-- text: 'farm' -->
        backgroundColor: "#377eb8",
        "font-family": "font-family: 'Quicksand', sans-serif;"
    }, {
        // <!-- values: [20, 20, 54, 41, 41, 35], -->
        // <!-- lineColor: '#53a534', -->
        backgroundColor: '#689F38',
        "font-family": "font-family: 'Quicksand', sans-serif;"
    }]
};

zingchart.render({
    id: 'myRadarChart',
    data: myConfig,
    height: "100%",
    width: "100%"
});

/**
 * After 5 seconds update the url/refresh
 * the graph using setdata
 */
// <!-- setTimeout(function() { -->
//   <!-- myConfig.csv.url = './zingchart/song_data.csv' -->

// ZingChart API setdata will upload a new JSON packet
// to the chart
//   <!-- zingchart.exec('myRadarChart', 'setdata', { -->
// <!-- data: myConfig -->
//   <!-- }); -->
// <!-- }, 5000); -->

/**
 * Every minute refresh the chart
 */
// <!-- setInterval(function() { -->
//   <!-- zingchart.exec('myRadarChart', 'reload'); -->
// <!-- }, 5000); -->


function updateSong1(selection) {

    // <!-- get selection -->
    var song_to_select = selection.options[selection.selectedIndex].text;

    // <!-- update min and max duration once -->
    if (max_duration == 0) {

        for (var key in dictionary) {
            if (dictionary[key][14] > max_duration && dictionary[key][14] != "duration_ms") {
                max_duration = dictionary[key][14]
            }

            if (dictionary[key][14] < min_duration && dictionary[key][14] != "duration_ms") {
                min_duration = dictionary[key][14]
            }
            if (parseFloat(dictionary[key][13]) > max_tempo && dictionary[key][13] != "tempo") {
                max_tempo = parseFloat(dictionary[key][13])
            }

            if (parseFloat(dictionary[key][13]) < min_tempo && dictionary[key][13] != "tempo") {
                min_tempo = parseFloat(dictionary[key][13])
            }
        }
    }

    console.log(max_tempo);
    console.log(min_tempo);

    if (song_to_select != "Select a Song") {
        // <!-- update chart to reflect selected name and artist -->

        first_song_name_and_artist = 'Song 1: <strong style="color: lightblue">' + dictionary[song_to_select][1] + '</strong> by <strong>' + dictionary[song_to_select][2] + '</strong>\n is compared with \n';
        myConfig.title.text = first_song_name_and_artist;

        var temp = myConfig.series.pop();

        // <!-- id = [0], name = [1], artist = [2] -->
        myConfig.series = [{
            values: [
                // <!-- danceability -->
                dictionary[song_to_select][3] * 100,
                // <!-- energy -->
                dictionary[song_to_select][4] * 100,
                // <!-- key: normalized over 12 intervals -->
                // <!-- dictionary[song_to_select][5] / 12 * 100,  -->
                // <!-- loudness: look at normalizing a % -->
                parseFloat(dictionary[song_to_select][6]) + 100,
                // <!-- mode: only over 0 or 1 -->
                // <!-- dictionary[song_to_select][7]*100,  -->
                // <!-- speechiness -->
                dictionary[song_to_select][8] * 100,
                // <!-- acousticness -->
                dictionary[song_to_select][9] * 100,
                // <!-- instrumentalness -->
                dictionary[song_to_select][10] * 100,
                // <!-- liveness -->
                dictionary[song_to_select][11] * 100,
                // <!-- valence -->
                dictionary[song_to_select][12] * 100,
                // <!-- tempo: look at normalizing -->
                parseFloat(dictionary[song_to_select][13]) / max_tempo * 100,
                // <!-- duration: converted from millisecs to secs -->
                (dictionary[song_to_select][14] - min_duration) / (max_duration - min_duration) * 100,
                // <!-- dictionary[song_to_select][14]/max_duration * 100, -->
                // <!-- time_signature: normalized over [0,4] -->
                // <!-- dictionary[song_to_select][15] / 4 * 100,  -->
            ],
            // <!-- },  -->
            // <!-- { -->
            // <!-- values: [20, 20, 54, 41, 41, 35], -->
            // <!-- lineColor: '#53a534', -->
            // <!-- backgroundColor: '#689F38' -->
        }];

        myConfig.series.push(temp);
        // <!-- console.log(dictionary[song_to_select][13]); -->
        // <!-- console.log(typeof dictionary[song_to_select][13]) -->

    } else {
        // <!-- set to default -->
        myConfig.title.text = "";
        myConfig.series = [{
            values: []
        }];
    }

    zingchart.render({
        id: 'myRadarChart',
        data: myConfig,
        height: '100%',
        width: '100%'
    });

}

function updateSong2(selection) {

    // <!-- get selection -->
    var song_to_select = selection.options[selection.selectedIndex].text;

    // <!-- update min and max duration once -->
    if (max_duration == 0) {

        for (var key in dictionary) {
            if (dictionary[key][14] > max_duration && dictionary[key][14] != "duration_ms") {
                max_duration = dictionary[key][14]
            }

            if (dictionary[key][14] < min_duration && dictionary[key][14] != "duration_ms") {
                min_duration = dictionary[key][14]
            }
            if (parseFloat(dictionary[key][13]) > max_tempo && dictionary[key][13] != "tempo") {
                max_tempo = parseFloat(dictionary[key][13])
            }

            if (parseFloat(dictionary[key][13]) < min_tempo && dictionary[key][13] != "tempo") {
                min_tempo = parseFloat(dictionary[key][13])
            }
        }
    }



    if (song_to_select != "Select a Song to Compare") {
        // <!-- update chart to reflect selected name and artist -->
        // <!-- how to update the title for comparisons... -->
        myConfig.title.text = first_song_name_and_artist + 'Song 2: <strong style="color: indianred">' + dictionary[song_to_select][1] + '</strong> by <strong>' + dictionary[song_to_select][2] + '</strong>';
        if (myConfig.series.length != 1) {
            myConfig.series = myConfig.series.slice(0, -1);
        }

        // <!-- id = [0], name = [1], artist = [2] -->
        myConfig.series.push({
            values: [
                // <!-- danceability -->
                dictionary[song_to_select][3] * 100,
                // <!-- energy -->
                dictionary[song_to_select][4] * 100,
                // <!-- key: normalized over 12 intervals -->
                // <!-- dictionary[song_to_select][5] / 12 * 100,  -->
                // <!-- loudness: look at normalizing a % -->
                parseFloat(dictionary[song_to_select][6]) + 100,
                // <!-- mode: only over 0 or 1 -->
                // <!-- dictionary[song_to_select][7]*100,  -->
                // <!-- speechiness -->
                dictionary[song_to_select][8] * 100,
                // <!-- acousticness -->
                dictionary[song_to_select][9] * 100,
                // <!-- instrumentalness -->
                dictionary[song_to_select][10] * 100,
                // <!-- liveness -->
                dictionary[song_to_select][11] * 100,
                // <!-- valence -->
                dictionary[song_to_select][12] * 100,
                // <!-- tempo: look at normalizing -->
                parseFloat(dictionary[song_to_select][13]) / max_tempo * 100,
                // <!-- duration: converted from millisecs to secs -->
                (dictionary[song_to_select][14] - min_duration) / (max_duration - min_duration) * 100,
                // <!-- dictionary[song_to_select][14]/max_duration * 100, -->
            ],
        });

        console.log(dictionary[song_to_select][13]);
        console.log(typeof dictionary[song_to_select][13])

    } else {
        // <!-- set to default -->
        myConfig.title.text = "";
        myConfig.series = myConfig.series.slice(0, -1);
    }

    zingchart.render({
        id: 'myRadarChart',
        data: myConfig,
        height: '100%',
        width: '100%'
    });

}