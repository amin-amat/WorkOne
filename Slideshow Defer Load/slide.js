$(document).ready(function() {

    var slideShow = function(target) {
        //SLIDESHOW VARIABLES
        var slideTrueWidth = slideCount * sWidth;
        var slideCount = $("#slide-container ul li").length;
        var sWidth = 510;
        var sHeight = 270;
        return {
            startShow: function() {
                $.ajax({
                        crossDomain: true,
                        type: "GET",
                        url: "https://api.[yourwebsite].com/api/service/2.0/slideshow/content?partnerId=7eef498c-f7fa-4f7c-81fd-b1cc53ac7ebc&contentid=17103&includeLang=en",
                        dataType: "jsonp",
                        contentType: "application/jsonp"
                    })
                    .done(function(result) {
                        buildSlideShow(result.data);
                    });
                $("#slide-container").css({
                    width: sWidth,
                    height: sHeight
                });
                $("#inner-slide").css({
                    width: slideTrueWidth
                });

                function buildSlideShow(data) {
                    var pageTitle = data[0].title;
                    document.getElementById("page-title").innerHTML = pageTitle;
                    var pageSummary = data[0].summary;
                    document.getElementById("page-summary").innerHTML = pageSummary;
                    var slides = data[0].slides;
                    var slideDest = document.getElementById("slide-container").innerHTML;
                    for (i = 0; i < slides.length; i++) {
                        slideBox = '<li value=" ' + i + ' "class="slide">';
                        slideBox += '<div class="left"><span class="title">' + data[0].slides[i].title + '</span><br>';
                        slideBox += data[0].slides[i].body + '</div>';
                        slideBox += '<div class="right"><img src="" data-src="http://www.[yourwebsite].com' + data[0].slides[i].image.imageUrl + '" class="image"></div>';
                        slideBox += '</li>';
                        document.getElementById("inner-slide").innerHTML += slideBox;
                    }
                    var first = $("#slide-container ul li:first-child .image").attr("data-src");
                    $("#slide-container ul li:first-child .image").attr("src", first);
                    var last = $("#slide-container ul li:last-child .image").attr("data-src");
                    $("#slide-container ul li:last-child .image").attr("src", last);
                }

            },
            buttonClick: function(target) {
                if (target === "L") {
                    $("#inner-slide").animate({
                        left: +sWidth
                    }, 200, function() {
                        $("#inner-slide li:first-child .image").attr("src", "");
                        $("#inner-slide li:last-child").prependTo('#inner-slide');
                        $("#inner-slide li:last-child .image").attr("src", "");
                        first = $("#inner-slide li:first-child .image").attr("data-src");
                        $("#inner-slide li:first-child .image").attr("src", first);
                        $("#inner-slide").css('left', '');
                    });
                } else if (target === "R") {
                    $("#inner-slide").animate({
                        left: -sWidth
                    }, 200, function() {
                        $("#inner-slide li:first-child").appendTo("#inner-slide");
                        first = $("#inner-slide li:first-child .image").attr("data-src");
                        $("#inner-slide li:first-child .image").attr("src", first);
                        $("#inner-slide li:last-child .image").attr("src", "");
                        $("#inner-slide").css('left', '');
                    });
                }
                // ZEE BUG CATCHER
                else {
                    console.log('ERROR');
                }

            },
            pixelTrack: function(target) {
                dir = target;
                imgTarget = $("#pixel").attr("data-src");
                urlSubmit = window.location.href;
                finalUrl = imgTarget + '?' + urlSubmit + '&direction=' + dir;
                $("#pixel").attr("src", finalUrl);
            },
            sortArrange: function(target) {


                if (target === 'alpha') {
                    var liElements = $("li.slide").sort(function(a, b) {
                        return $(a).find(".title").text() > $(b).find(".title").text();
                    });
                } else if (target === 'default') {
                    var liElements = $("li.slide").sort(function(a, b) {
                        return $(a).attr('value') > $(b).attr('value');
                    });

                } else {
                    console.log('ERROR');

                }
                document.getElementById("inner-slide").innerHTML = "";
                for (i = 0; i < liElements.length; i++) {
                    document.getElementById("inner-slide").innerHTML += liElements[i].outerHTML;
                }

            }
        }

    }();

    slideShow.startShow();

    // BUTTON ACTIONS

    $("#back").click(function() {
        slideShow.pixelTrack('back');
        slideShow.buttonClick("L");
    });

    $("#next").click(function() {
        slideShow.pixelTrack('next');
        slideShow.buttonClick("R");
    });

    // SORT BUTTON ACTIONS
    $("#alpha").click(function() {
        slideShow.sortArrange('alpha');
    });

    $("#default").click(function() {
        slideShow.sortArrange('default');
    });

});