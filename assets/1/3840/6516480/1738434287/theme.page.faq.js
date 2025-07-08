$(document).ready(() => {

  $(document).on('click', '[data-tabs-item]', function (e) {
    e.preventDefault()
    let tab = $(this)
    if (!tab.hasClass('is-active')) {
      let parent = tab.closest('.tabs')
      parent.find('[data-tabs-item]').removeClass('is-active')
      parent.find('[data-tabs-content]').removeClass('is-active')
      parent.find('[data-tabs-content="' + tab.data('tabs-item') + '"]').addClass('is-active')
      tab.addClass("is-active")
    }
  })

})
;
$(document).ready(() => {

  $(document).on('click', '.js-faq-toggle', function (e) {
    e.preventDefault()
    let parent = $(this).closest('.faq__item')
    parent.toggleClass('is-open')
    parent.find('.faq__content').slideToggle(200)
  })

})
;


