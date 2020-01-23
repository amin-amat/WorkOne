$(document).ready(function() {
    "use strict";
    mobileCheck();
    checkUrlforjobID();
    runGeoLoc();
    var targetElem = document.querySelector('#location-container .select-selected');
    var observer = new MutationObserver(function(mutations) {
        countryDetect();
    });
    var config = {
        attributes: true
    };
    observer.observe(targetElem, config);
    var clickCount = 0;
    setTimeout(function e() {
        if ($("#query").val() !== "") {
          $('#query-search-container .clear-search-icon').show();
        } else {
          $('#query-search-container .clear-search-icon').hide();
        }
        setTimeout(e, 10);
    }, 10);
    $("#search-submit").on('click', function() {
        $('#query-search-container .clear-search-icon').show();
        $("#listings, #pagination").html('');
        startSearch();
    });
    $(document).on('keypress', function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            $('#query-search-container .clear-search-icon').show();
            $("#listings, #pagination").html('');
            startSearch();
        }
    });
    //  People Geek only jobs filter
    $("#peoplegeek").click(function() {
        //console.log(tempSource);
        clickCount++;
        //console.log(clickCount);
        if (clickCount == 1) {
            var listing = "";
            var DOMTarget = document.getElementById('listings');
            DOMTarget.innerHTML = "";
            for (key in tempSource) {
                var target = tempSource[key];
                if (target.geekjob == true) {
                    listing += "<div class='listing' data-key=" + target.url + ">";
                    listing += "<div class='listing-title'><h3>" + target.title + "</h3></div>";
                    listing += "<div class='listing-posting-date'><span class='time posted'>Posted " + target.date + "</span></div>";
                    listing += "<div class='listing-company-location'><span class='company'>" + target.company + "</span><span class='location'>" + target.location + "</span></div>";
                    listing += "<div class='listing-people-geek'><span class='peoplegeek'><img class='peoplegeek__icon' src='/wp-content/themes/CAJobBoard/images/glasses.svg' /> Posted by a People Geek</span></div>";
                    listing += "</div>";
                }
            }
            DOMTarget.innerHTML = listing;
        } else if (clickCount > 1) {
            setupDataNew(tempSource);
            //console.log('clicked more than once');
            clickCount = 0;
        }
        listingView();
    });
});
// global storage
var oneSource = {};
var tempSource = {};

function mobileCheck() {
  "use strict";
    var isMobile = window.matchMedia("only screen and (max-width: 799px)");
    //$.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    if (isMobile.matches) {
        $("#city-state").removeAttr('readonly onfocus');
    }
}

