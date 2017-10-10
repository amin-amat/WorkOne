Slide Show JS : README::

OBJECTIVE:

1. Use HTML, CSS and JavaScript to build an image slideshow
2. Do not use any third party slideshow, image or photo gallery plugins
3. You may use a framework like jQuery or AngularJS
4. Use deferred image loading
   - load only two images on page load (the current slide and the next slide)
   - load two images at a time on next button click (the next slide image and the slide image after next)
5. User event tracking
   - on each previous or next button click, call single pixel image below
   - http://www.[yourwebsite].com/images/clear.gif
6. Use API to get slideshow data:
   - slideshow data URL: XXX
   - use the following data items:
   - Page title
   - summary
   - individual slide data (slides array):
     - title
     - image (image object)
     - slide text content (body)
7. Sort order filter:
   - create an interface to allow the user to change the sort order of the slides
   - two options: default, alpha
   - sort by alpha on slide title
   - default order is from JSON data
8. Display one image at a time
9. Must be a functional stand-alone working HTML page
