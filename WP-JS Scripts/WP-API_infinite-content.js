var countHome = 1;

function getData() {
  var url = "/wp-json/wp/v2/posts?_embed&status=publish";
  var loaded = document.getElementById("loaded");
  var loading = document.getElementById("loading");
  var cacheStamp = '&=' + new Date().getTime();

  if (countHome > 1) {
    var pagination = "&page=" + (countHome);
    var pag_dest = url + pagination + cacheStamp;
  } else {
    var pag_dest = url + "&offset=9" + cacheStamp;
  }

  $.getJSON(pag_dest, function(result) {
    if (!result.length) {
        loading.classList.remove('in');
        loading.classList.add('collapse'); 
        loaded.innerHTML = '<section class="col-xs-9 ap-container card show show-up"><h2>No results found.</h2></section>';
      } else {
        $.each(result, function(i) {
          if(result[i].categories[0] !== 221) {
            buildCard(result[i]);
          } 
        });
      }
  });
  countHome += 1;
}

function buildCard(data) {
  var loadMore = document.getElementById("loadmore");
  var dataPrint = "";
      dataPrint += '<section class="col-xs-9 ap-container card show show-up"><div class="content span_full_of_single"><div class="content"><div class="span-1-of-1">';
      dataPrint += '<a class="display_thumb_size" href="' + data.link + '" data-ajax="false"><img class="m_img ap-left ap-image-alt" src="' + data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url + '" alt=""></a>';
      dataPrint += '</div><div class="span-1-of-2">';
      dataPrint += '<h2 class="blog_title"><a href="' + data.link + '" data-ajax="false">' + data.title.rendered + '</a></h2>';
      dataPrint += '<h3>' + data.excerpt.rendered + '</h3>';
      dataPrint += '<span>';
      dataPrint += '<div class="author-card"><section id="author"><div class="author-photo ap-circle ap-show-inline-block ap-col s1-5 ap-cell-top ap-rest">';
      dataPrint += '<img src="' + data._embedded.author[0].avatar_urls[96] + '" /></div>';
      dataPrint += '<div class="author-info ap-show-inline-block ap-col s10"><span class="ap-small-1 text-uppercase"><strong>Author</strong></span><span class="ap-large-2"><strong>';
      dataPrint += '<a href="' + data._embedded.author[0].link + '" data-ajax="false">' + data._embedded.author[0].name + '</a></strong>';
      dataPrint += !data._embedded.author[0]["author-title"] ? '</span>' : ' </span><br>';
      dataPrint += !data._embedded.author[0]["author-title"] ? "" : '<span class="ap-large-2">' + data._embedded.author[0]["author-title"] + '</span>';
      dataPrint += '<div class="author-social ap-show-block">';
      dataPrint += !data._embedded.author[0].twitter ? "" : '<li><a href="' + data._embedded.author[0].twitter + '" target="_blank" class="icon twitter" data-ajax="false"></a></li>';
      dataPrint += !data._embedded.author[0].facebook ? "" : '<li><a href="' + data._embedded.author["0"].facebook + '" target="_blank" class="icon facebook" data-ajax="false"></a></li>';
      dataPrint += !data._embedded.author[0].linkedin ? "" : '<li><a href="' + data._embedded.author[0].linkedin + '" target="_blank" class="icon linkedin" data-ajax="false"></a></li>';
      dataPrint += !data._embedded.author[0].googleplus ? "" : '<li><a href="' + data._embedded.author[0].googleplus + '" target="_blank" class="icon google" data-ajax="false"></a></li>';
      dataPrint += !data._embedded.author[0].pinterest ? "" : '<li><a href="' + data._embedded.author[0].pinterest + '" target="_blank" class="icon pinterest" data-ajax="false"></a></li>';
      dataPrint += !data._embedded.author[0].url ? "" : '<li><a href="' + data._embedded.author[0].url + '" target="_blank" class="icon url" data-ajax="false"></a></li>';
      dataPrint += '</div>';
      dataPrint += '</section></div>';
      dataPrint += 'by <a href="' + data._embedded.author[0].link + '" rel="author" class="author-info" data-ajax="false">' + data._embedded.author[0].name + '</a> in <a href="' + data._embedded["wp:term"][0][0].link + '" data-ajax="false">' + data._embedded["wp:term"][0][0].name + '</a>';
      dataPrint += '</span></div></div><div class="clear"> </div></div></div></section>';

  loaded.insertAdjacentHTML('beforeend', dataPrint);
  loading.classList.remove('in');
  loading.classList.add('collapse'); 
  loadMore.classList.remove('collapse');   
  return;
}

getData();