function checkUrlforjobID() {
    var currentURL = location.href;
    if (currentURL.match('jobID')) {
        listingView('external');
    }
}
// async api call function
async function getAPIData(url, callback) {
    $.getJSON(url).done(function(returndata) {
        callback(returndata);
    });
}
// get WP API data; store for later use
function runWPAPI(locale, category, city) {
    var wpAPI = '/wp-json/wp/v2/job-listings?per_page=100';
    getAPIData(wpAPI, function(returndata) {
        var data = returndata;
        for (key in data) {
            var jobCat = data[key]['job-categories'];
            var jobTitle = data[key].title.rendered;
            var jobLocation = data[key].fields._job_location;
            var jobCompany = data[key].fields._company_name;
            var jobSnippet = data[key].content.rendered;
            var jobDate = timeBetween(data[key].date_gmt);
            var jobCountry = data[key]._job_country;
            var jobUrl = data[key].id;
            if (city !== "" && typeof city !== 'undefined') {
                var cityQuery = city;
            } else {
                var cityQuery = jobLocation;
            }
            // run country check
            if (jobCountry.toUpperCase() == locale.toUpperCase()) {
                // if city labelled, run check
                if (cityQuery == jobLocation) {
                    // run category check
                    if (typeof category !== "undefined") {
                        for (i = 0; i < jobCat.length; i++) {
                            if (jobCat[i] == category) {
                                tempSource[Object.keys(tempSource).length] = {
                                    category: jobCat,
                                    title: jobTitle,
                                    location: jobLocation,
                                    country: jobCountry,
                                    company: jobCompany,
                                    snippet: jobSnippet,
                                    date: jobDate,
                                    url: jobUrl,
                                    geekjob: true
                                };
                            }
                        }
                    } else {
                        tempSource[Object.keys(tempSource).length] = {
                            category: jobCat,
                            title: jobTitle,
                            location: jobLocation,
                            country: jobCountry,
                            company: jobCompany,
                            snippet: jobSnippet,
                            date: jobDate,
                            url: jobUrl,
                            geekjob: true
                        };
                    }
                    // end category check
                }
            }
        }
    })
}
// gmt date conversion
function timeBetween(date1) {
    var one_second = 1000;
    var one_minute = 1000 * 60; // 60000
    var one_hour = 1000 * 60 * 60; // 36000000
    var one_day = 1000 * 60 * 60 * 24;
    var date = new Date(date1);
    var date_job = date.getTime();
    var date_server = new Date().getTime();
    var date_difference = date_server - date_job;
    if (date_difference > one_day) {
        var time = Math.round(date_difference / one_day);
        var time_final = time + ' days ago';
    } else if (date_difference < one_day) {
        if (date_difference < 0) {
            var time = Math.round(date_difference / -3600000);
            var time_final = time + ' hours ago';
        } else {
            var time = Math.round(date_difference / one_hour);
            var time_final = time + ' hours ago';
        }
    }
    return time_final;
}
// empty objects function
function cleanOut(target) {
    for (const prop of Object.getOwnPropertyNames(target)) {
        delete target[prop];
    }
}
// country detect for auto suggest
function countryDetect() {
    if ($("#location-container .select-selected").attr('data-value') !== undefined) {
        var geoLoc = $("#location-container .select-selected").attr('data-value');
        var cityState = $("#city-state-container");
        cityState.removeClass('hide-opacity');
        var pathURL = 'js/';
        cleanUpMatches();
        switch (geoLoc) {
            case 'us':
                var targetAPI = pathURL + 'locations_us.json';
                runCountryAPI(targetAPI);
                break;
            case 'gb':
                var targetAPI = pathURL + 'locations_uk.json';
                runCountryAPI(targetAPI);
                break;
            case 'au':
                var targetAPI = pathURL + 'locations_au.json';
                runCountryAPI(targetAPI);
                break;
            case 'ca':
                var targetAPI = pathURL + 'locations_ca.json';
                runCountryAPI(targetAPI);
                break;
            case 'dk':
                var targetAPI = pathURL + 'locations_dk.json';
                runCountryAPI(targetAPI);
                break;
            case 'fr':
                var targetAPI = pathURL + 'locations_fr.json';
                runCountryAPI(targetAPI);
                break;
            case 'se':
                var targetAPI = pathURL + 'locations_se.json';
                runCountryAPI(targetAPI);
                break;
            case 'ie':
                var targetAPI = pathURL + 'locations_uk.json';
                runCountryAPI(targetAPI);
                break;
            case 'il':
                var targetAPI = pathURL + 'locations_il.json';
                runCountryAPI(targetAPI);
                break;
            case 'nl':
                var targetAPI = pathURL + 'locations_nl.json';
                runCountryAPI(targetAPI);
                break;
            case 'no':
                var targetAPI = pathURL + 'locations_no.json';
                runCountryAPI(targetAPI);
                break;
            case 'sg':
                cityState.addClass('hide-opacity');
                break;
            case 'nz':
                var targetAPI = pathURL + 'locations_nz.json';
                runCountryAPI(targetAPI);
                break;
            case 'hk':
                cityState.addClass('hide-opacity');
                break;
        }
    }
}
// auto complete/suggest as you type functions
function runCountryAPI(targetAPI) {
    $.getJSON(targetAPI, function(data) {
        runAutoComplete(data);
    });
}

