$(document).ready(function(){$("#thumb-image").on("mousemove",function(e){var o=e.clientX,t=e.clientY;console.log(o,t),$(".thumb-glass").css({top:t,left:o}),$("#full-image").css({top:4*-t,left:4*-o})})});