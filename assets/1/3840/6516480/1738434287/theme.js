function declOfNum (number, titles) {
	number = parseInt(number, 10)
	titles = (titles) ? titles : Messages.products
	cases = [2, 0, 1, 1, 1, 2]
	if (titles.length == 2) {
		return titles[(number === 1) ? 0 : 1]
	} else {
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
	}
}

let getUrlParameter = function r(t) { let e, i, n = window.location.search.substring(1).split('&'); for (i = 0; i < n.length; i++)if ((e = n[i].split('='))[0] === t) return void 0 === e[1] || decodeURIComponent(e[1]); return !1 }

function templateLodashRender(content, templateId) {
	let templateContent = $('[data-template-id="' + templateId + '"]').html()
	let renderContent = _.template(templateContent)
	return renderContent(content)
}

$.fancybox.defaults.idleTime = false
$.fancybox.defaults.hash = false
$.fancybox.defaults.backFocus = false
$.fancybox.defaults.animationDuration = 400
$.fancybox.defaults.animationEffect = 'fade'
$.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-icon" data-icon="arrow-left"><path fill="currentColor" d="m257.5 445.1-22.2 22.2a23.9 23.9 0 0 1-33.9 0L7 273a23.9 23.9 0 0 1 0-33.9L201.4 44.7a23.9 23.9 0 0 1 33.9 0l22.2 22.2a24 24 0 0 1-.4 34.3L136.6 216H424a24 24 0 0 1 24 24v32a24 24 0 0 1-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path><path fill="currentColor" d="m229.9 473.9 19.8-19.8a12 12 0 0 0 0-17L94.6 282H436a12 12 0 0 0 12-12v-28a12 12 0 0 0-12-12H94.6L249.7 74.9a12 12 0 0 0 0-17l-19.8-19.8a12 12 0 0 0-17 0L3.5 247.5a12 12 0 0 0 0 17L213 473.9a12 12 0 0 0 17 0z"></path></svg></button>'
$.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-icon" data-icon="arrow-right"><path fill="currentColor" d="m190.5 66.9 22.2-22.2a23.9 23.9 0 0 1 33.9 0L441 239a23.9 23.9 0 0 1 0 33.9L246.6 467.3a23.9 23.9 0 0 1-33.9 0l-22.2-22.2a24 24 0 0 1 .4-34.3L311.4 296H24a24 24 0 0 1-24-24v-32a24 24 0 0 1 24-24h287.4L190.9 101.2a23.9 23.9 0 0 1-.4-34.3z"></path><path fill="currentColor" d="m218.1 38.1-19.8 19.8a12 12 0 0 0 0 17L353.4 230H12a12 12 0 0 0-12 12v28a12 12 0 0 0 12 12h341.4L198.3 437.1a12 12 0 0 0 0 17l19.8 19.8a12 12 0 0 0 17 0l209.4-209.4a12 12 0 0 0 0-17L235 38.1a12 12 0 0 0-17 0z"></path></svg></button>'
$.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30"></path><path d="M10,10 L30,30 M30,10 L10,30"></path></svg></button>'

let globalFunctions = {}

let reCaptchaLoaded = false
let reCaptchaKey = $('[name="shop-config"]').data('config').recaptcha_key_v3
function loadReCaptcha(obj) {
	let script = document.createElement('script')
	script.src = 'https://www.google.com/recaptcha/api.js?hl=' + (Site['locale'] || 'ru')
	script.async = true
	script.onload = () => {
		grecaptcha.ready(() => {
			grecaptcha.render(obj, {
				'sitekey': reCaptchaKey
			})
			reCaptchaExecute(obj)
			reCaptchaLoaded = true
		})
	}
	document.body.appendChild(script)
}

function reCaptchaExecute(obj) {
	let reCaptchaItem = $(obj).find('.g-recaptcha-response').get(0)
	const matches = reCaptchaItem.id.match(/\d+$/)
	reCaptchaIndex = matches ? parseInt(matches[0]) : 0
	window.grecaptcha.execute(reCaptchaIndex)
}

let yaShareLoaded = false
function loadYaShare(obj) {
	let script = document.createElement('script')
	script.src = 'https://yastatic.net/share2/share.js'
	script.async = true
	script.onload = () => {
		Ya.share2(obj)
		yaShareLoaded = true
	}
	document.body.appendChild(script)
}