function runAutoComplete(data) {
    $("#city-state").on('input', function() {
        var val = $(this).val();
        if (val) {
            runStringMatch(val, data);
        } else {
            cleanUpMatches();
        }
    });

    function runStringMatch(val, data) {
        var targetLength = data.length;
        var suggestBox = document.getElementById('autocomplete');
        var suggestedmatches = "";
        //run thru each [i].city array and find matches
        for (i = 0; i < targetLength; i++) {
            var subTargetLength = data[i].city.length;
            for (j = 0; j < subTargetLength; j++) {
                //if match found, return to suggestion box the following
                if (data[i].city[j].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    //console.log( data[i].city[j].substr(0, val.length) + data[i].city[j].substr(val.length) );
                    suggestedmatches += "<div class='city-state' data-city='" + data[i].city[j] + "' data-state='" + data[i].state + "' data-match='" + data[i].city[j] + ", " + data[i].state + "'>";
                    suggestedmatches += "<strong>" + data[i].city[j].substr(0, val.length) + "</strong>" + data[i].city[j].substr(val.length) + ", " + data[i].state;
                    suggestedmatches += "</div>";
                }
            }
            suggestBox.innerHTML = suggestedmatches;
        }
        $(".city-state").on('click', function() {
            var city = $(this).attr('data-city');
            var state = $(this).attr('data-state');
            var match = $(this).attr('data-match');
            $("#city").val(city);
            $("#state").val(state);
            $("#city-state").val(match);
            cleanUpMatches();
        });
    }
}
//function to clean up suggestbox;
function cleanUpMatches() {
    var list = document.getElementById('autocomplete');
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}
// geoloc
function runGeoLoc() {
    $.get("https://api.ipify.org/?format=json", function(response) {
        var userIP = response.ip;
        var IPprep = userIP.toString();
        var countryCodeAPI = 'https://api.ipstack.com/' + userIP + '?access_key=XXXXXXXXX';
        $.get(countryCodeAPI, function(response) {
            var countryTarget = response.country_code;
            //var countryTarget = 'AU';
            var matchPrep = countryTarget.toLowerCase();
            $("#location-container .select-selected").attr('data-value', matchPrep);
            $("#location-container .select-items div[data-value=" + matchPrep + "]").addClass('same-as-selected');
            var updateCountryName = $("#location-container .select-items div[data-value=" + matchPrep + "]").html();
            $("#location-container .select-selected").html(updateCountryName);
            document.getElementById('location').value = matchPrep;
            var isMobile = window.matchMedia("only screen and (max-width: 600px)");
            if (!isMobile.matches) {
                defaultListings(matchPrep);
            }
        });
    });
}
// default listings
function defaultListings(locale) {
    var pageNum = 0;
    if (locale == 'dk' || locale == 'nl' || locale == 'no' || locale == 'se' || locale == 'il') {
        // var query = "diversity+OR+inclusion+OR+head+OR+talent+OR+people+OR+operations+OR+chief+OR+cpo+OR+human+OR+resources+OR+director+OR+acquisition+OR+hr+OR+vp+OR+chro+OR+officer+OR+culture+OR+d&i+OR+employee+OR+partner+OR+development+OR+relations+OR+management+OR+ops+OR+analytics+OR+insights+OR+sourcer+OR+recruiter+OR+recruiting";
        var query = 'Human+OR+hr+OR+people+OR+diversity+OR+talent';
    } else {
        var query = 'Human hr people diversity talent';
    }
    var category = document.getElementById('category').value;
    var firstrun = 'yes';
    doSearch(query, pageNum, locale);
}
// primary start search function
function startSearch() {
    // clear peoplegeek filter if checked
    if ($("#peoplegeek").is(":checked")) {
        $("#peoplegeek").prop("checked", false);
    }
    var query = document.getElementById('query').value;
    var locale = document.getElementById('location').value;
    var category = document.getElementById('category').value;
    var pageNum = 0;
    var queryCheck = filterOut(query);
    if (queryCheck == 'yes') {
        doSearch(query, pageNum, locale);
    } else {
        if (category !== "Category" && query == "") {
            var catOnly = 'yes';
            var query = catOnlySearchQuery(category);
            doSearch(query, pageNum, locale, category, catOnly);
        } else if (category == "Category" && query == "") {
            var matchPrep = document.getElementById('location').value;
            defaultListings(matchPrep);
        } else {
            //doSearch(query,pageNum,locale);
            noListingsCheck();
        }
    }
}

function filterOut(query) {
    //console.log(query);
    // see if query is a valid search term for board
    var hitCounter = 0;
    var filterList = ["People Analytics", "People operations", "Talent Acquisition", "Recruitment", "Sourcer", "Benefits", "Payroll", "Organizational Development", "Organisational Development", "OD", "CHRO", "Head of people", "Learning and Development", "Talent", "business partner", "human", "HR", "hr", "diversity", "Inclusion", "culture", "VP HR", "VP Human Resources", "HR Generalist", "Recruiter", "People", "Human Resources Director (HRD)", "VP of Human Resources", "Chief People Officer", "People Director", "People VP", "Group Head People", "General Manager People", "GM People", "Chief Culture Officer", "Culture Director", "Culture VP", "Head Culture", "Group Head Culture", "General Manager Culture", "GM Culture", "Chief Organisational Development Officer", "Organisational Development Director", "Organisational Development VP", "Head Organisational Development", "Group Head Organisational Development", "General Manager Organisational Development", "GM Organisational Development", "Chief Organizational Development Officer", "Organizational Development Director", "Organizational Development VP", "Head Organizational Development", "Group Head Organizational Development", "General Manager Organizational Development", "GM Organizational Development", "Learning and Development", "L&D", "Employee", "Employee Communication", "Employee Engagement", "Employee Relations", "Talent VP", "Talent Director", "Talent Acquisition", "National L&D Manager", "Senior HRBP", "HR Business Partner", "HRBP", "Employee Engagement Specialist", "People Operations Manager", "HR Operations and Analytics", "Employee Communication", "Director Employee Experience and Inclusion", "VP Employee Experience and Inclusion", "Head of Diversity and Inclusion", "Chief Diversity Officer", "HR Analyst", "People Operations Lead", "Workforce Director", "Learning Manager"];
    var check = filterList.find(function(target) {
        var targetUpdate = target.toUpperCase();
        var queryUpdate = query.toUpperCase();
        // if ( hitCounter !== 1 && targetUpdate.match(new RegExp(queryUpdate, "i")) ) {
        if (hitCounter !== 1 && queryUpdate.match(new RegExp(targetUpdate, "gi"))) {
            hitCounter++;
            return true;
        }
    });
    if (typeof check !== 'undefined') {
        return 'yes';
    } else {
        return 'no';
    }
}

