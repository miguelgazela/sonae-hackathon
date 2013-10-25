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

