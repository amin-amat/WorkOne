//GLOBALS
var map;
var map2;
var base_url = "http://ip-api.com/json/";
var markers = [];

// GET JSON DATA 
function getMyLocation() {
	"use strict";
    $("#geoLocationContainer").css('display','block');
    $("#map-canvas-user").css('visibility','visible');
    $(".round").css('height','660px');
    $.ajax({
		type : 'GET',
		url : base_url,
		//url : 'http://freegeoip.net/json/',
		success : function(response){
			updateLocationDetails(response);
		}
	});
}

// PARSES DATA FROM JSON URL; ASSIGN TO DESIGNATED LOCATION FOR DISPLAY
function updateLocationDetails(data){
	var now = new Date();

	$("#location_query").html(data.query);
	$("#location_country").html(data.country);
	$("#location_regionName").html(data.regionName);
	$("#location_city").html(data.city);
	$("#location_timezone").html(data.timezone);
	$("#location_lat").html(data.lat);
	$("#location_lon").html(data.lon);

	var userLat = data.lat;
    var userLong = data.lon;
    var myLatlng = new google.maps.LatLng(userLat,userLong);
    map.panTo(myLatlng);
    map.setZoom(18);
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(userLat,userLong)
        });
markers.push(marker);
	$("table").removeClass("empty");
	$(".help").click(function(e){
		var fieldName = $(e.currentTarget).closest('tr').find('.field_name').text();
		alert("This is your " + fieldName + " from ISP " + data.isp + " at " + now);
	});
}

// GET JSON DATA FROM URL INPUTTED
function getMyLocation2() {
	$("#geoLocationContainer2").css('display','block');
	$("#map-canvas-host").css('visibility','visible');
	$(".round2").css('height','660px');
	url = urlLocate.value;
	//Clean up url
    

	//create variables for use
	//urlinput = ;
	//base_url ="http://freegeoip.net/json/";
	host_url = base_url + url;
	//url has been exorcised, lets being getting the json data
	$.ajax({
		type : 'GET',
		//url : 'http://ip-api.com/json/',
		url : host_url,
		success : function(response){
			updateLocationDetails2(response);
		}
	});
}

// HOST SEARCH -- PARSES DATA FROM JSON URL; ASSIGNS TO DESIGNATED LOCATION FOR DISPLAY
function updateLocationDetails2(data){

	var now = new Date();

	$("#location_query2").html(data.query);
	$("#location_country2").html(data.country);
	$("#location_regionName2").html(data.regionName);
	$("#location_city2").html(data.city);
	$("#location_timezone2").html(data.timezone);
	$("#location_lat2").html(data.lat);
	$("#location_lon2").html(data.lon);

	var hostLat = data.lat;
    var hostLong = data.lon;
    var myLatlng = new google.maps.LatLng(hostLat,hostLong);
    map2.panTo(myLatlng);
    map2.setZoom(18);
    var marker = new google.maps.Marker({
        map: map2,
        position: new google.maps.LatLng(hostLat,hostLong)
        });
    markers.push(marker);
	$("table").removeClass("empty");
	$(".help2").click(function(e){
		var fieldName = $(e.currentTarget).closest('tr').find('.field_name').text();
		alert("This is your " + fieldName + " from ISP " + data.isp + " at " + now);
	});
}

// RESETS ON SCREEN DATA
function resetLocationDetails() {
	updateLocationDetails({
		query: "0.0.0.0",
		country: "",
		regionName: "",
		city: "",
		timezone: "",
		lat: "",
		lon: ""
	});
		var myLatlng = new google.maps.LatLng(40.259401, -96.967198);
            map.setCenter(myLatlng);
            map.setZoom(3);
        resetMarkers();
	$("table").addClass('empty');
	$("#geoLocationContainer").css('display','none');
	$("#map-canvas-user").css('visibility','hidden');
	$("#block1").css('height','100px').animate();
}

function resetLocationDetails2() {
	updateLocationDetails2({
		query: "0.0.0.0",
		country: "",
		regionName: "",
		city: "",
		timezone: "",
		lat: "",
		lon: ""
	});
	var myLatlng = new google.maps.LatLng(40.259401, -96.967198);
            map2.setCenter(myLatlng);
            map2.setZoom(3);
           resetMarkers();
	$("table").addClass('empty');
	$("#geoLocationContainer2").css('display','none');
	$("#map-canvas-host").css('visibility','hidden');
	$("#block2").css('height','100px').animate();
}


function resetMarkers() {
	for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
   markers = [];
   
}

//INITIALIZES THE USER SEARCH WINDOW DISPLAY
function initializePage(){
	window.indexTemplate = $('#index').html();
	window.locationTemplate = $('#locationInfo').html();

	window.indexTemplate = Handlebars.compile(window.indexTemplate);
	window.locationTemplate = Handlebars.compile(window.locationTemplate);

	$("#mainContent").html(window.indexTemplate());
	$("#geoLocationContainer").html(window.locationTemplate({
		id: 0,
		query: "0.0.0.0",
		country: "",
		regionName: "",
		city: "",
		timezone: "",
		lat: "",
		lon: ""
	}));
}
//INITIALIZES THE HOST SEARCH WINDOW DISPLAY
function initializePageTwo(){
	window.indexTemplate = $('#index2').html();
	window.locationTemplate = $('#locationInfo2').html();

	window.indexTemplate = Handlebars.compile(window.indexTemplate);
	window.locationTemplate = Handlebars.compile(window.locationTemplate);

	$("#mainContent2").html(window.indexTemplate());
	$("#geoLocationContainer2").html(window.locationTemplate({
		id: 0,
		query: "0.0.0.0",
		country: "",
		regionName: "",
		city: "",
		timezone: "",
		lat: "",
		lon: ""
	}));
}

//INITIALIZE THE GOOGLE MAPS API AND DISPLAY ON PAGE; CENTERED ON WORLD
function initializeMaps() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(40.259401, -96.967198);
  var mapOptions = {
    zoom: 1,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById('map-canvas-user'), mapOptions);
  map2 = new google.maps.Map(document.getElementById('map-canvas-host'), mapOptions);
}

//ONCE ALL IS READY START RUNNING THE SCRIPTS
$(document).ready(function(){
	initializePage();
	initializePageTwo();
	initializeMaps();
	$("#geoLocationContainer").css('display','none');
	$("#map-canvas-user").css('visibility','hidden');
	$("#geoLocationContainer2").css('display','none');
	$("#map-canvas-host").css('visibility','hidden');
});
