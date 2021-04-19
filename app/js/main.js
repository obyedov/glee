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
      slidesToScroll: 5
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