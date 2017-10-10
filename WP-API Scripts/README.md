WP-API Scripts README ::

These collection of JS scripts were part of a phase one step to begin using the WP-API to have a headless WP instance running to then move the front end scripts over to REACT. My intent was to first use these script to experiment and at times stress-test the API to do an initial study of loading times as well as find any defects on the SEO side as well.

The scripts as presented here cover several aspects of the project in which they were used:

_events-listing :

Grabs the WP API datapoint from an external WP instance to retrieve/obtain and then pull in data related to events listed on that WP instance.


_infinite-content :

A barebones script which acted as a SPA test to experiment with the WP API to test against loading times. I used vanilla JS for cleanliness but also to make it easy to spot and potential bottles necks before moving to phase two, which would have been using REACT.


_mobile-detect :

Not only does this file contain the mobile detection aspect of the project but also contains scripts/function that access LinkedIn & Facebook API to get post counts for posts being displayed on a page. There’s also a function that detects top of screen measurements to ‘turn on’ animations.


_primary_functions :

This file was essentially the main js file that was used throughout the project. Using jQuery, a series of on click, tap event conditions were utilized to cover both desktop and mobile user interactions, and custom functions were created to modularize multiple use functions. An additional function was created for author avatars, so if an author had a default icon shown, this would be detected and an actual image would be displayed instead. Now the script was set to only activate if a default author icon was being used, so that in time it could slowly deactivate itself unless otherwise needed.


_popular-post :

Using the WP API, grabs the most popular posts (based off of view count) to then display.


_post-by-category :

Grabs posts based of category requested in the getData function call.