function filterPassOne(query) {
    // see if query matches a no go word
    var queryUpdate = query.toUpperCase();
    var hitCounter = 0;
    var filterList = ["manager", "analyst", "consultant", "management", "assistant", "support", "project", "associate", "services", "business", "partner", "assistants", "generalist", "representative", "coordinator", "internship", "intern", "specialist", "workforce"];
    var check = filterList.find(function(target) {
        var targetUpdate = target.toUpperCase();
        if (hitCounter !== 1 && queryUpdate.match(new RegExp(targetUpdate, "gi"))) {
            //if ( hitCounter !== 1 && queryUpdate.match(targetUpdate) ) {
            //console.log(targetUpdate, queryUpdate);
            hitCounter++;
            return true;
        }
    });
    if (typeof check !== 'undefined') {
        return 'yes';
    } else {
        return 'no';
    }
}

function filterPassTwo(query) {
    // see if query matches a no go word
    var queryUpdate = query.toUpperCase();
    var hitCounter = 0;
    var filterList = ["People", "Talent", "Recruit", "Sourcer", "Benefits", "Payroll", "organization", "organizational", "organisation", "organizational", "CHRO", "L&D", "learning", "human", "resources", "diversity", "inclusion", "culture", "employee", "HRBP", "director"];
    var check = filterList.find(function(target) {
        var targetUpdate = target.toUpperCase();
        // if ( hitCounter !== 1 && targetUpdate.match(new RegExp(queryUpdate, "i")) ) {
        if (hitCounter !== 1 && queryUpdate.match(new RegExp(targetUpdate, "gi"))) {
            //console.log(targetUpdate, queryUpdate);
            hitCounter++;
            return true;
        }
    });
    if (typeof check !== 'undefined') {
        return 'yes';
    } else {
        return 'no';
    }
}
// category field query value
function catOnlySearchQuery(val) {
    var peopleOps = "human+resources+OR+hr+OR+people+OR+operations+OR+employee+OR+partner+OR+development+OR+relations+OR+talent+OR+management+OR+ops+OR+ organization+OR+organizational";
    var peopleAnalytics = "people+OR+analytics+OR+talent+OR+human+OR+insights+OR+organization+OR+organizational";
    var divInclu = "diversity inclusion organization organizational";
    var talent = "talent sourcer+OR+recruiter";
    var hrExec = "talent+OR+operations+OR+CPO+OR+human+OR+resources+OR+HR+OR+CHRO+OR+culture+OR+D&I+OR+diversity+OR+inclusion+OR+head+OR+Chief+OR+director+OR+VP+OR+officer";
    var allCat = "diversity+OR+inclusion+OR+head+OR+talent+OR+people+OR+operations+OR+chief+OR+cpo+OR+human+OR+resources+OR+director+OR+acquisition+OR+hr+OR+vp+OR+chro+OR+officer+OR+culture+OR+d&i+OR+diversity+OR+inclusion+OR+employee+OR+partner+OR+development+OR+relations+OR+talent+OR+management+OR+hr+OR+ops+OR+analytics+OR+recruiting+OR+insights+OR+talent+OR+acquisition+OR+sourcer+OR+recruiter+OR+recruiting";
    switch (val) {
        case "10":
            return peopleAnalytics;
            break;
        case "11":
            return peopleOps;
            break;
        case "12":
            return divInclu;
            break;
        case "13":
            return talent;
            break;
        case "14":
            return hrExec;
            break;
        case "15":
            return allCat;
            break;
    }
}
// search api pull function
function doSearch(query, pageNum, locale, category, catOnly) {
    cleanOut(oneSource);
    cleanOut(tempSource);
    var city = $('#city-state').val();
    if (catOnly == 'yes') {
        var cat = parseInt(category, 10);
        runWPAPI(locale, cat, city);
    } else {
        runWPAPI(locale, cat, city);
    }
    var cleanQuery = query.replace(/\s/g, '+');
    var proxyAPI = 'XXXXXXXXX';
    if ($('#city').val() && $('#state').val()) {
        var city = $('#city').val();
        var cityCleanUp = city.replace(/\s/g, '+');
        var state = $('#state').val();
        var queryLocale = "&l=" + cityCleanUp + "%2C+" + state;
        var target2API = proxyAPI + "&co=" + locale + "&sort=date&fromage=90&limit=25&start=" + pageNum + "&q=" + cleanQuery + queryLocale;
        var targetAPIALT = proxyAPI + "&co=" + locale + "&sort=date&fromage=90&limit=25&q=" + cleanQuery + queryLocale;
    } else {
        var target2API = proxyAPI + "&co=" + locale + "&sort=date&fromage=90&limit=25&start=" + pageNum + "&q=" + cleanQuery;
        var targetAPIALT = proxyAPI + "&co=" + locale + "&sort=date&fromage=90&limit=25&q=" + cleanQuery;
    }
    getAPIData(target2API + "&callback=?", function(returndata) {
        var data = returndata;
        //var dataTempFiltered = [];
        var totalPull = Math.round(data.totalResults / 25);
        if (totalPull > 50) {
            // loop
            for (i = 0; i < 50; i++) {
                var targetNum = 25 * i;
                var numTrack = i;
                if (numTrack == 49) {
                    getAPIData(targetAPIALT + "&start=" + targetNum + "&callback=?", function(returndata) {
                        var data = returndata;
                        compileAPIData(data);
                        checkGlobalGym();
                    })
                } else {
                    getAPIData(targetAPIALT + "&start=" + targetNum + "&callback=?", function(returndata) {
                        var data = returndata;
                        compileAPIData(data);
                    })
                }
            }
            //end loop
        } else {
            //loop
            for (i = 0; i < totalPull; i++) {
                var targetNum = 25 * i;
                var numTrack = i;
                if (numTrack == (totalPull - 1)) {
                    //console.log('final api under 40');
                    getAPIData(targetAPIALT + "&start=" + targetNum + "&callback=?", function(returndata) {
                        var data = returndata;
                        compileAPIData(data);
                        checkGlobalGym();
                    })
                } else {
                    //console.log('run api under 40');
                    getAPIData(targetAPIALT + "&start=" + targetNum + "&callback=?", function(returndata) {
                        var data = returndata;
                        compileAPIData(data);
                    })
                }
            }
            //end loop
        }
    })
    async function checkGlobalGym() {
        setupDataNew(tempSource);
    }
}

