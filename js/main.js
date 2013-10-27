var BASE_PATH = "http://192.68.1.6:8888/sonae-hackathon/";
var BASE_PATH2 = "http://localhost:8888/sonae-hackathon/";
var BASE_PATH2 = "http://paginas.fe.up./~ei10076/projects/sonae-hackathon/";

$(document).ready(function(){
    console.log("jQuery working!");

    $.getJSON(BASE_PATH+"api/carrinho/get.php?iduser=1", function(data){
        $("#tmpl-cart-product").tmpl(data).appendTo("#list-cart-products");

        $("#show-checkout").append('<li class="thumb arrow"><p>Checkout<a style="float:right" data-icon="arrow-right"></a></p><a id="checkout-counter" class="tag">'+$("#list-cart-products li").length+'</a></li>');

        $$('#list-cart-products .cart-item').swipeLeft(function(){
            var li = $(this);

            li.addClass("push out left").one("webkitAnimationEnd", function(){
                li.removeClass("push out left");
            });
            $.get(BASE_PATH+"api/carrinho/remove.php?iduser=1&idproduto="+li.attr("data-product-id"), function(data){
                li.remove();
                console.log($("#list-cart-products li").length);
                $("#checkout-counter").text($("#list-cart-products li").length);
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
});

Lungo.dom("#list").on("load", function(){

});

Lungo.dom("#lists").on("load", function(event){
    console.log("Loading lists");
    $("#shared-lists").html("");

    $.getJSON(BASE_PATH+"api/lists/getListas.php?iduser=1", function(data){

        $("#tmpl-shared-list").tmpl(data).appendTo("#shared-lists");

        $$("#shared-lists > li").singleTap(function(){
            var object = $(this);
            $('#shared-list').attr('data-list-id', object.attr('data-list-id'));
            Lungo.Router.article("main", "shared-list");
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

    console.log(BASE_PATH+"api/products/get_by_category.php?idcategoria="+$('#products').attr('data-category-id'));

    $.getJSON(BASE_PATH+"api/products/get_by_category.php?idcategoria="+$('#products').attr('data-category-id'), function(data){

        console.log("THIS!!");
        console.log(data);

		$("#tmpl-product").tmpl(data).appendTo("#list-products");

		$$("#list-products > li").doubleTap(function(){
			var object = $(this);

			// add to cart
            $.getJSON(BASE_PATH+"api/carrinho/add.php?iduser=1&idproduto="+object.attr("data-product-id")+"&quantidade=1", function(data){
                $("#list-cart-products").append('<li class="cart-item" data-product-id="'+data['id']+'"><div class="tag on-right">1x</div><strong>'+data['name']+'</strong><small>'+data["marca"]+'</small><small>&euro '+data["preco"]+'</small></li>');

                setTimeout(function(){
                    var seen = {};
                    var counter = $("#checkout-counter");
                    counter.text(0);

                    $('#list-cart-products .cart-item').each(function() {
                        var id = $(this).attr("data-product-id");
                        if (seen[id])
                            $(this).remove();
                        else {
                            seen[id] = true;
                            counter.text(parseInt(counter.text(), 10) + 1);
                        }
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
	}).fail(function(){
        console.log("fail loading products");
    });
});

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
                    var counter = $("#checkout-counter");
                    counter.text(0);

                    $('#list-cart-products .cart-item').each(function() {

                        var id = $(this).attr("data-product-id");
                        if (seen[id])
                            $(this).remove();
                        else {
                            seen[id] = true;
                            counter.text(parseInt(counter.text(), 10) + 1);
                        }
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
