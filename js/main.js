var BASE_PATH = "http://172.30.17.248:8888/sonae-hackathon/";
var BASE_PATH2 = "http://localhost:8888/sonae-hackathon/";
var searchTags = [];

$(document).ready(function(){
    console.log("jQuery working!");

    $$('li.favorite').swipeLeft(function(){
        var li = $(this);

        li.addClass("push out left").one("webkitAnimationEnd", function(){
            li.removeClass("push out left");
        });

        $.get(BASE_PATH+"api/favorites/remove.php?iduser=1&idproduto="+li.attr("data-product-id"), function(data){
            console.log("removed favorite");
            li.remove();
        });
    });

    loadSearchTags();
    init();
});

Lungo.dom('#product-detail').on('load', function(){
    // load product detail
});

Lungo.dom('#products').on('load', function(){
   // $.getJSON("tmp-data/favorites.json", function(data){

		$.getJSON("http://172.30.17.43:8888/tmp-data/favorites.json", function(data){


		$("#list-products").empty('li');
		$("#tmpl-products").tmpl(data.products).appendTo("#list-products");

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
			Lungo.Router.article("main", "products");
		});
	});
});

Lungo.dom('#favorites').on('load', function(event){
    console.log("Loading favorites");

    $.getJSON(BASE_PATH+"api/favorites/get.php?iduser=1", function(data){
        console.log("favorites_received");
        
        $("#list-favorites").empty('li');
        $("#tmpl-favorite").tmpl(data).appendTo("#list-favorites");

        $$("#list-favorites > li").doubleTap(function(){
            var object = $(this);

            // add to cart

            object.addClass('animate-fast selected').one("webkitAnimationEnd", function(){
                object.removeClass("animate-fast selected");
            });
        });

        $$("#list-favorites > li").hold(function(){ // this cannot be done in favorites
            var object = $(this);

            // mark as favorite
            object.addClass('animate-fast favorited').one("webkitAnimationEnd", function(){
                object.removeClass("animate-fast favorited");
            });
        });

        $$("#list-favorites > li").singleTap(function(){
            var object = $(this);

            $('#product-detail').attr('data-product-id', 1);
            Lungo.Router.article("main", "product-detail");
        });
    });
});

/*$.getJSON("http://172.30.17.43:8888/tmp-data/favorites.json", function(data){
        $("#list-cart-products").empty('li');
        $("#tmpl-cart-product").tmpl(data.products).appendTo("#list-cart-products");
});
    
$.getJSON("http://172.30.17.43:8888/tmp-data/favorites.json", function(data){
        $("#show-checkout").empty('li');
        $("#tmpl-checkout").tmpl(data.products).appendTo("#show-checkout");
});*/


Lungo.dom('#features').on('load', function(event){
    console.log("Loading shopping-cart");
    alert("easdas");
    
    //$.getJSON("tmp-data/favorites.json"", function(data){
    $.getJSON("http://172.30.17.43:8888/tmp-data/favorites.json", function(data){
        $("#list-cart-products").empty('li');
        $("#tmpl-cart-product").tmpl(data.products).appendTo("#list-cart-products");
    });
});




function fetchUsers(input){
    $('#list-name').val($(input).val());
}

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

Lungo.dom('#store').on('load', function(event){
	console.log("Loading store");

	//$.getJSON("tmp-data/favorites.json"", function(data){

	$.getJSON("http://172.30.17.43:8888/tmp-data/favorites.json", function(data){


		$("#list-categories").empty('li');
		$("#tmpl-store").tmpl(data.categories).appendTo("#list-categories");


		$$("#list-categories > li").singleTap(function(){
			var object = $(this);
			Lungo.Router.article("main", "products");
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






function init() {
    if ($(window).innerHeight() < 700) {
        $('strong').css('font-size', '17px');
    }

    $('.search-results').hide();
    $('body').on('touchmove',function(e){
        e.preventDefault();
    });

    $('.scroll').bind('touchmove', function(e){
        e.stopPropagation();
    });

    searchTrigger();
}

function searchTouched() {
    $('.search-init-page-elem').hide();
    $('.empty').css({
        "padding": "0",
        "margin": "0",
        "width": "100%"
    });
    window.scrollTo(0, 0);

    $('.form .icon.search').toggleClass("search").toggleClass("remove");
    $$('.form .icon.remove').singleTap(function() {
        $('#search-bar input').val("");
        $(this).toggleClass("search").toggleClass("remove");
    });
}

function saveTag(string, count) {
    var tag = string.trim().split(' ').pop();

    $.ajax({
        url: '../database/update_tag.php',
        type: 'POST',
        data: { tag_text : tag, count_number : count },
        success: function(){
            searchTags.push(tag_text);
        }
    });
}

function loadSearchTags() {
    $.ajax({
        url: '../database/get_search_tags.php',
        type: 'POST',
        dataType: 'json',
        success: function(data){
            for (var tag in data) {
                searchTags.push(data[tag].tag);
                $( "#search-bar input" ).autocomplete({
                    source: searchTags
                });
            }
        }
    });
}

function searchTrigger() {
    $('#search-bar input').keyup(function(event) {
        var value = this.value.toLowerCase();
        if (value == "") {
            $('.search-results').hide();
            $('#general-results').empty('li');
            return;
        }
        if (event.keyCode == 32 || event.keyCode == 13) {
            $.ajax({
                url: '../database/search.php',
                type: 'POST',
                data: { search : value },
                dataType: 'json',
                success: function(data){
                    $('#general-results').empty('li');
                    $("#tmpl-search").tmpl(data).appendTo("#general-results");

                    if (data.length > 0) {
                        saveTag(value, data.length);
                        $('.search-results').show();
                    }
                }
            });

            // $.ajax({
            //     url: '../database/search.php',
            //     type: 'POST',
            //     data: { search : value },
            //     dataType: 'json',
            //     success: function(data){
            //         $('#general-results').empty('li');
            //         $("#tmpl-search").tmpl(data).appendTo("#general-results");

            //         if (data.length > 0)
            //             saveTag(value, data.length);
            //     }
            // });
        }
    });
}
