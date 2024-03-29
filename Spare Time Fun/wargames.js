var data = [{
    "GAMES": [
        "FALKEN'S MAZE",
        "BLACK JACK",
        "GIN RUMMY",
        "HEARTS",
        "BRIDGE",
        "CHECKERS",
        "CHESS",
        "POKER",
        "FIGHTER COMBAT",
        "GUERRILLA ENGAGEMENT",
        "DESERT WARFARE",
        "AIR-TO-GROUND ACTIONS",
        "THEATERWIDE TACTICAL WARFARE",
        "THEATERWIDE BIOTOXIC AND CHEMICAL WARFARE",
        "GLOBAL THERMONUCLEAR WAR"
    ],
    "SCENARIOS": [
        "U.S. FIRST STRIKE",
        "USSR FIRST STRIKE",
        "NATO / WARSAW PACT",
        "FAR EAST STRATEGY",
        "US USSR ESCALATION",
        "MIDDLE EAST WAR",
        "USSR CHINA ATTACK",
        "INDIA PAKISTAN WAR",
        "MEDITERRANEAN WAR",
        "HONGKONG VARIANT",
        "SEATO DECAPITATING",
        "CUBAN PROVOCATION",
        "ATLANTIC HEAVY",
        "CUBAN PARAMILITARY",
        "NICARAGUAN PREEMPTIVE",
        "PACIFIC TERRITORIAL",
        "BURMESE THEATERWIDE",
        "TURKISH DECOY",
        "ANGENTINA(SIC) ESCALATION",
        "ICELAND MAXIMUM",
        "ARABIAN THEATERWIDE",
        "U.S. SUBVERSION",
        "AUSTRALIAN MANEUVER",
        "SUDAN SURPRISE",
        "NATO TERRITORIAL",
        "ZAIRE ALLIANCE",
        "ICELAND INCIDENT",
        "ENGLISH ESCALATION",
        "MIDDLE EAST HEAVY",
        "MEXICAN TAKEOVER",
        "CHAD ALERT",
        "SAUDI MANEUVER",
        "AFRICAN TERRITORIAL",
        "ETHIOPIAN ESCALATION",
        "TURKISH HEAVY",
        "NATO INCURSION",
        "U.S. DEFENSE",
        "CAMBODIAN HEAVY",
        "PACT MEDIUM",
        "ARCTIC MINIMAL",
        "MEXICAN DOMESTIC",
        "TAIWAN THEATERWIDE",
        "PACIFIC MANEUVER",
        "PORTUGAL REVOLUTION",
        "ALBANIAN DECOY",
        "PALESTINIAN LOCAL",
        "MOROCCAN MINIMAL",
        "BAVARIAN DIVERSITY",
        "CZECH OPTION",
        "FRENCH ALLIANCE",
        "ARABIAN CLANDESTINE",
        "GABON REBELLION",
        "NORTHERN MAXIMUM",
        "DANISH PARAMILITARY",
        "SEATO TAKEOVER",
        "HAWAIIAN ESCALATION",
        "IRANIAN MANEUVER",
        "NATO CONTAINMENT",
        "SWISS INCIDENT",
        "CUBAN MINIMAL",
        "CHAD ALERT",
        "ICELAND ESCALATION",
        "VIETNAMESE RETALIATION",
        "SYRIAN PROVOCATION",
        "LIBYAN LOCAL",
        "GABON TAKEOVER",
        "ROMANIAN WAR",
        "MIDDLE EAST OFFENSIVE",
        "DENMARK MASSIVE",
        "CHILE CONFRONTATION",
        "S.AFRICAN SUBVERSION",
        "USSR ALERT",
        "NICARAGUAN THRUST",
        "GREENLAND DOMESTIC",
        "ICELAND HEAVY",
        "KENYA OPTION",
        "PACIFIC DEFENSE",
        "UGANDA MAXIMUM",
        "THAI SUBVERSION",
        "ROMANIAN STRIKE",
        "PAKISTAN SOVEREIGNTY",
        "AFGHAN MISDIRECTION",
        "ETHIOPIAN LOCAL",
        "ITALIAN TAKEOVER",
        "VIETNAMESE INCIDENT",
        "ENGLISH PREEMPTIVE",
        "DENMARK ALTERNATE",
        "THAI CONFRONTATION",
        "TAIWAN SURPRISE",
        "BRAZILIAN STRIKE",
        "VENEZUELA SUDDEN",
        "MAYLASIAN ALERT",
        "ISREAL DISCRETIONARY",
        "LIBYAN ACTION",
        "PALISTINIAN TACTICAL",
        "NATO ALTERNATE",
        "CYPRESS MANEUVER",
        "EGYPT MISDIRECTION",
        "BANGLADESH THRUST",
        "KENYA DEFENSE",
        "BANGLADESH CONTAINMENT",
        "VIETNAMESE STRIKE",
        "ALBANIAN CONTAINMENT",
        "GABON SURPRISE",
        "IRAQ SOVEREIGNTY",
        "VIETNAMESE SUDDEN",
        "LEBANON INTERDICTION",
        "TAIWAN DOMESTIC",
        "ALGERIAN SOVEREIGNTY",
        "ARABIAN STRIKE",
        "ATLANTIC SUDDEN",
        "MONGOLIAN THRUST",
        "POLISH DECOY",
        "ALASKAN DISCRETIONARY",
        "CANADIAN THRUST",
        "ARABIAN LIGHT",
        "S.AFRICAN DOMESTIC",
        "TUNISIAN INCIDENT",
        "MALAYSIAN MANEUVER",
        "JAMAICA DECOY",
        "MALAYSIAN MINIMAL",
        "RUSSIAN SOVEREIGNTY",
        "CHAD OPTION",
        "BANGLADESH WAR",
        "BURMESE CONTAINMENT",
        "ASIAN THEATERWIDE",
        "BULGARIAN CLANDESTINE",
        "GREENLAND INCURSION",
        "EGYPT SURGICAL",
        "CZECH HEAVY",
        "TAIWAN CONFRONTATION",
        "GREENLAND MAXIMUM",
        "UGANDA OFFENSIVE",
        "CASPIAN DEFENSE"
    ]
}];
var nukeCount = 0;

