# Instructions

Please complete a code review on the JS, HTML, and CSS included with this README file.  

The provided code does not work.  Getting the code to work is only part of the exercise.  There are many additional issues with the code; please address those issues with an eye towards future maintainability and good coding standards.  Assume the code was written by a junior developer who may need guidance.

What changes would you request from the junior developer?  Why would you request the proposed changes?

Thank you.


ISSUES: (see proposed edits in accompanying files)

-- no images folder present

CSS -
-- part of html file instead of being in separate file
-- body, #carousel-container #carousel : shared same style, consolidate to share
-- .carousel-item, .carousel-dots-nav-item : shared same style, consolidate to share
-- #previous, #next, .carousel-dots-nav-item : shared same style, consolidate to share
-- adjust display style for previous, next and title; have previous,next atop the title

HTML -
-- doctype not declared; very important!
-- move JS scripts to footer
-- used <ol> 'ordered lists' incorrectly in 2 locations; rename to <ul>
-- no need to have 'Previous' and 'Next' as href links. Reformat as <div>

JS/jQUERY -
-- add "use strict" to catch errors and help in maintaining a clean code base
-- change carousel into function carouselBuild which accepts two parameters that determines the array to be used to build the carousel and the html components to target. This enables for multi-use and is very modular making it easy to add in new components for those components to propogate simultaneouly to anything calling the carouselBuild function.
-- rename Carousel to carouselBuild following best practice naming convention
-- simplify initial jQuery call from '$(document).ready(function()' to '$(function()'
-- clean up items in "build carousel based on items" by chaining up the methods/actions
-- remove 'add events to dots' code; not needed and only creates confusion and unneeded extra code
-- dot variable use as a class to consolidate/clean up code as well as to act as an 'identifier' for actions
-- also add unique id values to the dots in conjunction with '$(this).attr('id');', this makes it easier to get the data needed (i.e., title) but also helps to modularize the code/action
-- removed preventDefault code since it is no longer needed
-- the carousel animate code "$('#carousel').animate({left: -targetPos * 100 + '%'}, 500);" make into a function so to reduce redundant code and make the code modular
-- removea the 'e' from the function calls; not needed since no value is being passed
