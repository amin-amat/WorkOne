var targetUrl = "/wp-json/wp/v2/event?_embed";
var loadedEvent = document.getElementById("events");
var cacheStamp = '&=' + new Date().getTime();
var eventUrl = targetUrl + cacheStamp;

function getEventsData() {
  $.getJSON(eventUrl, function (result) {
    if (!result.length) {
        loaded.innerHTML = '<li class="event"><h4>No events scheduled.</h4></li>';
      } else {
        buildEvent(result[0]);
      }
  });
}

function buildEvent(data) {
  var dateRaw = data.date_start;
  var removeYear = dateRaw.slice(4, 8);
  var extractMonth = removeYear.slice(0, 2);
  var extractDate = removeYear.slice(2, 4);
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var formatMonth = monthNames[extractMonth - 1];
  var finalDate = formatMonth;
  var dateFormatted = "";
  var dateTimeRaw = data.time_start;
  var dateRawEnd = data.date_end;

  if (dateRawEnd === "") {
    dateFormatted = finalDate +'. '+ extractDate ;
  } else {
    var removeYear2 = dateRawEnd.slice(4, 8);
    var extractDate2 = removeYear2.slice(2, 4);
    if (extractDate[0] === '0' || extractDate2[0] === '0') {
      var startDate = extractDate[1];
      var endDate = extractDate2[1];
      dateFormatted = finalDate + '. ' + startDate + ' - ' + endDate;
    } else {
      dateFormatted = finalDate + '. ' + extractDate + ' - ' + extractDate2;
    }
  }

  var eventTitle = data.title.rendered;
  var eventTitleFinal = eventTitle;
  var dataPrint = "";
    dataPrint += '<li class="event">';
    dataPrint += '<div class="event__date">';
    dataPrint += '<div class="icon"></div>';
    dataPrint += dateFormatted;
    dataPrint += '<div class="event__descrip">' + eventTitleFinal + '</div>';
    dataPrint += '<div class="event__link">';
    dataPrint += '<a href="' + data.button_url + '" target="_blank" data-ajax="false">';
    dataPrint += data.submit_button_text;
    dataPrint += '</a>';
    dataPrint += '</div>';
    dataPrint += '</li>';
  loadedEvent.insertAdjacentHTML('beforeend', dataPrint); 
  return;
}

getEventsData();