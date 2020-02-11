var startTarget = $('.card.most-popular .blog_title a').attr('href');
var homeTarget = startTarget.replace("https","http");
//  API TARGETS
var linkedinAPI = 'https://www.linkedin.com/countserv/count/share?callback=?&format=jsonp&url=';
var facebookAPI = 'https://graph.facebook.com/?id=';

function runTargets() {
    // LINKEDIN
    var api_linkedin = linkedinAPI + homeTarget;
    $.getJSON(api_linkedin, { dataType: "jsonp", async: false }, function(result) {
        // targeting gplus div
        $('.gplus').html(result.count);
    })
    // FACEBOOK
    var api_facebook = facebookAPI + homeTarget;
    // 
    $.getJSON(api_facebook, { dataType: "jsonp", async: false }, function(result) {
        $('.fb_count').html(result.share.share_count);
    })
}
function addUpCounts() {
    var li_count = parseInt($('.gplus').html());
    var fb_count = parseInt($('.fb_count').html());
    var totalCount = li_count + fb_count;
    $('.total_count').html(totalCount);
}
runTargets();
setTimeout(function(){ addUpCounts(); }, 2000);

// MOBILE OBJECT
var isMobile = {
    Android: function Android() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};
// IF MOBILE DETECTED
if (isMobile.any()) {
    $("h4.search-form").html('Press enter on the keyboard to search.');
    $(document.body).on('touchmove', onScroll);
    $(window).on('scroll', onScroll);
    function onScroll() {
        var scrollTop     = $(window).scrollTop(),
            elementOffset = $('.odometer').offset().top,
            distance      = (elementOffset - scrollTop);
            if(distance < 425) {
                totalCount = $('.total_count').html();
                $('.odometer').html(totalCount);
            }
    };
}
if (!isMobile.any()) {
$(document).ready(function() {
    $(window).on('scroll', function(){
        var scrollTop2     = $(window).scrollTop(),
            elementOffset2 = $('.odometer').offset().top,
            distance2      = (elementOffset2 - scrollTop2);
            if(distance2 < 785) {
                totalCount = $('.total_count').html();
                $('.odometer').html(totalCount);
            }
    });

});

}
// FUNCTIONS
function scrollFadeIn() {
    $('.col-xs-9').each(function () {
        if ($(this)[0].getBoundingClientRect().top < -1100) {
            $(this).stop().fadeTo(180, 0);
        } else if ($(this)[0].getBoundingClientRect().top > -690) {
            $(this).stop().fadeTo(10, 1);
        }
    });
}
function detectTarget(target) {
    $(target).each(function () {
        var targetPos = $(this).offset().top;
        var windowTop = $(window).scrollTop();
        if (targetPos < windowTop + 280) {
            setTimeout(function () {
                 $('.odometer-value').html(10);
            }, 300);
        }
    });
}