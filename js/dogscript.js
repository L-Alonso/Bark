// globlal variables
var searchParkEl = $("#park-search");
var natParkNameEl = $("#nat-park-name");
var natParkInfoEl = $("#nat-park-info");
var natParkDescEl = $("#nat-park-description");
var mapEl = $("#map-container");
var natParkUrl = $("#nps-website");
var searchBtn = $("#search-btn");
var searchPanel = $("#search-panel");
var selectedPark = null;
var map = null;
var npsApiKey = "BccmWNanuJv5sB3a6yzsSqXUZVNxkR7YdgC6BACq";
var mapApiKey = "AIzaSyA6PPvRcVtW9IYbZoNZHRNLzv369862KVs";
var searchDogParkEl = $("#dog-park-search")
var dogParkNameEl = $("#dog-park-name")
var dogParkDescEl = $("#dog-park-description")
var dogParkUrl = $("#google-website")
var dogParkInfoEl = $("#dog-park-info")

// get latitude and longitude from NPS api for google map to reference
function initMap(lat, lng) {
    mapEl.show();
    map = new google.maps.Map(document.getElementById("nat-park-map"), {
        center: { lat: lat, lng: lng },
        zoom: 8,
    });
}
// display fetched NPS info and google map
function showParkInfo() {
    natParkInfoEl.show();
    natParkNameEl.text(selectedPark.fullName);
    natParkDescEl.text(selectedPark.description);
    natParkUrl.attr("href", selectedPark.url);
    initMap(Number(selectedPark.latitude), Number(selectedPark.longitude));
}
// clear search result
function clearSearchResults() {
    $(".search-result").remove();
}
// create new div for each search result 
function addSearchResult(result) {
    var searchResult = $("<div>");
    searchResult.addClass("panel-block search-result");
    var searchResultBtn = $("<button>");
    searchResultBtn.addClass("button is-white");
    searchResultBtn.text(result.fullName);
    searchResult.append(searchResultBtn);
    searchPanel.append(searchResult);
    searchResultBtn.click(function() {
        selectedPark = result;
        showParkInfo();
        clearSearchResults();
    })
}

// search for park names in NPS api
function parkSearch(parkName) {
    var apiUrl = "https://developer.nps.gov/api/v1/parks?q=" + parkName + "&api_key=" + npsApiKey;
    fetch(apiUrl).then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(results) {
                    console.log(results);
                    for (i = 0; i < results.data.length; i++) {
                        addSearchResult(results.data[i]);
                    }
                });
            } else {
                console.log("Received unexpected response: " + response.status);
            }
        })
        .catch(function(error) {
            console.error(error);
        });
}

//search for dog park names in Google api
function dogParkSearch(dogPark) {
    var parkUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json
    ?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry
    &input=${dogPark}
    &inputtype=textquery
    &key=${mapApiKey}`;
    fetch(parkUrl).then(function(response) {
        // request was succesful

        if (response.ok) {
            response.json().then(function(results) {
                console.log(results);
                for (i = 0; i < results.data.length; i++) {
                    addSearchResult(results.data[i]);
                }
            });
        } else {
            console.log("Received unexpected response: " + response.status);
        }
    })
    .catch(function(error) {
        console.error(error);
    });

}
// display fetched google info and google map (dog park)
function showDogParkInfo() {
    dogParkInfoEl.show();
    dogParkNameEl.text(selectedPark.fullName);
    dogParkDescEl.text(selectedPark.description);
    dogParkUrl.attr("href", selectedPark.url);
    initMap(Number(selectedPark.latitude), Number(selectedPark.longitude));
}
// clear search result
function clearSearchResults() {
    $(".search-result").remove();
}
// create new div for each search result (dog park)
function addSearchResult(result) {
    var searchResult = $("<div>");
    searchResult.addClass("panel-block search-result");
    var searchResultBtn = $("<button>");
    searchResultBtn.addClass("button is-white");
    searchResultBtn.text(result.fullName);
    searchResult.append(searchResultBtn);
    searchPanel.append(searchResult);
    searchResultBtn.click(function() {
        selectedPark = result;
        showParkInfo();
        clearSearchResults();
    })
}

// begin park name search on button click
$("#search-btn").click(function() {
    var searchInput = searchParkEl.val();
    dogParkSearch(searchInput);
});

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