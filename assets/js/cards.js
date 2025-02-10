$.fn.commentCards = function() {
    return this.each(function() {
        var $this = $(this),
            $cards = $this.find('.card'),
            $current = $cards.filter('.card--current'),
            $next;

        $cards.on('click', function() {
            if (!$current.is(this)) {
                $cards.removeClass('card--current card--out card--next');
                $current.addClass('card--out');
                $current = $(this).addClass('card--current');
                $next = $current.next();
                $next = $next.length ? $next : $cards.first();
                $next.addClass('card--next');
            }
        });

        if (!$current.length) {
            $current = $cards.last();
            $cards.first().trigger('click');
        }

        $this.addClass('cards--active');

        // Arrow button navigation
        $('#prev-card').on('click', function() {
            var $prev = $current.prev();
            if (!$prev.length) {
                $prev = $cards.last();
            }
            $prev.trigger('click');
        });

        $('#next-card').on('click', function() {
            var $next = $current.next();
            if (!$next.length) {
                $next = $cards.first();
            }
            $next.trigger('click');
        });
    });
};

$('.cards').commentCards();