$(document).ready(() => {

	$('.js-widget-slider').each(function () {
		let sliderPagination = '.js-swiper-pagination-' + $(this).data('slider-id')
		let sliderDelay = Number($(this).data('slider-delay')) || 0
		let swiperAutoplay = false
		if (sliderDelay != 0) {
			swiperAutoplay = {
				delay: sliderDelay,
				disableOnInteraction: false
			}
		}
		new Swiper(this, {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			autoplay: swiperAutoplay,
			touchEventsTarget: 'container',
			threshold: 5,
			navigation: {
				nextEl: '.js-widget-slider .swiper-button-next',
				prevEl: '.js-widget-slider .swiper-button-prev'
			},
			pagination: {
				el: sliderPagination,
				clickable: true
			}
		})
	})

	$('[data-slider-timer]').each((index, item) => {
		let output = $(item)
		let timer = new Date(output.data('slider-timer')).getTime()
		let interval = setInterval(() => {
			let now = new Date().getTime()
			let distance = timer - now
			let days = Math.floor(distance / (1000 * 60 * 60 * 24))
			let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			let seconds = Math.floor((distance % (1000 * 60)) / 1000)
			if (hours < 10) {
				hours = '0' + hours
			}
			if (minutes < 10) {
				minutes = '0' + minutes
			}
			if (seconds < 10) {
				seconds = '0' + seconds
			}
			output.html(days + ' ' + Messages.timer.days + ' ' + hours + ':' + minutes + ':' + seconds)
			if (distance < 0) {
				clearInterval(interval)
				output.html(Messages.timer.ended)
			}
		}, 1000)
		output.closest('.labels__item_type_timer').addClass('is-active')
	})

})
;
$(document).ready(() => {
  $('.js-widget-brands').each(function () {
    new Swiper(this, {
      slidesPerView: 8,
      spaceBetween: 20,
      touchEventsTarget: 'container',
      threshold: 5,
      navigation: {
        nextEl: '.js-widget-brands .swiper-button-next',
        prevEl: '.js-widget-brands .swiper-button-prev'
      },
      pagination: {
        el: '.js-widget-brands .swiper-pagination',
        clickable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 20
        },
        1025: {
          slidesPerView: 6,
          slidesPerGroup: 6,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 8,
          slidesPerGroup: 8,
          spaceBetween: 20
        }
      }
    })
  })
})
;
$(document).ready(() => {
	$('.js-reviews-widget-review').each(function () {
		let item = $(this)
		let maxHeight = parseInt(item.css('line-height'), 10) * 8
		let currentHeight = item.outerHeight()
		item.removeClass('is-overflow')
		if (currentHeight > maxHeight) {
			item.addClass('is-overflow')
		}
	})
})
;
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




