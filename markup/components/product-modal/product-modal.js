(() => {
  let viewportHeight = $(window).height();
  const productModal = $('#product-modal');
  const stateProductModal = {
    opened: false,
  };
  const orderForm = document.querySelector('#order-form');
  const orderModal = $('#order-modal');


  const onSubmitModalForm = () => {
    orderForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // *important* Should add this code after successfully send form to the server
      orderModal.modal('hide');
      orderModal.on('hidden.bs.modal', () => {
        $('#order-success-modal').modal('show');
      });
    });
  };

  const getModalBodyHeight = (modal) => {
    const modalHeaderHeight = modal.find('.modal__header').innerHeight();
    const modalFooterHeight = modal.find('.modal__footer').innerHeight();
    return viewportHeight - (modalHeaderHeight + modalFooterHeight);
  };

  const recalculateBodyHeightProduct = () => {
    $(window).on('resize orientationchange load', () => {
      if (stateProductModal.opened) {
        viewportHeight = $(window).height();
        productModal.find('.modal__body').css('height', getModalBodyHeight(productModal));
      }
    });
  };

  const showOrderFormModal = () => {
    orderModal.modal('show');
  };

  productModal.on('shown.bs.modal', () => {
    viewportHeight = $(window).height();
    productModal.find('.modal__body').css('height', getModalBodyHeight(productModal));
    stateProductModal.opened = !stateProductModal.opened;
    // recalculate width slider after shown modal
    $('.js-modal-slider').slick('setPosition');
  });

  const changeStateProductModal = () => {
    productModal.on('hidden.bs.modal', () => {
      stateProductModal.opened = !stateProductModal.opened;
    });
  };

  const showModalForm = ()=> {
    $('.js-open-form-order').on('click', () => {
      productModal.modal('hide');
      productModal.on('hidden.bs.modal', showOrderFormModal);
    });
  };

  const removeListenerOrderForm = () => {
    orderModal.on('hidden.bs.modal', () => {
      productModal.off('hidden.bs.modal', showOrderFormModal);
    });
  };

  const initProductSlider = () => {
    $('.js-modal-slider').slick({
      mobileFirst: true,
      arrows: false,
      dots: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    });
  };

  initProductSlider();
  recalculateBodyHeightProduct();
  changeStateProductModal();
  removeListenerOrderForm();
  showModalForm();
  onSubmitModalForm();
})();
