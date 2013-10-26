var BASE_PATH2 = "http://172.30.17.248:8888/sonae-hackathon/";
var BASE_PATH = "http://localhost:8888/sonae-hackathon/";

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
            $.get(BASE_PATH+"api/carrinho/add.php?iduser=1&idproduto="+object.attr("data-product-id")+"&quantidade=1");

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
            $.get(BASE_PATH+"api/carrinho/add.php?iduser=1&idproduto="+object.attr("data-product-id")+"&quantidade=1");

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





