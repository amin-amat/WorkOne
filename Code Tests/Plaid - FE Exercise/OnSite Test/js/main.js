$(document).ready(function () {


    $("#thumb-image").on('mousemove', function(e) {
        var xCoor = e.clientX;
        var yCoor = e.clientY;
        console.log(xCoor, yCoor);

        $(".thumb-glass").css({
            top: yCoor,
            left: xCoor
        })

        $("#full-image").css({
            top: -yCoor * 4,
            left: -xCoor * 4
        })

    })

});