function compileAPIData(data) {
    for (key in data.results) {
        var jobTitle = data.results[key].jobtitle;
        var jobSnippet = data.results[key].snippet;
        var jobLocation = data.results[key].city + ", " + data.results[key].state;
        var jobCompany = data.results[key].company;
        var jobCat = [15];
        var jobCountry = data.results[key].country;
        var jobDate = data.results[key].formattedRelativeTime;
        var jobUrl = data.results[key].jobkey;
        var jobLang = data.results[key].language;
        var queryCheckOne = filterPassOne(jobTitle);
        var queryCheck = filterPassTwo(jobTitle);
        // check for en lang posts
        if (jobLang === 'en') {
            if (queryCheckOne == 'yes') {
                if (queryCheck == 'yes') {
                    tempSource[Object.keys(tempSource).length] = {
                        category: jobCat,
                        title: jobTitle,
                        location: jobLocation,
                        country: jobCountry,
                        company: jobCompany,
                        snippet: "<p>" + jobSnippet + "</p>",
                        date: jobDate,
                        url: jobUrl,
                        geekjob: false
                    };
                }
            }
        }
    }
}

function keywordFilter(target) {
    var filterList = ["People Analytics", "People operations", "Talent Acquisition", "Recruitment", "Sourcer", "Benefits", "Payroll", "Organizational Development", "Organisational Development", "OD", "CHRO", "Head of people", "Learning and Development", "Talent", "business partner", "human", "hr", "diversity", "Inclusion", "culture", "VP HR", "VP Human Resources", "HR Generalist", "Recruiter", "People", "Human Resources Director (HRD)", "VP of Human Resources", "Chief People Officer", "People Director", "People VP", "Group Head People", "General Manager People", "GM People", "Chief Culture Officer", "Culture Director", "Culture VP", "Head Culture", "Group Head Culture", "General Manager Culture", "GM Culture", "Chief Organisational Development Officer", "Organisational Development Director", "Organisational Development VP", "Head Organisational Development", "Group Head Organisational Development", "General Manager Organisational Development", "GM Organisational Development", "Chief Organizational Development Officer", "Organizational Development Director", "Organizational Development VP", "Head Organizational Development", "Group Head Organizational Development", "General Manager Organizational Development", "GM Organizational Development", "Learning and Development", "L&D", "Employee", "Employee Communication", "Employee Engagement", "Employee Relations", "Talent VP", "Talent Director", "Talent Acquisition", "National L&D Manager", "Senior HRBP", "HR Business Partner", "HRBP", "Employee Engagement Specialist", "People Operations Manager", "HR Operations and Analytics", "Employee Communication", "Director Employee Experience and Inclusion", "VP Employee Experience and Inclusion", "Head of Diversity and Inclusion", "Chief Diversity Officer", "HR Analyst", "People Operations Lead"];
}

