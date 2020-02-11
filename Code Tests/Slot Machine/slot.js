let imgOrigin = "http://www.aminamatart.com/tt-imgs/",
    imgExt = ".jpg",
    imgObj = [
        ['coffeemaker', 'teapot', 'espressomachine'],
        ['coffeefilter', 'teastrainer', 'espressotamper'],
        ['coffeegrounds', 'loosetea', 'groundespressobeans']
    ],
    winBoard = [],
    printOut = document.getElementById('winning');

$(document).ready(function() {

    $("#button").click(function() {
        buildPanels($("#one .panel"), 0);
        buildPanels($("#two .panel"), 1);
        buildPanels($("#three .panel"), 2);
        spinSlots($("#one .panel"));
        spinSlots($("#two .panel"));
        spinSlots($("#three .panel"));
        printOut.innerHTML = "";
        setTimeout(findWinPiece, 8000);
    });

});

const buildPanels = (dest, imgDest) => {
    for (let i = 0; i < 15; i++) {
        let randImg = Math.floor(Math.random() * imgObj[imgDest].length);
        let imgBuild = imgObj[imgDest][randImg];
        dest.append("<div class='label " + imgBuild + "'><img src=" + imgOrigin + imgBuild + imgExt + "></div>");
    }
};

const spinSlots = (dest) => {
    let time = 6500;
    time += Math.round(Math.random() * 1000);
    dest.stop(true, true);

    let marginTop = parseInt(dest.css("margin-top"), 10)
    marginTop -= (10 * 100)

    dest.animate({
        "margin-top": marginTop + "px"
    }, {
        'duration': time,
        'easing': "easeOutElastic"
    });
}

const findWinPiece = () => {
    let target = document.getElementsByClassName('label');
    for (let i = 0; i < target.length; i++) {
        target[i].offsetTop === 6 ? winBoard.push(target[i].className.slice(6)) : "";
    }

    compareWin = [imgObj[0][0], imgObj[1][0], imgObj[2][0]];
    compareWin2 = [imgObj[0][1], imgObj[1][1], imgObj[2][1]];
    compareWin3 = [imgObj[0][2], imgObj[1][2], imgObj[2][2]];

    if (compareWin.toString() === winBoard.toString()) {
        printOut.innerHTML = "You'll get Coffee!";
    } else if (compareWin2.toString() === winBoard.toString()) {
        printOut.innerHTML = "You'll get Tea!";
    } else if (compareWin3.toString() === winBoard.toString()) {
        printOut.innerHTML = "You'll get Espresso!";
    } else {
        printOut.innerHTML = "You'll be getting something.";
    }
    winBoard = [];
}