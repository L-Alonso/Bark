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
// begin park name search on button click
$("#search-btn").click(function() {
    var searchInput = searchParkEl.val();
    parkSearch(searchInput);
});