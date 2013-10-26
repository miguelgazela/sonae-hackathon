$(document).ready(function(){
    $$('li.selectable').swipeLeft(function(){
        var li = $(this);
        li.addClass("push out left").one("webkitAnimationEnd", function(){
            li.removeClass("push out left");
            li.remove();
        });
    });
});

function transition(toPage, type, reverse) {
    var toPage = $(toPage);
    var fromPage = $("#pages .current");
    var reverse = reverse ? "reverse" : "";
    
    //visits.add(toPage);
    //toPage.find(".back").toggle(visits.hasBack());
    
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    };
    
    toPage.addClass("current " + type + " in " + reverse).one("webkitAnimationEnd", function(){
        fromPage.removeClass("current " + type + " out " + reverse);
        toPage.removeClass(type + " in " + reverse);
    });
    
    fromPage.addClass(type + " out " + reverse);
}

/*$.getJSON("http://localhost:8888/tmp-data/favorites.json", function(data){
$("#list-products").empty('li');
$("#tmpl-store").tmpl(data.products).appendTo("#list-products");
});*/


Lungo.dom('#store').on('load', function(event){
console.log("Loading store");

//$.getJSON("http://localhost:8888/tmp-data/favorites.json", function(data){

$.getJSON("http://172.30.17.43:8888/tmp-data/favorites.json", function(data){
$("#list-products").empty('li');
$("#tmpl-store").tmpl(data.products).appendTo("#list-products");

$$("#list-products > li").doubleTap(function(){
var object = $(this);
// add to cart

object.addClass('animate-fast selected').one("webkitAnimationEnd", function(){
object.removeClass("animate-fast selected");
});
});

$$("#list-products > li").hold(function(){ // this cannot be done in favorites
var object = $(this);

// mark as favorite
object.addClass('animate-fast favorited').one("webkitAnimationEnd", function(){
object.removeClass("animate-fast favorited");
});
});

$$("#list-products > li").singleTap(function(){
var object = $(this);

$('#product-detail').attr('data-product-id', 1);
Lungo.Router.article("main", "product-detail");
});
});
});




/* Create an array to hold the different image positions */
var itemPositions = [];
var numberOfItems = $('#scroller .item').length;

/* Assign each array element a CSS class based on its initial position */
function assignPositions() {
    for (var i = 0; i < numberOfItems; i++) {
        if (i === 0) {
            itemPositions[i] = 'left-hidden';
        } else if (i === 1) {
            itemPositions[i] = 'left';
        } else if (i === 2) {
            itemPositions[i] = 'middle';
        } else if (i === 3) {
            itemPositions[i] = 'right';
        } else {
            itemPositions[i] = 'right-hidden';
        }
    }
    /* Add each class to the corresponding element */
    $('#scroller .item').each(function(index) {
        $(this).addClass(itemPositions[index]);
    });
}

/* To scroll, we shift the array values by one place and reapply the classes to the images */
function scroll(direction) {
    if (direction === 'prev') {
        itemPositions.push(itemPositions.shift());
    } else if (direction === 'next') {
        itemPositions.unshift(itemPositions.pop());
    }
    $('#scroller .item').removeClass('left-hidden left middle right right-hidden').each(function(index) {
        $(this).addClass(itemPositions[index]);
    });        
}

/* Do all this when the DOMs ready */
$(document).ready(function() {



    assignPositions();
    var autoScroll = window.setInterval("scroll('next')", 3000);
  
    /* Hover behaviours */
    $('#scroller').hover(function() {
        window.clearInterval(autoScroll);
        $('.nav').stop(true, true).fadeIn(200);
    }, function() {
        autoScroll = window.setInterval("scroll('next')", 3000);
        $('.nav').stop(true, true).fadeOut(200);
    });

    /* Click behaviours */
    $('.prev').click(function() {
        scroll('prev');
    });
    $('.next').click(function() {
        scroll('next');
    });
    
     $('.prev').click(function() {
        scroll('prev');
    });
    $('.next').click(function() {
        scroll('next');
    });


});





