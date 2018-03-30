var win;

var dictionary = {};

var max_duration = 0;
var min_duration = Number.POSITIVE_INFINITY;

var max_tempo = 0;
var min_tempo = Number.POSITIVE_INFINITY;

var max_loudness = Number.NEGATIVE_INFINITY;
var min_loudness = Number.POSITIVE_INFINITY;

var data;

var first_song_name_and_artist;

var demo = true;
var second_song = true;

var selected_song;
var selected_song2;

var similar_list = [];
var similar_selection = 0;

d3.csv("song_data_pop.csv", function(error, data) {
    if (error) throw error;
    // <!-- console.log (data); -->

    var catOptions1 = "<option>Select a Song</option>";
    var catOptions2 = "<option>Select a Song to Compare</option>";
    for (var row in data) {
        var list = [];
        for (var item in data[row]) {
            list.push(data[row][item]);
        }
        // <!-- console.log (list[1]); -->
        // console.log (list);
        if (list[1] != "name") {
            dictionary[list[1]] = list;

            catOptions1 += "<option>" + data[row]['name'] + "</option>";
            catOptions2 += "<option>" + data[row]['name'] + "</option>";
        }



    }
    document.getElementById("song").innerHTML = catOptions1;
    document.getElementById("song2").innerHTML = catOptions2;

    // <!-- update min and max duration once -->
    if (max_duration == 0) {

        for (var key in dictionary) {
            if (parseFloat(dictionary[key][14]) > max_duration && dictionary[key][14] != "duration_ms") {
                max_duration = parseFloat(dictionary[key][14])
            }

            if (parseFloat(dictionary[key][14]) < min_duration && dictionary[key][14] != "duration_ms") {
                min_duration = parseFloat(dictionary[key][14])
            }
            if (parseFloat(dictionary[key][13]) > max_tempo && dictionary[key][13] != "tempo") {
                max_tempo = parseFloat(dictionary[key][13])
            }

            if (parseFloat(dictionary[key][13]) < min_tempo && dictionary[key][13] != "tempo") {
                min_tempo = parseFloat(dictionary[key][13])
            }
            if (parseFloat(dictionary[key][6]) > max_loudness && dictionary[key][6] != "loudness") {
                max_loudness = parseFloat(dictionary[key][6])
            }

            if (parseFloat(dictionary[key][6]) < min_loudness && dictionary[key][6] != "loudness") {
                min_loudness = parseFloat(dictionary[key][6])
            }

        }
    }

    myConfig.series = [{
        values: [
            // <!-- danceability -->
            parseFloat(dictionary["Shape of You"][3]),
            // <!-- energy -->
            parseFloat(dictionary["Shape of You"][4]),
            // <!-- key: normalized over 12 intervals -->
            // <!-- dictionary[song_to_select][5] / 12 * 100,  -->
            // <!-- loudness: look at normalizing a % -->
            (parseFloat(dictionary["Shape of You"][6]) - min_loudness) / (max_loudness - min_loudness),
            // <!-- mode: only over 0 or 1 -->
            // <!-- dictionary[song_to_select][7]*100,  -->
            // <!-- speechiness -->
            parseFloat(dictionary["Shape of You"][8]),
            // <!-- acousticness -->
            parseFloat(dictionary["Shape of You"][9]),
            // <!-- instrumentalness -->
            parseFloat(dictionary["Shape of You"][10]),
            // <!-- liveness -->
            parseFloat(dictionary["Shape of You"][11]),
            // <!-- valence -->
            parseFloat(dictionary["Shape of You"][12]),
            // <!-- tempo: look at normalizing -->
            (parseFloat(dictionary["Shape of You"][13]) - min_tempo) / (max_tempo - min_tempo),
            // <!-- duration: converted from millisecs to secs -->
            (parseFloat(dictionary["Shape of You"][14]) - min_duration) / (max_duration - min_duration)
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

    first_song_name_and_artist = 'Song 1: <strong style="color: lightblue">' + dictionary["Shape of You"][1] + '</strong> by <strong>' + dictionary["Shape of You"][2] + "</strong>\nis compared with";
    myConfig.title.text = first_song_name_and_artist;


    zingchart.render({
        id: 'myRadarChart',
        data: myConfig,
        height: "100%",
        width: "100%",
    });


});



//console.log (data);

var myConfig = {
    type: 'radar',
    title: {
        "font-family": "'Quicksand', sans-serif",
        text: ""
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
        values: "0:1:0.05",
        "font-family": "'Quicksand', sans-serif",
        visible: true
    },
    scaleK: {
        // <!-- values: '0:11:1', -->
        values: '0:9:1',
        "font-family": "'Quicksand', sans-serif",
        // <!-- labels: ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'duration_ms', 'time_signature'], -->
        // <!-- labels: ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'duration_ms', 'time_signature'], -->
        labels: ['Danceability', 'Energy', 'Loudness', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence', 'Tempo', 'Duration (in ms)'],
        item: {
            fontColor: '#607D8B',
            backgroundColor: "white",
            borderColor: "#aeaeae",
            "font-family": "'Quicksand', sans-serif",
            borderWidth: 1,
            padding: '5 10',
            borderRadius: 10
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
    }, {
        // <!-- values: [20, 20, 54, 41, 41, 35], -->
        // <!-- lineColor: '#53a534', -->
        backgroundColor: '#689F38',
    }]
};

zingchart.render({
    id: 'myRadarChart',
    "font-family": "'Quicksand', sans-serif",
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

    //window.open("https://p.scdn.co/mp3-preview/18f2a704083cc69612e54165b0afeba18aa9462e?cid=5e7e6827cb774fe1bb25da3028491839");

    // <!-- get selection -->
    var song_to_select = selection.options[selection.selectedIndex].text;
    selected_song = selection.options[selection.selectedIndex].text;

    similar_list = [];
    similar_selection = 0;


    if (song_to_select != "Select a Song") {
        // <!-- update chart to reflect selected name and artist -->



        first_song_name_and_artist = 'Song 1: <strong style="color: lightblue">' + dictionary[song_to_select][1] + '</strong> by <strong>' + dictionary[song_to_select][2] + '</strong>\n is compared with ';
        myConfig.title.text = first_song_name_and_artist;

        var temp = myConfig.series.pop();

        // <!-- id = [0], name = [1], artist = [2] -->
        myConfig.series = [{
            values: [
                // <!-- danceability -->
                parseFloat(dictionary[song_to_select][3]),
                // <!-- energy -->
                parseFloat(dictionary[song_to_select][4]),
                // <!-- key: normalized over 12 intervals -->
                // <!-- dictionary[song_to_select][5] / 12 * 100,  -->
                // <!-- loudness: look at normalizing a % -->
                (parseFloat(dictionary[song_to_select][6]) - min_loudness) / (max_loudness - min_loudness),
                // <!-- mode: only over 0 or 1 -->
                // <!-- dictionary[song_to_select][7]*100,  -->
                // <!-- speechiness -->
                parseFloat(dictionary[song_to_select][8]),
                // <!-- acousticness -->
                parseFloat(dictionary[song_to_select][9]),
                // <!-- instrumentalness -->
                parseFloat(dictionary[song_to_select][10]),
                // <!-- liveness -->
                parseFloat(dictionary[song_to_select][11]),
                // <!-- valence -->
                parseFloat(dictionary[song_to_select][12]),
                // <!-- tempo: look at normalizing -->
                (parseFloat(dictionary[song_to_select][13]) - min_tempo) / (max_tempo - min_tempo),
                // <!-- duration: converted from millisecs to secs -->
                (parseFloat(dictionary[song_to_select][14]) - min_duration) / (max_duration - min_duration)
                // <!-- dictionary[song_to_select][14]/max_duration * 100, -->
                // <!-- time_signature: normalized over [0,4] -->
                // <!-- dictionary[song_to_select][15] / 4 * 100,  -->
            ],
            "font-family": "'Quicksand', sans-serif"
                // <!-- },  -->
                // <!-- { -->
                // <!-- values: [20, 20, 54, 41, 41, 35], -->
                // <!-- lineColor: '#53a534', -->
                // <!-- backgroundColor: '#689F38' -->
        }];

        if (Boolean(demo)) {
            //console.log("hiya");
        } else {
            if (Boolean(second_song)) {

            } else {
                myConfig.series.push(temp);
            }


        }
        demo = false;


        // <!-- console.log(dictionary[song_to_select][13]); -->
        // <!-- console.log(typeof dictionary[song_to_select][13]) -->

    } else {
        // <!-- set to default -->
        myConfig.title.text = "";
        myConfig.series = [{
            values: [],
            "font-family": "'Quicksand', sans-serif"
        }];
    }

    zingchart.render({
        id: 'myRadarChart',
        data: myConfig,
        height: '100%',
        width: '100%',
        "font-family": "'Quicksand', sans-serif"
    });

}

function updateSong2(selection) {
    second_song = false;


    // <!-- get selection -->
    var song_to_select = selection.options[selection.selectedIndex].text;
    selected_song2 = selection.options[selection.selectedIndex].text;

    if (song_to_select != "Select a Song to Compare") {
        // <!-- update chart to reflect selected name and artist -->
        // <!-- how to update the title for comparisons... -->
        myConfig.title.text = first_song_name_and_artist + '\nSong 2: <strong style="color: indianred">' + dictionary[song_to_select][1] + '</strong> by <strong>' + dictionary[song_to_select][2] + '</strong>';
        if (myConfig.series.length != 1) {
            myConfig.series = myConfig.series.slice(0, -1);
        }

        // <!-- id = [0], name = [1], artist = [2] -->
        myConfig.series.push({
            values: [
                // <!-- danceability -->
                parseFloat(dictionary[song_to_select][3]),
                // <!-- energy -->
                parseFloat(dictionary[song_to_select][4]),
                // <!-- key: normalized over 12 intervals -->
                // <!-- dictionary[song_to_select][5] / 12 * 100,  -->
                // <!-- loudness: look at normalizing a % -->
                (parseFloat(dictionary[song_to_select][6]) - min_loudness) / (max_loudness - min_loudness),
                // <!-- mode: only over 0 or 1 -->
                // <!-- dictionary[song_to_select][7]*100,  -->
                // <!-- speechiness -->
                parseFloat(dictionary[song_to_select][8]),
                // <!-- acousticness -->
                parseFloat(dictionary[song_to_select][9]),
                // <!-- instrumentalness -->
                parseFloat(dictionary[song_to_select][10]),
                // <!-- liveness -->
                parseFloat(dictionary[song_to_select][11]),
                // <!-- valence -->
                parseFloat(dictionary[song_to_select][12]),
                // <!-- tempo: look at normalizing -->
                (parseFloat(dictionary[song_to_select][13]) - min_tempo) / (max_tempo - min_tempo),
                // <!-- duration: converted from millisecs to secs -->
                (parseFloat(dictionary[song_to_select][14]) - min_duration) / (max_duration - min_duration)
                // <!-- dictionary[song_to_select][14]/max_duration * 100, -->
                // <!-- time_signature: normalized over [0,4] -->
                // <!-- dictionary[song_to_select][15] / 4 * 100,  -->
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


function findSomethingSimilar() {

    // if (similar_list.length < 6) {
    //append
    var most_similar_name;
    var most_similar = Number.POSITIVE_INFINITY;

    if (selected_song == null) {
        return;
    } else {
        for (var key in dictionary) {
            difference = 0;
            // console.log (dictionary[key][1]);

            difference += Math.pow((parseFloat(dictionary[selected_song][3]) - parseFloat(dictionary[key][3])), 2)
            difference += Math.pow((parseFloat(dictionary[selected_song][4]) - parseFloat(dictionary[key][4])), 2)
            difference += Math.pow((((parseFloat(dictionary[selected_song][6]) - min_loudness) / (max_loudness - min_loudness)) - (parseFloat(dictionary[key][6]) - min_loudness) / (max_loudness - min_loudness)), 2)
            difference += Math.pow((parseFloat(dictionary[selected_song][8]) - parseFloat(dictionary[key][8])), 2)
            difference += Math.pow((parseFloat(dictionary[selected_song][9]) - parseFloat(dictionary[key][9])), 2)
            difference += Math.pow((parseFloat(dictionary[selected_song][10]) - parseFloat(dictionary[key][10])), 2)
            difference += Math.pow((parseFloat(dictionary[selected_song][11]) - parseFloat(dictionary[key][11])), 2)
            difference += Math.pow((parseFloat(dictionary[selected_song][12]) - parseFloat(dictionary[key][12])), 2)
            difference += Math.pow((((parseFloat(dictionary[selected_song][13]) - min_tempo) / (max_tempo - min_tempo)) - (parseFloat(dictionary[key][13]) - min_tempo) / (max_tempo - min_tempo)), 2)
            difference += Math.pow((((parseFloat(dictionary[selected_song][14]) - min_duration) / (max_duration - min_duration)) - (parseFloat(dictionary[key][14]) - min_duration) / (max_duration - min_duration)), 2)

            // console.log ("key:" + key);
            similar_list.sort(function(a, b) {
                return a[0] - b[0];
            });

            // console.log ("difference: " + difference);
            // console.log ("key:" + key);    

            if (similar_list.length < 5 && key != selected_song) {
                similar_list.push([difference, key]);
            } else {
                for (i = 0; i < similar_list.length; i++) {
                    // console.log ("difference: " + difference);
                    // console.log ("key:" + key);
                    // console.log ("similar_list[i[0]]" + similar_list[i[0]]);
                    // console.log (similar_list);
                    if (difference < similar_list[i][0] && key != selected_song && !containsObject([difference, key], similar_list)) {
                        // console.log ("HUH?");

                        for (j = similar_list.length; j > i; j--) {
                            similar_list[j] = similar_list[j - 1];
                        }
                        similar_list[i] = [difference, key];

                        break;
                    }
                }
            }

            // if (difference < most_similar && key != selected_song) {
            // most_similar = difference;
            // most_similar_name = key;
            // }

        }
    }
    // }



    // console.log ("most_similar_name:" + most_similar_name);
    // console.log ("difference: " + most_similar);
    most_similar_name = similar_list[similar_selection][1];
    console.log("most_similar_name:" + most_similar_name);

    myConfig.title.text = first_song_name_and_artist + " a similar song\n Song 2: <strong style='color: indianred'>" + dictionary[most_similar_name][1] + '</strong> by ' + dictionary[most_similar_name][2];
    if (myConfig.series.length != 1) {
        myConfig.series = myConfig.series.slice(0, -1);
    }

    // <!-- id = [0], name = [1], artist = [2] -->
    myConfig.series.push({
        values: [
            // <!-- danceability -->
            parseFloat(dictionary[most_similar_name][3]),
            // <!-- energy -->
            parseFloat(dictionary[most_similar_name][4]),
            // <!-- key: normalized over 12 intervals -->
            // <!-- dictionary[song_to_select][5] / 12 * 100,  -->
            // <!-- loudness: look at normalizing a % -->
            (parseFloat(dictionary[most_similar_name][6]) - min_loudness) / (max_loudness - min_loudness),
            // <!-- mode: only over 0 or 1 -->
            // <!-- dictionary[song_to_select][7]*100,  -->
            // <!-- speechiness -->
            parseFloat(dictionary[most_similar_name][8]),
            // <!-- acousticness -->
            parseFloat(dictionary[most_similar_name][9]),
            // <!-- instrumentalness -->
            parseFloat(dictionary[most_similar_name][10]),
            // <!-- liveness -->
            parseFloat(dictionary[most_similar_name][11]),
            // <!-- valence -->
            parseFloat(dictionary[most_similar_name][12]),
            // <!-- tempo: look at normalizing -->
            (parseFloat(dictionary[most_similar_name][13]) - min_tempo) / (max_tempo - min_tempo),
            // <!-- duration: converted from millisecs to secs -->
            (parseFloat(dictionary[most_similar_name][14]) - min_duration) / (max_duration - min_duration)
            // <!-- dictionary[song_to_select][14]/max_duration * 100, -->
            // <!-- time_signature: normalized over [0,4] -->
            // <!-- dictionary[song_to_select][15] / 4 * 100,  -->
        ],
    });

    similar_selection = (similar_selection + 1) % 5;


    zingchart.render({
        id: 'myRadarChart',
        data: myConfig,
        height: '100%',
        width: '100%'
    });

}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i][0] == obj[0] && list[i][1] == obj[1]) {
            return true;
        }
    }

    return false;
}

function playPreviewOne() {
    if (selected_song != null) {

        if (dictionary[selected_song][16] == -1) {
            alert("No preview available for this song =(");
        } else {
            win = window.open(dictionary[selected_song][16]);
        }
    }
}

function playPreviewTwo() {
    if (selected_song2 != null) {
        if (dictionary[selected_song2][16] == -1) {
            alert("No preview available for this song =(");
        } else {
            win = window.open(dictionary[selected_song2][16]);
        }
    }
}