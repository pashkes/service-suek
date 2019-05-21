(() => {
  const TABLE_WIDTH = 768;
  let spaceTop = 160;
  const btnMenu = document.querySelector('.js-show-menu');
  const body = document.body;
  const closeBtn = document.querySelector('.js-close-menu');
  const header = document.querySelector('.header__top');

  const onClickCloseMobileMenu = function () {
    btnMenu.addEventListener('click', function () {
      body.classList.add('menu-is-opened');
      this.setAttribute('aria-expanded', 'true');
    });
  };

  const onClickMobileMenu = function () {
    closeBtn.addEventListener('click', function () {
      body.classList.remove('menu-is-opened');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
  };


  const menuIsOpened = () => {
    return $('body').hasClass('menu-is-opened');
  };

  $(window).on('resize load orientationchange', () => {
    if ($(window).innerWidth() >= TABLE_WIDTH) {
      spaceTop = 84;
    }
  });

  // scroll to the id element
  $('.js-scrollTo').click(function () {
    if (menuIsOpened()) {
      body.classList.remove('menu-is-opened');
      btnMenu.setAttribute('aria-expanded', 'false');
    }
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - spaceTop
    }, 500);
    return false;
  });

  const toggleClassOnScrollHandler = function () {
    if (window.scrollY > 1) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  };

  const toggleClassOnScroll = function () {
    document.addEventListener('scroll', toggleClassOnScrollHandler);
    window.addEventListener('load', toggleClassOnScrollHandler);
    window.addEventListener('resize', toggleClassOnScrollHandler);
  };

  toggleClassOnScroll();
  onClickMobileMenu();
  onClickCloseMobileMenu();

})();