function setupDataNew(data, category, locale) {
    var DOMTarget = document.getElementById('listings');
    var listing = "";
    for (var key in data) {
        if (key < 15) {
            buildDOMlisting(data[key]);
        }
    }
    DOMTarget.innerHTML = listing;
    if (Object.keys(data).length > 15) {
        buildPagination(data, 0);
    }
    noListingsCheck();
    listingView();

    function buildDOMlisting(target) {
        listing += "<div class='listing' data-key=" + target.url + ">";
        listing += "<div class='listing-title'><h3>" + target.title + "</h3></div>";
        listing += "<div class='listing-posting-date'><span class='time posted'>Posted " + target.date + "</span></div>"
        listing += "<div class='listing-company-location'><span class='company'>" + target.company + "</span><span class='location'>" + target.location + "</span></div>";
        if (target.geekjob == true) {
            listing += "<div class='listing-people-geek'><span class='peoplegeek'><img class='peoplegeek__icon' src='/wp-content/themes/CAJobBoard/images/glasses.svg' /> Posted by a People Geek</span></div>";
        }
        listing += "</div>";
    }
}
// Pagination
function buildPagination(data, pageNum) {
    var pagesTotal = Object.keys(data).length / 15;
    var DOMTarget = document.getElementById('pagination');
    var paginate = "";
    var pageNumStart = 1;
    var pageNumEnd = (Math.round(pagesTotal) - 1);
    if (pageNum <= 1) {
        paginate += "<!-- START -->";
        if ((pageNum + 1) < pageNumEnd) {
            paginate += "<div class='page_num' >" + (pageNum + 1) + "</div>";
        }
        if ((pageNum + 2) < pageNumEnd) {
            paginate += "<div class='page_num' rel=" + (pageNum + 2) + ">" + (pageNum + 2) + "</div>";
        }
        if ((pageNum + 3) < pageNumEnd) {
            paginate += "<div class='page_num' rel=" + (pageNum + 3) + ">" + (pageNum + 3) + "</div>";
        }
        if ((pageNum + 4) < pageNumEnd) {
            paginate += "<div class='page_num' rel=" + (pageNum + 4) + ">" + (pageNum + 4) + "</div>";
        }
        if ((pageNum + 5) < pageNumEnd) {
            paginate += "<div class='page_num' rel=" + (pageNum + 5) + ">" + (pageNum + 5) + "</div>";
        }
    } else if (pageNum > 1 && pageNum <= (pageNumEnd - 5) && pageNum !== pageNumEnd) {
        paginate += "<!-- MID -->";
        paginate += "<div class='page_num one' rel=" + (pageNum - 1) + ">" + (pageNum - 1) + "</div>";
        paginate += "<div class='page_num two' rel=" + (pageNum) + ">" + (pageNum) + "</div>";
        paginate += "<div class='page_num three' rel=" + (pageNum + 1) + ">" + (pageNum + 1) + "</div>";
        paginate += "<div class='page_num four' rel=" + (pageNum + 2) + ">" + (pageNum + 2) + "</div>";
        paginate += "<div class='page_num five' rel=" + (pageNum + 3) + ">" + (pageNum + 3) + "</div>";
        //paginate += "<div class='page_num six' rel="+ (pageNum + 4) +">"+ (pageNum + 4) +"</div>";
    } else if (pageNum == pageNumEnd || pageNum > (pageNumEnd - 5)) {
        paginate += "<!-- END -->";
        if ((pageNumEnd - 5) < pageNumEnd && (pageNumEnd - 5) > 0) {
            paginate += "<div class='page_num' rel=" + (pageNumEnd - 5) + ">" + (pageNumEnd - 5) + "</div>";
        }
        if ((pageNumEnd - 4) < pageNumEnd && (pageNumEnd - 4) > 0) {
            paginate += "<div class='page_num' rel=" + (pageNumEnd - 4) + ">" + (pageNumEnd - 4) + "</div>";
        }
        if ((pageNumEnd - 3) < pageNumEnd && (pageNumEnd - 3) > 0) {
            paginate += "<div class='page_num' rel=" + (pageNumEnd - 3) + ">" + (pageNumEnd - 3) + "</div>";
        }
        if ((pageNumEnd - 2) < pageNumEnd && (pageNumEnd - 2) > 0) {
            paginate += "<div class='page_num' rel=" + (pageNumEnd - 2) + ">" + (pageNumEnd - 2) + "</div>";
        }
        if ((pageNumEnd - 1) < pageNumEnd && (pageNumEnd - 1) > 0) {
            paginate += "<div class='page_num' rel=" + (pageNumEnd - 1) + ">" + (pageNumEnd - 1) + "</div>";
        }
    }
    DOMTarget.innerHTML = paginate;
    $("div.page_num").on('click', function() {
        var pageN = parseInt($(this).attr('rel'));
        buildJoblistings(data, pageN);
        $('html, body').animate({
            scrollTop: ($('html, body').offset().top - 25)
        }, 1200);
    })
}
// part of pagination
function buildJoblistings(data, pageN) {
    var endPoint = Math.round(pageN * 15);
    var startPoint = Math.round(endPoint - 15);
    var DOMTarget = document.getElementById('listings');
    DOMTarget.innerHTML = "";
    var listing = "";
    for (i = startPoint; i < endPoint; i++) {
        var target = data[i];
        listing += "<div class='listing' data-key=" + target.url + ">";
        listing += "<div class='listing-title'><h3>" + target.title + "</h3></div>";
        listing += "<div class='listing-posting-date'><span class='time posted'>Posted " + target.date + "</span></div>"
        listing += "<div class='listing-company-location'><span class='company'>" + target.company + "</span><span class='location'>" + target.location + "</span></div>";
        if (target.geekjob == true) {
            listing += "<div class='listing-people-geek'><span class='peoplegeek'><img class='peoplegeek__icon' src='http://careerboard.peoplegeeks.com/wp-content/themes/CAJobBoard/images/glasses.svg' /> Posted by a People Geek</span></div>";
        }
        listing += "</div>";
    }
    DOMTarget.innerHTML = listing;
    buildPagination(data, pageN);
    listingView();
}
// if listing clicked on get data values
function listingView(source) {
    var wpAPI = '/wp-json/wp/v2/job-listings/';
    var indeedAPI = 'http://api.indeed.com/XXXXXXXXX';
    if (source == 'external') {
        var jobKey = getUrlVars()["jobID"];
        if (jobKey.match(/[a-z]/i)) {
            var jobAPI = indeedAPI + jobKey;
            $.getJSON(jobAPI, function(data) {
                showJob(data, 'indeed', jobKey);
            });
        } else {
            var jobAPI = wpAPI + jobKey;
            $.getJSON(jobAPI, function(data) {
                showJob(data, 'wp', jobKey);
            });
        }
    } else {
        $(".listing").on('click', function() {
            var jobKey = $(this).attr('data-key');
            if ($(this).find('.peoplegeek').length == 1) {
                var jobAPI = wpAPI + jobKey;
                $.getJSON(jobAPI, function(data) {
                    showJob(data, 'wp', jobKey);
                });
            } else {
                var jobAPI = indeedAPI + jobKey;
                $.getJSON(jobAPI, function(data) {
                    showJob(data, 'indeed', jobKey);
                });
            }
        });
    }
}
// once listing data is retrieved, lets show the listing
function showJob(data, source, jobKey) {
    insertUrlParam('jobID', jobKey);
    history.replaceState(null, null, location.href);
    var DOMTarget = document.getElementById('job-listing');
    var jobList = "";
    if (source == 'indeed') {
        jobList += "<h2 class='title'>" + data.results[0].jobtitle + "</h2>";
        jobList += "<span class='company weight--bold'>" + data.results[0].company + "</span>";
        jobList += "<span class='location'>" + data.results[0].formattedLocation + "</span>";
        jobList += "<span class='timeposted'>" + data.results[0].formattedRelativeTime + "</span>";
        jobList += "<a href='" + data.results[0].url + "' target='_blank' class='button apply'>Apply</a>";
        jobList += "<p class='snippet'>" + data.results[0].snippet + "</p>"
        jobList += "<div class='apply-button-container'><a href='" + data.results[0].url + "' target='_blank' class='button apply'>Read more</a></div>";
    }
    if (source == 'wp') {
        var jobDate = timeBetween(data.date_gmt);
        jobList += "<h2 class='title'>" + data.title.rendered + "</h2>";
        jobList += "<span class='company weight--bold'>" + data.fields._company_name + "</span>";
        jobList += "<span class='location'>" + data.fields._job_location + "</span>";
        jobList += "<span class='timeposted'>" + jobDate + "</span>";
        jobList += "<a href='" + data.fields._application + "' target='_blank' class='button apply'>Apply</a>";
        jobList += "<p class='snippet'>" + data.content.rendered + "</p>"
        jobList += "<div class='apply-button-container'><a href='" + data.fields._application + "' target='_blank' class='button apply'>Read more</a></div>";
    }
    scrollToHideElem();
    DOMTarget.innerHTML = jobList;
    //
    function scrollToHideElem() {
        $('html, body').animate({
            scrollTop: ($('html, body').offset().top - 25)
        }, 1200).promise().done(function() {
            $("#search, #main, #newsletter-subscription").fadeOut('fast');
            $("#job").fadeIn('fast');
        });
    }
    $("#return-results").on('click', function() {
        window.history.replaceState(null, null, location.origin);
        var key = jobKey;
        $("#search, #main, #newsletter-subscription").fadeIn('fast');
        $("#job").fadeOut('fast');
        DOMTarget.innerHTML = "";
        for (i = 0; i < $('.listing').length; i++) {
            if ($('.listing')[i].attributes[1].value == key) {
                $('html, body').animate({
                    scrollTop: ($($('.listing')[i]).offset().top - 190)
                }, 1200);
            }
            return;
        }
    });
    window.onpopstate = function() {
        history.go(1);
        var key = jobKey;
        $("#search, #main, #newsletter-subscription").fadeIn('fast');
        $("#job").fadeOut('fast');
        DOMTarget.innerHTML = "";
        for (i = 0; i < $('.listing').length; i++) {
            if ($('.listing')[i].attributes[1].value == key) {
                $('html, body').animate({
                    scrollTop: ($($('.listing')[i]).offset().top - 190)
                }, 1200);
            }
        }
    };
}

