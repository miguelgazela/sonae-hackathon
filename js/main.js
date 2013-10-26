var BASE_PATH2 = "http://172.30.17.248:8888/sonae-hackathon/";
var BASE_PATH = "http://localhost:8888/sonae-hackathon/";
var searchTags = [];

$(document).ready(function(){
    console.log("jQuery working!");

    $.getJSON(BASE_PATH+"api/carrinho/get.php?iduser=1", function(data){
        $("#tmpl-cart-product").tmpl(data).appendTo("#list-cart-products");

        $$('#shopping-cart .cart-item').swipeLeft(function(){
            var li = $(this);

            li.addClass("push out left").one("webkitAnimationEnd", function(){
                li.removeClass("push out left");
            });
            $.get(BASE_PATH+"api/carrinho/remove.php?iduser=1&idproduto="+li.attr("data-product-id"), function(data){
                li.remove();
            });
        });
    });

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

Lungo.dom('#store').on('load', function(event){
    console.log("Loading store");
    $("#list-categories").html("");

    $.getJSON(BASE_PATH+"api/categories/get_all.php", function(data){

        $("#tmpl-list-categories").tmpl(data).appendTo("#list-categories");

        $$("#list-categories > li").singleTap(function(){
            var object = $(this);
            $('#products').attr('data-category-id', object.attr('data-category-id'));
            $('#products').attr('data-category-name', object.children('strong').text());
            Lungo.Router.article("main", "products");
        });
    });
});

Lungo.dom('#products').on('load', function(){
    console.log("loading products");
    $("#list-products").html("");
    $("h1.title").text($("#products").attr("data-category-name"));
    $("footer nav a.link_store").addClass("active");

    $.getJSON(BASE_PATH+"api/products/get_by_category.php?idcategoria="+$('#products').attr('data-category-id'), function(data){

		$("#tmpl-product").tmpl(data).appendTo("#list-products");

		$$("#list-products > li").doubleTap(function(){
			var object = $(this);

			// add to cart
            $.getJSON(BASE_PATH+"api/carrinho/add.php?iduser=1&idproduto="+object.attr("data-product-id")+"&quantidade=1", function(data){
                $("#list-cart-products").append('<li class="cart-item" data-product-id="'+data['id']+'"><div class="tag on-right">1x</div><strong>'+data['name']+'</strong><small>'+data["marca"]+'</small><small>&euro '+data["preco"]+'</small></li>');
                
                setTimeout(function(){
                    var seen = {};
                    $('#list-cart-products .cart-item').each(function() {
                        var id = $(this).attr("data-product-id");
                        if (seen[id])
                            $(this).remove();
                        else
                            seen[id] = true;
                    });
                }, 200);
            });

			object.addClass('animate-fast selected').one("webkitAnimationEnd", function(){
				object.removeClass("animate-fast selected");
			});
		});

		$$("#list-products > li").hold(function(){ // this cannot be done in favorites
			var object = $(this);

			// mark as favorite
            $.get(BASE_PATH+"api/favorites/add.php?iduser=1&idproduto="+object.attr("data-product-id"));

			object.addClass('animate-fast favorited').one("webkitAnimationEnd", function(){
				object.removeClass("animate-fast favorited");
			});
		});

		$$("#list-products > li").singleTap(function(){
            var object = $(this);
            $('#product-detail').attr('data-go-back', "products");
            $('#product-detail').attr('data-product-id', object.attr('data-product-id'));
            Lungo.Router.article("main", "product-detail");
        });
	});
});

function emptyFavorites(){
    if($("#list-favorites > li").length === 0) {
        $("#favorites").append('<div class="empty"><span class="icon star"></span><strong>Sem favoritos</strong><small>Quando marcar um produto como favorito ele irá aparecer aqui</small></div>');
    } else {
        return false;
    }
}

function addToCart(productId, userId){

}

Lungo.dom('#favorites').on('load', function(event){
    console.log("Loading favorites");
    $("#list-favorites").html("");

    $.getJSON(BASE_PATH+"api/favorites/get.php?iduser=1", function(data){
        console.log("favorites_received");

        $("#tmpl-favorite").tmpl(data).appendTo("#list-favorites");

        $$("#list-favorites > li").doubleTap(function(){
            var object = $(this);

            // add to cart
            $.get(BASE_PATH+"api/carrinho/add.php?iduser=1&idproduto="+object.attr("data-product-id")+"&quantidade=1", function(data){
                $("#list-cart-products").append('<li class="cart-item"><div class="tag on-right">1x</div><strong>'+data['name']+'</strong><small>'+data["marca"]+'</small><small>&euro '+data["preco"]+'</small></li>');
                
                setTimeout(function(){
                    var seen = {};
                    $('#list-cart-products .cart-item').each(function() {
                        var id = $(this).attr("data-product-id");
                        if (seen[id])
                            $(this).remove();
                        else
                            seen[id] = true;
                    });
                }, 200);
            });

            object.addClass('animate-fast selected').one("webkitAnimationEnd", function(){
                object.removeClass("animate-fast selected");
            });
        });

        $$("#list-favorites > li").singleTap(function(){
            var object = $(this);
            $('#product-detail').attr('data-product-id', object.attr('data-product-id'));
            $('#product-detail').attr('data-go-back', "favorites");
            Lungo.Router.article("main", "product-detail");
        });
    });
});

Lungo.dom('#product-detail').on('load', function(){
    $("#product-detail").html("");
    $("nav a.back").attr("data-view-article", $("#product-detail").attr("data-go-back"));

    $.getJSON(BASE_PATH+"api/products/get.php?idproduto="+$('#product-detail').attr('data-product-id'), function(data){
        $("#tmpl-product-detail").tmpl(data).appendTo("#product-detail");
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

function fetchUsers(input){
    $('#list-name').val($(input).val());
}

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


/* Do all this when the DOMs ready
$(document).ready(function() {

    assignPositions();
    var autoScroll = window.setInterval("scroll('next')", 3000);
  
    $('#scroller').hover(function() {
        window.clearInterval(autoScroll);
        $('.nav').stop(true, true).fadeIn(200);
    }, function() {
        autoScroll = window.setInterval("scroll('next')", 3000);
        $('.nav').stop(true, true).fadeOut(200);
    });

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
*/






function init() {
    if ($(window).innerHeight() < 700) {
        $('strong').css('font-size', '17px');
    }

    $('.search-results').hide();
    $('body').on('touchmove',function(e){
        //e.preventDefault();
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
        url: BASE_PATH+'database/update_tag.php',
        type: 'POST',
        data: { tag_text : tag, count_number : count },
        success: function(){
            searchTags.push(tag_text);
        }
    });
}

function loadSearchTags() {
    $.ajax({
        url: BASE_PATH+'database/get_search_tags.php',
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
                url: BASE_PATH+'database/search.php',
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
