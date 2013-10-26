var searchTags = [];


$(document).ready(function(){
    $$('li.selectable').swipeLeft(function(){
        var li = $(this);
        li.addClass("push out left").one("webkitAnimationEnd", function(){
            li.removeClass("push out left");
            li.remove();
        });
    });

    loadSearchTags();
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