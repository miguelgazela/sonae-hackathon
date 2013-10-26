$(document).ready(function(){
    console.log("jQuery working!");

    $$('li').swipeLeft(function(){
        var li = $(this);
        li.addClass("push out left").one("webkitAnimationEnd", function(){
            li.removeClass("push out left");
            li.remove();
        });
    });
});

Lungo.dom('#product-detail').on('load', function(){
    // load product detail
});

Lungo.dom('#favorites').on('load', function(event){
    console.log("Loading favorites");

    //$.getJSON("http://localhost:8888/sonae-hackathon/tmp-data/favorites.json", function(data){
    $.getJSON("http://172.30.17.248:8888/sonae-hackathon/tmp-data/favorites.json", function(data){
        $("#list-favorites").empty('li');
        $("#tmpl-favorite").tmpl(data.products).appendTo("#list-favorites");

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

