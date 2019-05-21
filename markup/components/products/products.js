(() => {
  const DESKTOP_SCREEN = 1199;
  const WIDTH_TABLET = 767;
  const OFFSET_AFTER_SCROLL_TO_PRODUCT = 150;
  const HEIGHT_ONE_ROW = '424px';
  const MAX_HEIGHT_LIST = `3000px`;
  const sliderProducts = $('.js-products-slider');
  const showMoreBtn = $('.js-show-more');
  const productsList = $('.products__slider');

  function enableSliderOnlyMobile(slider) {
    if ($(window).width() >= DESKTOP_SCREEN) {
      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
      return false;
    }
    if (!slider.hasClass('slick-initialized')) {
      return slider.slick(
        {
          mobileFirst: true,
          arrows: false,
          dots: true,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: WIDTH_TABLET,
              settings: {
                slidesToScroll: 2,
                slidesToShow: 2,
                adaptiveHeight: false,
                variableWidth: true
              }
            }
          ]
        }
      );
    }
  }

  $(window).on('resize orientationchange', () => {
    enableSliderOnlyMobile(sliderProducts);
  });

  // only for desktop
  const showMoreProducts = () => {
    showMoreBtn.on('click', (evt) => {
      evt.preventDefault();
      const isPressed = showMoreBtn.attr('aria-pressed');
      showMoreBtn.text(showMoreBtn.text() === 'Показать еще 9' ? 'Скрыть' : 'Показать еще 9');

      if (isPressed === 'false') {
        productsList.css('max-height', MAX_HEIGHT_LIST);
        showMoreBtn.attr('aria-pressed', 'true');
      } else {
        productsList.css('max-height', HEIGHT_ONE_ROW);
        showMoreBtn.attr('aria-pressed', 'false');
        $('html, body').animate({
          scrollTop: productsList.offset().top - OFFSET_AFTER_SCROLL_TO_PRODUCT
        }, 500);
      }
    });
  };

  enableSliderOnlyMobile(sliderProducts);
  showMoreProducts();

})();
