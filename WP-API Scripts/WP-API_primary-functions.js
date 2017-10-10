var clickTick = 0;
var previousScroll = 0;

$(document).ready(function () {
    checkAvatar();
    $("#filter-categories").on('click tap', function() {
        classAction.removeOut("#category-filter","invisible","in");
    })
    $("#filter-categories-top").on('click tap', function() {
        classAction.removeOut("#category-filter.two","invisible","in");
    })
    $("#filter-categories-close").on('click tap', function() {
        classAction.addIn("#category-filter","invisible","in");
    })
    $("#filter-categories-top-close").on('click tap', function() {
        classAction.addIn("#category-filter.two","invisible","in");
    })
    $("#filter-search").on('click tap', function() {
        classAction.removeOut("#search-filter","invisible","in");
        $('.search-field').focus();
    })
    $("#filter-search-close").on('click tap', function() {
        classAction.addIn("#search-filter","invisible","in");
    })
    $('.search-field').keypress(function(e) {
        if (e.which == 13) {
            var searchUrl = 'https://blog.autopilothq.com/?s=';
            var searchTarget = $('.search-field').val();
            window.location.replace(searchUrl + searchTarget);
        }
    });
    $("#subscribe-one").click(function() {
        $("div.subscribe-form").css({'opacity' : 1, 'display' : 'block'});
        $(this).addClass('ap-hide');
        $("#filter-search").css({'opacity' : 0});
        return false;
    })
    $("#subscribe-blog .close").click(function() {
        $("div.subscribe-form").css({'opacity' : 0, 'display' : 'none'});
        $("#subscribe-one").removeClass('ap-hide');
        $("#filter-search").css({'opacity' : 1});
    })
    $("#subscribe-blog input").focusin(function() {
        var buttonValue = $("#subscribe").html();
        if (buttonValue) {
            $("#subscribe").html('Submit').removeClass('error');
        }
    })
    $(".foot-link").on('click tap', function() {
        document.location.href = $(this).attr('rel');
    })
    setInterval(function() {
        if ($('.fix-top').length > 0 && $('.fix-top').offset().top === 0 && $('.fix-top') !== undefined) {
            hideNav();
        }
    }, 300);
    $(window).scroll(function(){
        clearTimeout( $.data( this, "scrollCheck" ) );
        $.data( this, "scrollCheck", setTimeout(function() {
            if($('.fix-top').length > 0 && $('.fix-top').offset().top === 0 && $('.fix-top') !== undefined) {
                window.setTimeout(hideNav, 300);
            }
        }, 250) );

        var currentScroll = $(this).scrollTop();
        if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()){
          if (currentScroll > previousScroll){
            window.setTimeout(hideNav, 300);
          } else {
            if (currentScroll <= 61) {
                window.setTimeout(hideNav, 300);
            } else {
                window.setTimeout(showNav, 300);
            }
          }
          previousScroll = currentScroll;
        }
  });
    
});
var classAction = function(targetID, targetClass, targetClassTwo) {
    return {
        addIn: function(targetID, targetClass, targetClassTwo) {
            var target = document.body.querySelectorAll(targetID);
            target[0].classList.remove(targetClassTwo);
            setTimeout(function(){
                target[0].classList.add(targetClass);
            }, 700); 
        },
        removeOut: function(targetID, targetClass, targetClassTwo) {
            var target = document.body.querySelectorAll(targetID);
            target[0].classList.remove(targetClass);
            target[0].classList.add(targetClassTwo);
        }
    }
}();

function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
function checkAvatar() {
    var postsCheck = document.querySelector('body.posts');
    var singlepostCheck = document.querySelector('body.single-post');
    var authorPageCheck = document.querySelector('body.author');
    var mostPopularCheck = document.querySelector('body .most-popular');
    var homeCheck = document.querySelector('body.home');
    if (postsCheck !== null || singlepostCheck !== null || authorPageCheck !== null || mostPopularCheck !== null || homeCheck !== null) {
        var targetAvatar = document.querySelector('.avatar');
        var usersList = ['alliblum','anderfrischer','annefleshman','brandonleung','caitlinbrett','daniellekucera','geoffreygentry','gregcapitolo','hadleyclark','jacquelinekyothomas','jamesoconner','jonathankoo','joshfechter','kencostales','kevingeorge','khyatisehgal','kimkadiyala','laurendavis','lizyee','megankratzman','pawelgrabrowski','petersharkey','romansukharenko','sanderzaydman','scottedmonds','scottirwin','susansu'];
        var authorName = document.querySelector('#author-header h1');
        if (targetAvatar.getAttribute("src").includes("custom-gravatar") && authorName !== null) {
            var authorNameFind = document.querySelector('#author-header h1').innerHTML.toLowerCase().replace(/\s+/g, '');
            usersList.forEach(checkMatch);
        } else if (targetAvatar.getAttribute("src").includes("custom-gravatar") && authorName == null){
            if (mostPopularCheck){
                var authorNameFind = document.querySelector('.most-popular a.author-info').innerHTML.toLowerCase().replace(/\s+/g, '');
                var targetAvatar = document.querySelector('.most-popular .avatar');
                usersList.forEach(checkMatch);
            }
            if (homeCheck){
                var authorNameFind = document.querySelector('#featured a.author-info').innerHTML.toLowerCase().replace(/\s+/g, '');
                var targetAvatar = document.querySelector('.author-photo .avatar');
                usersList.forEach(checkMatch);
            } else {
                var authorNameFind = document.querySelector('a.author-info').innerHTML.toLowerCase().replace(/\s+/g, '');
                usersList.forEach(checkMatch);
            }
        }
        function checkMatch(item,index) {
            if (item == authorNameFind) {
                targetAvatar.src = '/wp-content/themes/APblog/images/avatars/'+authorNameFind+'_profile.jpg';
                targetAvatar.srcset = '/wp-content/themes/APblog/images/avatars/'+authorNameFind+'_profile.jpg';
                return;
            }
        }
    }
}
function hideNav() {
    $("nav").removeClass("fix-top");
}
function showNav() {
    $("nav").addClass("fix-top");
}