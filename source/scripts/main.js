$(document).on('change', '#scroll-mode', function () {
    var state = $(this).prop('checked');
    var padding = 50;
    scrollMode(state);
    if (state && $('.items').height() + padding < $(window).height()) {
        loadMore();
    }

});

$(document).on('click', '.load-more', function () {
    loadMore();
});

function loadMore() {
    $.getJSON('/items.json', function (data) {
        var len = data.length;
        var $wrapper = $('.items');
        var $items = $();
        for (var i = 0; i < len; i++) {
            var $newItem = $('.item').first().clone();
            $newItem.find('.item_figure img').attr('src', data[i].image);
            $newItem.find('.item_title').text(data[i].title);

            var id = Date.now();
            $newItem.find('.stars_input').each(function (ii) {
                $(this).attr('id', 'star_' + i + '_' + ii + '_' + id).attr('name', 'stars_' + i + '_' + id);
            });
            $newItem.find('.stars_star').each(function (ii) {
                $(this).attr('for', 'star_' + i + '_' + ii + '_' + id);
            });
            $newItem.find('.item_paragraph').html(data[i].paragraph);
            $items = $items.add($newItem);
        }
        $wrapper.append($items);
    });
}

function scrollMode(turnOn) {
    if (turnOn) {
        $('.load-more').hide();
        $(window).on('scroll.loadMore', function () {
            var padding = 50;
            if ($(window).height() + $(window).scrollTop() > $('.items').height() + padding) {
                console.log($(window).height() + $(window).scrollTop() > $('.items').height() + padding);
                loadMore();
            }
        });
    }
    else {
        $('.load-more').show();
        $(window).off('scroll.loadMore');
    }
}

