$(function () {
  $('.slider-product').slick({
    dots: true,
    arrows: false,
  });

    $('.slider-brand').slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500
    });

    $('.menu-btn').click(function () {
      $('.menu-btn, .user-nav__user, .user-nav__links, .user-nav__search, .menu__list').toggleClass('open-menu');
      // $('.menu__list').toggleClass('open-menu');
       $('body').toggleClass('lock');
      //  $('.user-nav__search').toggleClass('open-menu');
      //  $('.user-nav__links').toggleClass('open-menu');
      //  $('.user-nav__user').toggleClass('open-menu');
    });
  // var mixer = mixitup('.products-week__content');

    //     var mixer = mixitup('.products-week__content', {
    //       // load: {
    //       //   filter: '.all'
    //       // }
    //     });

    //     var mixer = mixitup('.design__content', {
    //       load: {
    //         filter: 'all'
    //       }
    //  });

});
 var containerEl1 = document.querySelector('[data-ref="container-1"]');
 var containerEl2 = document.querySelector('[data-ref="container-2"]');

 var config = {
   controls: {
     scope: 'local'
   }
 };

 var mixer1 = mixitup(containerEl1, config);
 var mixer2 = mixitup(containerEl2, config);