let userContacts = {
	fill: (profile) => {
		if ($('.js-profile-name').val() == '') {
			$('.js-profile-name').val(profile.client.name)
		}
		if ($('.js-profile-email').val() == '') {
			$('.js-profile-email').val(profile.client.email)
		}
		if ($('.js-profile-phone').val() == '') {
			$('.js-profile-phone').val(profile.client.phone)
		}
	}
}

let popupFeedback = {
	addition: (target) => {
		let cart = Cart.order.get()
		if (cart.order_lines.length > 0) {
			let cartItems = ''
			_.forEach(cart.order_lines, (value) => {
				cartItems += '<br><a href="' + (window.location.origin + value.product_url) + '">' + value.title + '</a><br>' + value.quantity + ' × ' + Shop.money.format(value.sale_price)
			})
			$(target).find('.js-feedback-fields-cart').val(cartItems)
		}
		$(target).find('.js-feedback-fields-url').val(window.location.href)
	}
}

let setMask = {
	phone: (target) => {
		if (Settings.module_phonemask != 'disabled') {
			let maskPhone = Site.mask[Settings.module_phonemask] || Site.mask[Site.locale] || Site.mask['ru']
			$(target).inputmask('mask', {
				inputmode: 'tel',
				mask: maskPhone['placeholder'],
				placeholder: '_',
				showMaskOnHover: false,
				clearIncomplete: true,
				onBeforePaste: (value, opts) => {
					let processedValue = value.replace(maskPhone['regex'], maskPhone['code'])
					return processedValue
				},
				onBeforeMask: (value, opts) => {
					let processedValue = value.replace(maskPhone['regex'], maskPhone['code'])
					return processedValue
				}
			})
    }
	}
}

let msg = {
	show: (content) => {
		$.fancybox.open({
			src: content,
			type: 'inline',
			touch: false,
			smallBtn: true,
			buttons: [],
			afterShow: (instance, current) => {
				//капча
				let captchaPlaceholder = '.js-popup-form .js-captcha-placeholder'
				if ($(current.src).find(captchaPlaceholder).length > 0) {
					if (reCaptchaLoaded) {
						grecaptcha.render($(captchaPlaceholder).get(0), {
							'sitekey': reCaptchaKey
						})
						reCaptchaExecute(captchaPlaceholder)
					} else {
						loadReCaptcha($(captchaPlaceholder).get(0))
					}
				}
				//автоматически заполняем контактыне данные
				if (Cookies.get('profile')) {
					let profile = JSON.parse(Cookies.get('profile'))
					userContacts.fill(profile)
				}
				//блок "Поделиться"
				let sharePlaceholder = '.js-popup-form .js-share-placeholder'
				if ($(current.src).find(sharePlaceholder).length > 0) {
					if (yaShareLoaded) {
						Ya.share2($(sharePlaceholder).get(0))
					} else {
						loadYaShare($(sharePlaceholder).get(0))
					}
				}
				//маска ввода для телефона
				let telInput = '[type="tel"]'
				if ($(current.src).find(telInput).length > 0) {
					setMask.phone(telInput)
				}
				//автоматически заполняем дополнительные поля (состав корзины, ссылка на страницу)
				popupFeedback.addition('.js-popup-form')
			}
		})
	}
}

$('.js-inline-form').each(function() {
	let current = $(this)
	//капча
  let captchaPlaceholder = '.js-captcha-placeholder'
	if (current.find(captchaPlaceholder).length > 0) {
		if (reCaptchaLoaded) {
			grecaptcha.render(current.find(captchaPlaceholder).get(0), {
				'sitekey': reCaptchaKey
			})
			reCaptchaExecute(captchaPlaceholder)
		} else {
			loadReCaptcha(current.find(captchaPlaceholder).get(0))
		}
	}
	//автоматически заполняем контактыне данные
	if (Cookies.get('profile')) {
		let profile = JSON.parse(Cookies.get('profile'))
		userContacts.fill(profile)
	}
	//маска ввода для телефона
	let telInput = '[type="tel"]'
	if (current.find(telInput).length > 0) {
		setMask.phone(telInput)
	}
	//автоматически заполняем дополнительные поля (состав корзины, ссылка на страницу)
	setTimeout(() => {
		popupFeedback.addition('.js-inline-form')
	}, 5000)
})

