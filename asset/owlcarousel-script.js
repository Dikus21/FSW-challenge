$(".owl-carousel").owlCarousel({
    center: true,
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    paginationSpeed: 500,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        1000: {
            items: 2,
        },
    },
});


var owl = $(".owl-carousel");
owl.owlCarousel();
$(".btn-right").click(function () {
    owl.trigger("next.owl.carousel", [300]);
});

$(".btn-left").click(function () {
    owl.trigger("prev.owl.carousel", [300]);
});