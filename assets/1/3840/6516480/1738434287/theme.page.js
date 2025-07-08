$(document).ready(() => {
  
  let fbxSettings = {
    loop: true,
    infobar: false,
    touch: true,
    transitionEffect: 'slide',
    baseClass: 'fancybox-is-gallery',
    clickSlide: false,
    buttons: [
      'close'
    ]
  }
  
  $('[data-fancybox="universal"]').fancybox(fbxSettings)
  
})
;