function getElemID(id) {
    return document.getElementById(id);
}

function checkCredentials() {
    var entry = document.getElementById("entry").value;

    if (entry == "JOSHUA" || entry == "joshua") {
        getElemID("login").style.display = "none";
        getElemID("result").innerHTML = 'GREETINGS PROFESSOR FALKEN<br>';
        getElemID("result").innerHTML += 'How are you feeling today?<br>';
        getElemID("response").style.visibility = "visible";
        //setTimeout(greetOne, 2500);
    } else if (entry == "LIST GAMES" || entry == "listgames") {
        getElemID("login").style.display = "none";
        gamesList(data);

        getElemID("response").style.visibility = "visible";
    } else if (entry == "Help Games" || entry == "helpgames") {
        getElemID("login").style.display = "none";
        getElemID("result").innerHTML = "Games' refers to models, simulations and games which have tactical and strategic applications";
        getElemID("response").style.visibility = "visible";
    } else {
        terminateConnection();
    }
    return false;
}

function gamesList(data) {
    var gamesPrint = "";
    for (game of data[0].GAMES) {
        getElemID("list").innerHTML += '<div class="game-name">' + game + '</div> ';
    }
    return;
}

function loginGreet() {
    getElemID("greet").innerHTML += 'Shall we play a game?<br><br>';
    getElemID("response").style.visibility = "visible";
    getElemID("reply").value = "";
    getElemID("response").style.display = "block";
    return;
}

function greetOne() {
    getElemID("greet").innerHTML = '--' + document.getElementById("reply").value + '<br>';
    getElemID("response").style.display = "none";
    getElemID("greet").innerHTML += 'Excellent. It has been a while.<br><br> ';
    setTimeout(loginGreet, 700);
    return;
}

function checkNukeCount() {
    if (nukeCount == 0) {
        nukeCount++;
        getElemID("result").style.display = "none";
        getElemID("greet").innerHTML = 'Wouldn\'t you prefer a good game of chess?<br><br> ';
        getElemID("response").style.visibility = "visible";
        getElemID("reply").value = "";
        getElemID("response").style.display = "block";
    } else {
        getElemID("result").style.display = "none";
        getElemID("greet").innerHTML = 'OK.<br><br> ';
        getElemID("response").style.visibility = "visible";
        getElemID("reply").value = "";
        getElemID("response").style.display = "block";
        //startMap();
    }
}

function checkResponse() {
    var reply = document.getElementById("reply").value;

    if (reply == "list games" || reply == "listgames") {
        getElemID("result").style.display = "none";
        getElemID("reply").style.display = "none";
        getElemID("response").style.display = "none";
        getElemID("greet").style.display = "none";
        gamesList(data);
        getElemID("response").style.visibility = "visible";
    } else if (reply != null && reply != "" && reply != "nuclear") {
        setTimeout(greetOne, 100);
    } else if (reply == "nuclear") {
        console.log(nukeCount);
        getElemID("response").style.display = "none";
        checkNukeCount();
    }
    //else if (reply == "Yes") {
    return;
}

function terminateConnection() {
    getElemID("login").style.display = "none";
    getElemID("result").innerHTML = 'IDENTIFICATION NOT RECOGNIZED<BR><BR>CONNECTION TERMINATED';
    return;
}

function startMap() {

}


// Generate map

// Which side are you on

//Please list targets by Country and/or City Name