function noListingsCheck() {
    var DOMtarget = $("#listings");
    var noEntry = "";
    if (DOMtarget[0].textContent == "") {
        noEntry += "<h2 class=\"weight--bold\">There are no job listings matching your search. Browse recently listed jobs below or try another job title, keyword or location.</h2>";
        noEntry += "<p class='small-text'>Location note: we're working hard to share People Geek jobs from all over the world. Job search is currently available for the following countries: United States, United Kingdom, Canada, Australia, Denmark, France, Sweden, Ireland, Netherlands, Norway, Singapore, New Zealand, and Hong Kong.</p>";
        DOMtarget.append(noEntry);
        $("#pagination").html('');
        // show recent listings
        var recentList = "";
        var count = 0;
        for (key in tempSource) {
            var date = tempSource[key].date;
            if (date.match(/hours/) !== null && count < 15) {
                count++;
                var target = tempSource[key];
                recentList += "<div class='listing' data-key=" + target.url + ">";
                recentList += "<div class='listing-title'><h3>" + target.title + "</h3></div>";
                recentList += "<div class='listing-posting-date'><span class='time posted'>Posted " + target.date + "</span></div>"
                recentList += "<div class='listing-company-location'><span class='company'>" + target.company + "</span><span class='location'>" + target.location + "</span></div>";
                if (target.geekjob == true) {
                    recentList += "<div class='listing-people-geek'><span class='peoplegeek'><img class='peoplegeek__icon' src='/wp-content/themes/CAJobBoard/images/glasses.svg' /> Posted by a People Geek</span></div>";
                }
                recentList += "</div>";
            }
        }
        DOMtarget.append(recentList);
        listingView();
    }
}

function insertUrlParam(key, value) {
    if (history.pushState) {
        let searchParams = new URLSearchParams(window.location.search);
        searchParams.set(key, value);
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
        window.history.pushState({
            path: newurl
        }, '', newurl);
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}