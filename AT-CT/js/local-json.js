var url               = "./sessions.json";
var tabArr            = [];
var nav_tabs          = "";
var content_body      = "";
var nav_target        = document.querySelector("#nav_tabs");
var side_target       = document.querySelector("#side_tabs");
var content_target    = document.querySelector("#content");

function initLoad() {
  $.getJSON(url, function (result) {
    $.each(result.Items, function (i) {
        if (tabArr[0] && result.Items[i].Track.Title === tabArr[0]) {
          sidebarBuild(result.Items[i], i);
        }
        if ($.inArray(result.Items[i].Track.Title, tabArr) === -1) {
          tabArr.push(result.Items[i].Track.Title);
        }
    });
    $.each(tabArr, function (i) {
      nav_tabs += "<li rel=" + tabArr[i] + ">";
      nav_tabs += tabArr[i];
      nav_tabs += "</li>";
      nav_target.innerHTML = nav_tabs;
    });

    var section_title = document.querySelector("#section-title");
    var nav_inner     = document.querySelectorAll("#nav_tabs li");
    var side_inner    = document.querySelectorAll("#side_tabs li");
    side_inner[0].classList.toggle("active");

    for (i = 0; i < nav_inner.length; i++) {
      if(nav_inner[i].attributes[0].nodeValue === section_title.innerHTML) {
        nav_inner[i].classList.toggle("active");
      }
    };

  });

}

  function newSectionBuild(target) {
    var nav_inner     = document.querySelectorAll("#nav_tabs li.active");
    var side_inner    = document.querySelectorAll("#side_tabs li.active");

    $.each(nav_inner, function (i) {
      nav_inner[i].classList.toggle("active");
    })
    target[0].classList.toggle("active");

    $.each(side_inner, function (i) {
      side_inner[i].classList.toggle("active");
    })

    $.getJSON(url, function (result) {
      side_target.innerHTML = "";
      content_target.innerHTML = "";
      $.each(result.Items, function (i) {
        if (result.Items[i].Track.Title === target.attr("rel")) {
          sidebarBuild(result.Items[i], i);
        }
      })
    })
  }

  function sidebarBuild(target,item_id) {
      var side_tabs   = "";
      side_tabs      += "<li rel="+ item_id +">";
      side_tabs      += "<h4 class='blue'>"+ target.Title +"</h4>";
      if (target.Speakers !== undefined) {
        side_tabs += "<h6>"+ target.Speakers[0].FirstName + " " + target.Speakers[0].LastName + ", " + target.Speakers[0].Company +"</h6>";
      }
      side_tabs      += "</li>";
      side_target.innerHTML += side_tabs;
      document.querySelector("#section-title").innerHTML = target.Track.Title;
  }

  function showContent(item_id) {
    var side_inner = document.querySelectorAll("#side_tabs li.active");
    var content_body = "";
    $.each(side_inner, function (i) {
      side_inner[i].classList.toggle("active");
    })

    $.getJSON(url, function (result) {
      content_body   += "<article>";
      content_body  += "<h1 class='blue'>" + result.Items[item_id].Title + "</h1>";
      if (result.Items[item_id].Speakers !== undefined) {
        content_body += "<h6 class='blue'>"+ result.Items[item_id].Speakers[0].FirstName + " " + result.Items[item_id].Speakers[0].LastName + ", " + result.Items[item_id].Speakers[0].Company +"</h6>"
      }
      content_body += "<p>" + result.Items[item_id].Description + "</p>"
      if (result.Items[item_id].Speakers !== undefined) {
        content_body += "<h6><a href=''>See the Q&A from this talk and other here.</a></h6>";
        content_body += "<h2 class='blue'>About the speaker</h2>";
        content_body += "<h5>"+ result.Items[item_id].Speakers[0].FirstName + " " + result.Items[item_id].Speakers[0].LastName + ", <span>" + result.Items[item_id].Speakers[0].Title + ", " + result.Items[item_id].Speakers[0].Company +"</span></h5>";
        content_body += "<p class='mid-txt'>"+ result.Items[item_id].Speakers[0].Biography + "</p>";
      }
      content_body += "</article>";
      content_target.innerHTML = content_body;
    });
  }

  initLoad();
  showContent(11);

  $(function() {
    $("#side_tabs").on("click", "li", function () {
      showContent($(this).attr("rel"));
      $(this).toggleClass("active");
    });
    $("#nav_tabs").on("click", "li", function () {
      newSectionBuild($(this));
    });
  });