let lazyLoad = new LazyLoad({
	elements_selector: '.lazy',
	load_delay: 0
})

function scrollToElement(obj, margin = 0) {
	$('html, body').animate({
		scrollTop: obj.offset().top - parseInt(margin)
	}, 400)
}

Products.setConfig({
	decimal: {
		kgm: 1,
		mtr: 1
	}
})

function qrGenerate(target, url) {
	if (target.length > 0) {
		new QRCode(target.get(0), {
			text: url,
			width: 200,
			height: 200,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.M // L|M|Q|H
		})
	}
}

jQuery.event.special.touchstart={setup:function(e,t,s){this.addEventListener("touchstart",s,{passive:!t.includes("noPreventDefault")})}},jQuery.event.special.touchmove={setup:function(e,t,s){this.addEventListener("touchmove",s,{passive:!t.includes("noPreventDefault")})}},jQuery.event.special.wheel={setup:function(e,t,s){this.addEventListener("wheel",s,{passive:!0})}},jQuery.event.special.mousewheel={setup:function(e,t,s){this.addEventListener("mousewheel",s,{passive:!0})}}
;
$(() => {

	//получаем максимальную ширину экрана
	$(window).on('load resize', () => {
		$('body').css('--document-max-width', $(window).width() + 'px')
	})

	//после загрузки ставим класс, чтобы css анимации подключились
	$('body').addClass('is-loaded')

	//модальные окна
	$(document).on('click', '.js-msg-show', function (e) {
		e.preventDefault()
		let template = $(this).data('template')
		if (template.indexOf('popup-share-') != -1 && navigator.share && window.matchMedia('(max-width: 768px)').matches) {
			navigator.share({
				title: $('meta[property="og:title"]').attr('content') || $('title').text().trim(),
				text: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
				url: $('meta[property="og:url"]').attr('content') || $('link[rel="canonical"]').attr('href')
			})
		} else {
			if (template == 'popup-preorder' || template == 'popup-question' || template == 'popup-cheaper') {
				msg.show(templateLodashRender({
					product: $(this).attr('data-preorder-product-name'),
					variant: $(this).attr('data-preorder-variant'),
					url: $(this).attr('data-preorder-product-url')
				}, template))
			} else if (template == 'popup-warehouses') {
				msg.show(templateLodashRender({
					data: $(this).data('product-warehouses'),
					current: $(this).data('product-warehouses-current'),
					unit: $(this).data('product-warehouses-unit')
				}, template))
			} else if (template.indexOf('popup-share-') != -1) {
				msg.show(templateLodashRender({}, template))
				qrGenerate($('.share-qr__image'), $('.js-share-url').val())
			} else {
				msg.show(templateLodashRender({}, template))
			}
		}
	})

	//заказ в 1 клик (fix)
	$(document).on('click', '.m-modal', function (e) {
		if ($(e.target).hasClass('m-modal')) {
			$('.m-overlay').trigger('click')
		}
	})
	
	//заказ в 1 клик (captcha)
	if($('#quick-checkout-recaptcha').length > 0) {
		$('#quick-checkout-recaptcha').closest('.co-input--captcha').append(templateLodashRender({}, 'popup-captcha'))
	}

	//маска ввода для телефона в заказе в 1 клик
	let quickCheckoutPhoneInput = '#quick_checkout_form [type="tel"]'
	if ($(quickCheckoutPhoneInput).length > 0) {
		setMask.phone(quickCheckoutPhoneInput)
	}

	//qr для социальных сетей
	$(document).on('click', '[data-social-qr]', function (e) {
		if (window.matchMedia('(min-width: 768px)').matches) {
			e.preventDefault()
			msg.show(templateLodashRender($(this).data('social-qr'), 'social-qr'))
			qrGenerate($('.social-qr__image'), $(this).attr('href'))
		}
	})

	//смена валюты
	$('.js-currency-change').on('click', function (e) {
		e.preventDefault()
		$.ajax({
			method: 'POST',
			url: '/site_currencies/update_current',
			data: {
				site_currency_code: $(this).data('currency')
			},
			dataType: 'dataType',
			success: () => {
				window.location.reload()
			},
			error: () => {
				window.location.reload()
			}
		})
	})

	//свертывание меню в три точки
	$('.js-cut-list').cutList({
		moreBtnTitle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-icon" data-icon="ellipsis"><path fill="currentColor" d="M304 256a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm120-48a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm-336 0a48 48 0 1 0 0 96 48 48 0 0 0 0-96z"/></svg>',
		showMoreOnHover: true,
		risezeDelay: 100
	}).addClass('is-init')

	//таймеры
	$('[data-timer]').each((index, item) => {
		let infinity = false
		let output = $(item)
		let timer = new Date(output.data('timer')).getTime()
		if (output.data('timer') == 'infinity') {
			infinity = true
			timer = new Date().setHours(23,59,59)
		}
		if (!isNaN(timer)) {
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
				if (infinity) {
					output.html(hours + ':' + minutes + ':' + seconds)
					if (distance < 0) {
						timer = new Date().setHours(23,59,59)
					}
				} else {
					output.html(days + ' ' + Messages.timer.days + ' ' + hours + ':' + minutes + ':' + seconds)
					if (distance < 0) {
						clearInterval(interval)
						output.html(Messages.timer.ended)
					}
				}
			}, 1000)
		} else {
			output.html(Messages.timer.ended)
		}
		output.closest('.labels__item_type_timer').addClass('is-active')
	})

	//скрытие больших текстов
	$(document).on('click', '.js-text-hidden-toggle', function (e) {
		e.preventDefault()
		let target = $(this).closest('.js-text-hidden')
		target.toggleClass('is-open')
		if (!target.hasClass('is-open')) {
			let scrollMargin = $('.js-header-main-sticky').outerHeight() + 20
			scrollToElement(target, scrollMargin)
		}
	})

})
;
$(document).ready(() => {

	let $navType = $('[data-nav]').data('nav') || ''
	let $navTimer = false
	let $navTrigger = $('.js-nav-trigger')
	let $navClose = $('.js-nav-close')
	let $navClosePosition = 0
	let $navTargetAction = $('[data-nav-action]').data('nav-action') || 'click'
	let $navTargetStop = false
	let $navTargetDelay = ($navTargetAction == 'click') ? 10 : 200

	$navTrigger.on($navTargetAction, function (e) {
		navMaxHeightSet()
		$navTargetStop = false
		if ($(this).hasClass('header-nav__inline') && $navTargetAction == 'click') {
			return false
		}
		if ($(this).hasClass('hamburger__trigger') && $(this).hasClass('is-open') && $navTargetAction == 'click') {
			navClose()
		} else {
			if (!$navTargetStop) {
				if ($navTimer != false) {
					clearTimeout($navTimer)
				}
				$navTimer = setTimeout(() => {
					$navTrigger.addClass('is-open is-visible')
					$navTimer = false
				}, $navTargetDelay)
			}
		}
	}).on('mouseleave', function (e) {
		if (($(this).hasClass('header-nav__inline') && $navTargetAction == 'click') || ($navType == 'sidebar' && $navTargetAction == 'mouseenter')) {
			return false
		}
		if (!$navTargetStop) {
			if ($navTargetAction != 'click') {
				if ($navTimer != false) {
					clearTimeout($navTimer)
				}
				$navTimer = setTimeout(() => {
					$navTrigger.removeClass('is-open')
					$navTimer = false
					$navTargetStop = false
				}, $navTargetDelay)
			}
		}
	})

	function navCutItems() {
		if ($navType == 'inline') {
			let prevItem = null
			let lastItem = null
			let width = $('[data-nav]').width()
			let hideAllNext = false
			let lastShow = false
			let moreWidth = $('[data-nav-item="0"]').width() + 20
			$('[data-nav]').addClass('is-overflow')
			$('[data-nav] > ul > li').each((index, item) => {
				let id = $(item).data('nav-item')
				$(item).removeClass('is-hidden')
				if (!hideAllNext) {
					if ($(item).position().left + $(item).width() + moreWidth > width) {
						hideAllNext = true
					}
				}
				if (hideAllNext) {
					$(item).addClass('is-hidden')
					$('[data-nav-item="0"] [data-nav-item="' + id + '"]').removeClass('is-hidden')
				} else {
					$('[data-nav-item="0"] [data-nav-item="' + id + '"]').addClass('is-hidden')
				}
				if (prevItem) {
					if ($('[data-nav] > ul > li').length == index + 1) {
						lastShow = false
						$(prevItem).removeClass('is-hidden')
						if ($(prevItem).position().left + $(prevItem).width() <= width) {
							lastShow = true
							lastItem = prevItem
						}
						$(prevItem).addClass('is-hidden')
					}
				}
				prevItem = item
			})
			if (hideAllNext) {
				$('[data-nav-item="0"]').removeClass('is-hidden')
			} else {
				$('[data-nav-item="0"]').addClass('is-hidden')
			}
			if (lastShow && $('[data-nav-item="0"] > [data-nav-submenu] > ul > li:not(.is-hidden)').length == 1 || $('[data-nav-item="0"] > [data-nav-submenu] > ul > li:not(.is-hidden)').length == 0) {
				$(lastItem).removeClass('is-hidden')
				$('[data-nav-item="0"]').addClass('is-hidden')
			}
			$('[data-nav]').removeClass('is-overflow')
		}
	}

	function navClose() {
		$navTargetStop = true
		if ($navTimer != false) {
			clearTimeout($navTimer)
		}
		$navTrigger.removeClass('is-open')
		$navTimer = false
		$('[data-nav] [data-nav-item]').removeClass('is-open')
		if ($navType == 'sidebar') {
			$('.nav-shade').css({
				'--close-position': $('[data-nav="sidebar"]').width() + 'px'
			})
		}
	}

	if ($navTargetAction == 'click' || $navType == 'sidebar') {
		$navClose.on('click', () => {
			navClose()
		})
		$('[data-nav] [data-nav-item]').on('mouseenter', function () {
			if ($navTargetAction == 'click' && $navType == 'inline') {
				$navTargetStop = false
			}
			if ($navType == 'sidebar') {
				$navTargetStop = false
			}
			if (!$navTargetStop) {
				if (!$(this).hasClass('is-open')) {
					$(this).closest('ul').find('[data-nav-item]').removeClass('is-open')
					if ($(this).children('[data-nav-submenu]').length > 0) {
						$(this).addClass('is-open')
					}
				}
				if ($navType == 'sidebar') {
					$navClosePosition = $('[data-nav="sidebar"]').width()
					$('.is-open > [data-nav-submenu]').each(function () {
						if ($(this).css('position') != 'static') {
							$navClosePosition += $(this).width()
						}
					})
					$('.nav-shade').css({
						'--close-position': $navClosePosition + 'px'
					})
				}
			}
		})
	}

	$(document).on('click', (e) => {
		if ($navType == 'dropdown') {
			if ($navTargetAction == 'click' && !$(e.target).hasClass('js-nav-trigger') && $(e.target).closest('.js-nav-trigger').length == 0) {
				$('.js-nav-trigger.is-open:first').trigger('click')
			}
		}
		if ($navType == 'inline') {
			if ($navTargetAction == 'click' && !$(e.target).hasClass('js-nav-trigger') && $(e.target).closest('.js-nav-trigger').length == 0) {
				$('.js-nav-trigger.is-open:first').trigger('click')
			}
		}
	})

	function navMaxHeightSet() {
		let navMaxHeight = '80vh'
		if ($navType == 'inline') {
			navMaxHeight = $(window).height() - ($('.header-nav').offset().top - $(window).scrollTop() + $('.header-nav').height()) + 'px'
		}
		if ($navType == 'dropdown') {
			navMaxHeight = $(window).height() - ($('.header-nav').offset().top - $(window).scrollTop()) + 'px'
		}
		$('html').css({
			'--nav-max-height': navMaxHeight
		})
	}

	$(window).on('resize', () => {
		navCutItems()
	})
	navCutItems()

	$.each(Site.current_collections, (index, item) => {
		$('[data-nav] [data-nav-item="' + item.id + '"]').addClass('is-active')
	})

	$('.js-header-main-sticky').hcSticky({
		top: 0,
		stickTo: 'body',
		stickyClass: 'is-sticky',
		responsive: {
			1024: {
				disable: true
			}
		}
	})

	$('.js-header-nav-sticky').hcSticky({
		top: $('.js-header-main-sticky').outerHeight(),
		stickTo: 'body',
		stickyClass: 'is-sticky',
		responsive: {
			1024: {
				disable: true
			}
		}
	})

	$('[data-nav="inline"]').on('mouseenter', function (e) {
		$(this).addClass('is-visible')
		if ($navTargetAction == 'click') {
			$navTrigger.addClass('is-open is-visible')
		}
	})

	$('.js-header-toggled-element').each((index, item) => {
		let width = $(item).outerWidth()
		$(item).parent().css({
			'--max-width': width + 'px'
		})
	})

})
;
$(document).ready(() => {
  $('.js-search-reset').on('click', (e) => {
    e.preventDefault()
    $(e.target).closest('.js-search-form').find('input[name="q"]').val('').trigger('focus')
    if ($('body').hasClass('is-search-focus')) {
      $(e.target).closest('.js-search-form').find('input[name="q"]').focus('')
    }
    $('.autocomplete-suggestions').html('')
    $('.autocomplete-suggestions-total').remove()
    $('.autocomplete-no-suggestion').hide()
  })
})
;
$(document).ready(() => {

	const toolbarCartTitle = $('.js-toolbar-cart-title').html()

	EventBus.subscribe('update_items:insales:cart', (data) => {
		$('.js-toolbar-cart').html(templateLodashRender(data, 'toolbar-cart'))
		if (Site.current_url == '/new_order') {
			$('.checkout-coupon').remove()
			$('.co-basket_subtotal-list').prepend(templateLodashRender(data, 'checkout-coupon'))
			$('.checkout-coupon').show()
		}
		if (data.items_count > 0) {
			$('.js-toolbar-cart-header').html('(' + data.items_count + '): ' + Shop.money.format(data.total_price)).show()
			$('.js-toolbar-cart-title').html(Shop.money.format(data.total_price))
			if (Site.template == 'cart') {
				$.each(data.order_lines, (index, item) => {
					let itemParent = $('.js-cart-item[data-item-id="' + item.id + '"]')
					$('.js-cart-item-quantity', itemParent).html(item.quantity)
					$('.js-cart-item-sale-price', itemParent).html(Shop.money.format(item.sale_price))
					$('.js-cart-item-total-price', itemParent).html(Shop.money.format(item.total_price))
				})
				$('.js-cart-check-total-price').html(Shop.money.format(data.total_price))
				$('.js-cart-check-items-count').html(data.items_count + ' ' + declOfNum(data.items_count))
				if (data.discounts.length > 0) {
					$('.js-cart-check-discounts').show()
					$('.js-cart-check-discounts-amount').html('&minus;' + Shop.money.format(data.discounts[0].amount))
					$('.js-cart-check-discounts-description').html(data.discounts[0].description)
				} else {
					$('.js-cart-check-discounts').hide()
				}
				if (data.errors.length > 0) {
					$('.js-cart-check-coupon-error').html(data.errors[0]).show()
				} else {
					$('.js-cart-check-coupon-error').hide()
				}
				if (data.coupon) {
					$('.js-cart-check-coupon-input').val(data.coupon.value)
				} else {
					$('.js-cart-check-coupon-input').val('')
				}
				//бонусные баллы
				let bonuses = $('[data-ds-cart-bonuses]')
				if (bonuses.length > 0) {
					let bonusesSettings = bonuses.data('ds-cart-bonuses')
					let bonusesPercent = Number(bonusesSettings['bonus_percent']) / 100
					let bonusesTotal = Math.floor(data.total_price * bonusesPercent)
					bonuses.html('+' + bonusesTotal + ' ' + declOfNum(bonusesTotal, Messages.bonuses))
				}
			}
			if (Site.current_url == '/new_order') {
				window.debounced_deliveries()
			}
		} else {
			$('.js-toolbar-cart-header').hide()
			$('.js-toolbar-cart-title').html(toolbarCartTitle)
			if (Site.template == 'cart') {
				$('.js-page-cart').html(templateLodashRender(data, 'page-cart'))
			}
			if (Site.current_url == '/new_order') {
				location.reload()
			}
		}
	})

	EventBus.subscribe('delete_items:insales:cart', (data) => {
		$.each(data.action.items, (index, item) => {
			$('.js-cart-item[data-item-id="' + item + '"]').remove()
		})
	})

	$(document).on('change', '[name="cart[coupon]"]', function () {
		let form = $(this).closest('form')
		if ($(this).val() != '' && $(this).val() != ' ') {
			//$('[data-coupon-submit]', form).trigger('click')
		} else {
			$(this).val('')
			Cart.setCoupon({
				coupon: ' '
			})
		}
	})

	$(document).on('click', '[data-coupon-clear]', function () {
		let form = $(this).closest('form')
		form.find('[name="cart[coupon]"]').val('').trigger('change')
	})

	$(document).on('click', '[data-item-delete]', function () {
		$(this).prop('disabled', true).find('svg').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-icon" data-icon="spinner"><path fill="currentColor" d="m460.1 373.8-20.8-12a12 12 0 0 1-4.7-15.8 200.4 200.4 0 0 0-5.4-190 200.4 200.4 0 0 0-161.8-99.7 12 12 0 0 1-11.4-12v-24a12 12 0 0 1 12.7-12A248.5 248.5 0 0 1 470.8 132c42 72.7 44 162.3 6 236.8a12 12 0 0 1-16.7 5z"/></svg>')
	})

	EventBus.subscribe('add_items:insales:cart:light', () => {
		if (Site.template == 'cart') {
			window.location.reload()
		}
	})

	// сообщение о пересчете коризны если не все товары доступны для заказа
	let cartOverload = true
	EventBus.subscribe('max:quantity:insales:product', () => {
		if (cartOverload) {
			msg.show(templateLodashRender({}, 'popup-cart-overload'))
			cartOverload = false
		}
	})

	// показываем фиксированную кнопку оформления заказа при прокрутке, если не видно основного блока
	function fixCartButtons () {
		let cartButtons = $('.cart-check').get(0).getBoundingClientRect()
		if ($(window).width() <= 767 && (cartButtons.top > $(window).height() || cartButtons.bottom < 50)) {		
			$('.js-cart-buttons-fixed').addClass('is-fixed')
		} else {
			$('.js-cart-buttons-fixed').removeClass('is-fixed')
		}
	}
	if ($('.js-cart-buttons-fixed').length > 0) {
		$(window).on('scroll resize', fixCartButtons)
		fixCartButtons()
	}

})
;
$(document).ready(() => {

  const swiper = new Swiper('.js-products-swiper', {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 20,
    loop: false,
    touchEventsTarget: 'container',
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
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
        spaceBetween: 10
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20
      },
      1025: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20
      }
    },
    on: {
      init: (event) => {
        $(event.el).css({
          '--swiper-thumb-height': $(event.el).find('.thumb:first').height()+'px'
        })
      }
    }
  })

})
;
$(document).ready(() => {

  $(document).on('submit', '.js-feedback-form', function (e) {
    e.preventDefault()
    let form = $(this)
    let formAlert = form.data('alert') || false
    let formFields = ''
    let formContent = form.find('[name="feedback[content]"]')
    let formSubject = form.find('[name="feedback[subject]"]')
    let formCaptcha = form.find('[name="g-recaptcha-response"]') || false
    form.find('.js-feedback-alert').remove()
    let formSend = true
    if (formCaptcha.length && formCaptcha.val() == '') {
      form.prepend('<div class="form__item js-feedback-alert">' + templateLodashRender({}, 'alert-captcha') + '</div>')
      formSend = false
    }
    if (formSend) {
      form.addClass('in-progress')
      form.find('.js-feedback-fields').each(function () {
        if ($(this).val() != '') {
          formFields += $(this).data('title') + ': ' + $(this).val() + '<br><br>'
        }
      })
      if (formFields != '') {
        formContent.val(formFields)
      } else {
        formContent.val(formSubject.val())
      }
      $.ajax({
        url: '/client_account/feedback.json',
        data: form.serialize(),
        type: 'post',
        dataType: 'json'
      }).fail((e) => {
        $.fancybox.close()
        msg.show(templateLodashRender({}, 'popup-error'))
      }).done((e) => {
        $.fancybox.close()
        if (e.status == 'ok') {
          msg.show(templateLodashRender({
            text: formAlert
          }, 'popup-success'))
        } else {
          msg.show(templateLodashRender({}, 'popup-error'))
        }
      })
    }
  })
  
  $(document).on('click', '.js-rating-change [data-icon]', function () {
    let item = $(this)
    let parent = item.closest('.js-rating-change')
    let type = item.data('icon')
    let rate = item.index() + 1
    let input = parent.find('input')
    let rating = parent.find('[data-rating]')
    if (type == 'star') {
      input.val(rate)
      rating.attr('data-rating', rate)
    }
    if (type == 'times') {
      input.val(0)
      rating.attr('data-rating', 0)
    }
  })

})
;
$(document).ready(() => {

  $(document).on('click', '.js-toolbar-item-trigger', function (e) {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      e.preventDefault()
      let parent = $(this).parent()
      parent.toggleClass('is-open')
      $('.js-toolbar').toggleClass('is-active')
      if (parent.data('toolbar-item') == 'search' && parent.hasClass('is-open')) {
        let el = parent.find('[name="q"]')
        let tempEl = document.createElement('input');
        tempEl.style.position = 'fixed';
        tempEl.style.top = 0;
        tempEl.style.left = 0;
        tempEl.style.height = 0;
        tempEl.style.opacity = 0;
        document.body.appendChild(tempEl);
        tempEl.focus();
        setTimeout(() => {
          el.focus();
          el.click();
          document.body.removeChild(tempEl);
        }, 400);
      }
      if ($('.js-toolbar').hasClass('is-active')) {
        $('body').addClass('is-overflow')
      }
    }
  })

  $(document).on('click', '[data-toolbar-mobile-close]', function (e) {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      e.preventDefault()
      $('.js-toolbar .toolbar-item.is-open').removeClass('is-open')
      $('.js-toolbar').removeClass('is-active')
      $('body').removeClass('is-overflow')
    }
  })

  $(document).on('click', '.js-toolbar-footer-item-trigger', function (e) {
    e.preventDefault()
    let target = $(this).closest('[data-toolbar-footer-item]').data('toolbar-footer-item')
    $('[data-toolbar-item="' + target + '"] .js-toolbar-item-trigger').trigger('click')
  })

})
;
$(document).ready(() => {

	$(document).on('click', '.js-mobile-menu-trigger', function (e) {
		e.preventDefault()
		$('.js-mobile-menu').toggleClass('is-active')
		if ($('.js-mobile-menu').hasClass('is-active')) {
			$('body').addClass('is-overflow')
		}
	})

	$(document).on('click', '.js-mobile-menu-close', function (e) {
		e.preventDefault()
		$('.js-mobile-menu').removeClass('is-active')
		$('body').removeClass('is-overflow')
	})

	$(document).on('click', '.js-mobile-collections-toggle', function (e) {
		e.preventDefault()
		let parent = $(this).closest('[data-nav-item]')
		parent.toggleClass('is-open')
	})

	/*$(document).on('click', '.js-mobile-pages-toggle', function (e) {
		if (e.target.className != 'js-mobile-pages-toggle') {
			e.preventDefault()
			let parent = $(this).closest('.mobile-pages__item')
			parent.toggleClass('is-open')
		}
	})*/

	$(document).on('click', '.js-mobile-menu-swap', function (e) {
		e.preventDefault()
		if ($(this).data('target') == 'mobile-menu') {
			$('[data-toolbar-item].is-open').find('[data-toolbar-mobile-close]').trigger('click')
			$('.js-mobile-menu-trigger').trigger('click')
		} else {
			$('.js-mobile-menu-trigger').trigger('click')
			$('[data-toolbar-item="' + $(this).data('target') + '"] .js-toolbar-item-trigger').trigger('click')
		}
	})

	$.each(Site.current_collections, (index, item) => {
		$('.mobile-collections [data-nav-item="' + item.id + '"]').addClass('is-active is-open')
	})

	$.each(Site.current_collections_all, (index, item) => {
		$('.mobile-collections [data-nav-item="' + item.id + '-all"]').addClass('is-active is-open')
	})

})
;










