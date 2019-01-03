(function( $ ) {
/**
 * START JS JQUERY
 * 10.2018
 * By MinhNguyenWP
 * --------------------
 * 1. Slider relates news
 */
/* ----------------------------------------------- */
/**
 * 1. Slider relates news
 */
function relatedSlider (objSlide) {
    if(!$( objSlide )) { return; }
    
    $( objSlide).each(function() {
        $( this ).slick({
            infinite: true,
            autoplay: false,
            autoplaySpeed: 4000,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true,
            arrows: true,
            dots: false,
        });
    });
};
/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* OnLoad Page */
$(document).ready(function($){
    // 1.
    relatedSlider('.related-articles');
});
/* OnLoad Window */
var init = function () {

};
window.onload = init;
})(jQuery);
