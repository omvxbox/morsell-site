$(document).ready(() => {

	let productSingleImages = $('.product__gallery').data('fancybox-groups')
	let productSingleImagesScroll = false
	if ((productSingleImages.videos.count == 0 && productSingleImages.images.count > 7) || (productSingleImages.videos.count > 0 && productSingleImages.images.count > 5)) {
		productSingleImagesScroll = true
	}

	const thumbs = new Swiper('.js-product-gallery-thumbs', {
		direction: 'vertical',
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: false,
		touchEventsTarget: 'container',
		threshold: 5,
		centeredSlides: Settings.product_variant_images ? false : productSingleImagesScroll,
		centeredSlidesBounds: Settings.product_variant_images ? false : productSingleImagesScroll,
		navigation: {
			nextEl: '.js-product-gallery-thumbs-down',
			prevEl: '.js-product-gallery-thumbs-up'
		},
		on: {
			init: () => {
				updateThumbsHeight()
				$('.product__gallery .product-gallery__thumbs').addClass('is-active')
			}
		}
	})

	const main = new Swiper('.js-product-gallery-main', {
		slidesPerView: 1,
		spaceBetween: 0,
		touchEventsTarget: 'container',
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		thumbs: {
			swiper: thumbs
		},
		pagination: {
			el: '.js-swiper-pagination-product',
			clickable: true
		},
		on: {
			activeIndexChange: (event) => {
				thumbs.slideTo(event.activeIndex, 400, () => { })
			}
		}
	})

	let fbxGroups = $('.product__gallery').data('fancybox-groups')

	let fbxSelector = '[data-fancybox="product-gallery"]'
	let fbxSettings = {
		loop: true,
		infobar: false,
		touch: true,
		transitionEffect: 'slide',
		baseClass: 'fancybox-is-gallery',
		clickSlide: false,
		buttons: [
			'close'
		],
		thumbs: {
			autoStart: true,
			hideOnClose: false,
			axis: 'y'
		},
		beforeShow: () => {
			if ($('.product__gallery').length > 0) {
				let imagesIndex = fbxGroups['images'].index
				let videosIndex = fbxGroups['videos'].index
				if ($('.fancybox-thumbs-group').length == 0) {
					if (imagesIndex != -1) {
						$('.fancybox-thumbs ul [data-index="' + imagesIndex + '"]').before('<div class="fancybox-thumbs-group for-images">' + fbxGroups['images'].title + '<span>' + fbxGroups['images'].count + '</span></div>')
					}
					if (videosIndex != -1) {
						$('.fancybox-thumbs ul [data-index="' + videosIndex + '"]').before('<div class="fancybox-thumbs-group for-videos">' + fbxGroups['videos'].title + '<span>' + fbxGroups['videos'].count + '</span></div>')
						$('.fancybox-thumbs-group.for-videos ~ li').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-icon" data-icon="play-circle"><path fill="currentColor" d="m371.7 238-176-107a24 24 0 0 0-35.7 21v208a24 24 0 0 0 35.7 21l176-101a24 24 0 0 0 0-42zM504 256a248 248 0 1 0-496 0 248 248 0 0 0 496 0zm-448 0a200 200 0 1 1 399.9-.1A200 200 0 0 1 56 256z"></path></svg>')
					}
				}
			}
		},
		afterShow: () => {
			if ($('.fancybox-thumbs-active').length > 0) {
				$('.fancybox-thumbs-active').get(0).scrollIntoView({
					behavior: 'smooth'
				})
			}
		}
	}

	$(fbxSelector).fancybox(fbxSettings)

	const productForm = '.product__form'
	let galleryItemsOld = $('.product__gallery').data('product-images') || '', galleryItemsNew
	let currentVariant = 0, currentVariantOldPrice, currentData

	function updateProductPrices(currentVariant, currentVariantOldPrice, currentData) {
		let parent = $(productForm)
		if (parent.length > 0) {
			let salePrice, oldPrice = currentVariantOldPrice, variantQuantity
			let data = Cart.order.getItemByID(currentVariant)
			if (data) {
				salePrice = Number(data.sale_price)
				variantQuantity = Number(data.quantity) || 1
			} else if (currentData) {
				data = currentData
				salePrice = Number(data.action.price)
				variantQuantity = Number(data.action.quantity.current) || 1
			}
			if (data) {
				//цены и скидки
				$('[data-ds-product-price]', parent).html(Shop.money.format(salePrice))
				if (oldPrice && oldPrice > salePrice) {
					$('[data-ds-product-old-price]', parent).html(Shop.money.format(oldPrice))
					$('[data-ds-product-discount]', parent).html('&minus;' + Math.round(100 - salePrice * 100 / oldPrice) + '%')
					$('[data-ds-product-discount-money]', parent).html(Shop.money.format(oldPrice - salePrice))
				}
				//бонусные баллы
				let bonuses = $('[data-ds-product-bonuses]', parent)
				if (bonuses.length > 0) {
					let bonusesSettings = bonuses.data('ds-product-bonuses')
					let bonusesPercent = Number(bonusesSettings['bonus_percent']) / 100
					let bonusesTotal = Math.floor(salePrice * variantQuantity * bonusesPercent)
					bonuses.html('+' + bonusesTotal + ' ' + declOfNum(bonusesTotal, Messages.bonuses))
				}
			}
		}
	}

	function updateThumbsHeight() {
		let thumbsTotal = $('.product__gallery .product-gallery__thumbs .swiper-slide').length
		let thumbsCount = thumbsTotal
		if ($('.product__gallery .product-gallery__videos').length > 0) {
			if (thumbsTotal > 5) {
				thumbsCount = 5
			}
		} else {
			if (thumbsTotal > 7) {
				thumbsCount = 7
			}
		}
		let thumbHeight = $('.product__gallery .product-gallery__thumbs').find('.thumb:first').height()
		let thumbsHeight = Math.round((thumbHeight * thumbsCount) + (--thumbsCount * 10))
		$('.product__gallery .product-gallery__thumbs').css({
			'--gallery-thumbs-height': thumbsHeight + 'px'
		})
	}

	let productWh = $('[data-product-warehouses]')
	let productWhData = productWh.data('product-warehouses')
	let productFirstInit = true

	EventBus.subscribe('update_variant:insales:product', (data) => {
		if (!data.action.product.is('[data-main-form]')) {
			return
		}
		let parent = $(productForm)
		if (parent.length > 0) {
			//обновляем цены, скидки и бонусы
			currentVariant = data.id
			currentVariantOldPrice = data.old_price
			currentData = data
			updateProductPrices(currentVariant, currentVariantOldPrice, currentData)
			//остатки
			$('[data-ds-product-quantity]', parent).html(data.quantity || '')
			//галерея
			if (Settings.product_variant_images) {
				let galleryImages = []
				if (data.image_ids.length > 0) {
					galleryItemsNew = data.image_ids.join(',')
					data.image_ids.forEach((image_id) => {
						galleryImages.push(data.action.productJSON.images.find(e => e.id === image_id));
					})
				} else {
					galleryItemsNew = ''
					galleryImages = data.action.productJSON.images
				}
				//считаем количество фото и видео
				fbxGroups['images'].index = (galleryImages.length > 0) ? 0 : -1
				fbxGroups['images'].count = galleryImages.length
				fbxGroups['videos'].index = galleryImages.length
				fbxGroups['videos'].count = data.action.productJSON.video_links.length
				if (galleryItemsOld != galleryItemsNew && !productFirstInit) {
					//обновляем превью
					thumbs.removeAllSlides()
					galleryImages.forEach((image) => {
						thumbs.appendSlide('<div class="swiper-slide">' + galleryThumbs[image.id] + '</div>')
					})
					//обновляем основные слайды
					main.removeAllSlides()
					galleryImages.forEach((image) => {
						main.appendSlide('<div class="swiper-slide">' + galleryMain[image.id] + '</div>')
					})
					main.update()
					main.thumbs.update()
					//обновляем лейзилоад и фансибокс
					lazyLoad.update()
					$(fbxSelector).fancybox(fbxSettings)
				}
				//проверяем нужна ли прокрутка в превью и центрирование
				if ($('.js-product-gallery-thumbs').length > 0) {
					if ((data.action.productJSON.video_links.length == 0 && galleryImages.length > 7) || (data.action.productJSON.video_links.length > 0 && galleryImages.length > 5)) {
						thumbs.params.centeredSlides = true
						thumbs.params.centeredSlidesBounds = true
					} else {
						thumbs.params.centeredSlides = false
						thumbs.params.centeredSlidesBounds = false
					}
					thumbs.update()
					updateThumbsHeight()
				}
				galleryItemsOld = galleryItemsNew
			} else {
				if (data.image_id) {
					main.slideTo($('[data-image-id="' + data.image_id + '"]').data('slide-index'))
				}
			}
			//выводим описание опций
			$('[data-option-label]', parent).each((index, item) => {
				let id = $(item).data('option-label')
				$(item).append($('.js-option-description-' + id).html())
			})
			//мультисклады если подключены
			if (productWh.length > 0) {
				productWh.hide()
				let wh_count = 0
				_.forEach(productWhData[data.id].warehouses, (value, key) => {
					if (value != 0) {
						wh_count++
						productWh.show()
					}
				})
				productWh.find('span').html(_.replace(declOfNum(wh_count, Messages.stores), '[count]', wh_count))
				productWh.data('product-warehouses-current', data.id)
			}
			//обновляем ссылку на WhatsApp
			let waButton = $('.js-product-quick-whatsapp', parent)
			if (waButton.length > 0) {
				let waProductHref = waButton.data('product-whatsapp-href')
				let waProductTitle = waButton.data('product-whatsapp-title')
				let waVariantTitle = ''
				if (data.title) {
					waVariantTitle = `${waProductTitle} (${data.title})`
					waButton.attr('href', encodeURI(_.replace(waProductHref, waProductTitle, waVariantTitle)))
				}
			}

			productFirstInit = false
		}
	})

	function fixProductButtons() {
		let productButtons = $('.js-product-buttons-fixed')
		let productButtonsTop = productButtons.offset().top
		let productButtonsHeight = productButtons.innerHeight()
		if ($(window).width() <= 768 && $(window).scrollTop() >= productButtonsTop + productButtonsHeight) {
			productButtons.css('height', productButtonsHeight).addClass('is-fixed')
		} else {
			productButtons.removeClass('is-fixed')
		}
	}

	function removeProductLoader(parent) {
		$('.js-product-loader', parent).addClass('is-loaded')
		$('.js-product-actions', parent).removeClass('is-hidden')
		$(window).on('scroll resize', fixProductButtons)
		fixProductButtons()
	}

	let productSwapVaraint = $(productForm).find('[data-swap-variant-ids]').data('swap-variant-ids') || ''
	if (productSwapVaraint != '') {
		$(document).one('swap_variant_product_complete', () => {
			removeProductLoader($(productForm))
		})
	}

	EventBus.subscribe('init_instance:insales:product', (data) => {
		if (!data.action.product.is('[data-main-form]')) {
			return
		}
		let parent = $(productForm)
		if (parent.length > 0) {
			if (productSwapVaraint == '') {
				removeProductLoader(parent)
			}
		}
	})

	EventBus.subscribe('update_items:insales:cart', () => {
		let parent = $(productForm)
		if (parent.length > 0) {
			updateProductPrices(currentVariant, currentVariantOldPrice, currentData)
		}
	})

	$(document).on('click', '.js-product-gallery-video', function (e) {
		e.preventDefault()
		let index = $(this).data('index')
		$('[data-product-gallery-video-index="' + index + '"]').trigger('click')
	})

	$('.js-product-bundle-related-toggle').on('click', function (e) {
		$(this).toggleClass('is-open')
		$(this).next().slideToggle(200)
	})

	// фикс высоты виджета с рассчетом доставки
	if (Site.template == 'product' && $('.delivery-widget').length > 0) {
		$(document).on('click', '[data-add-cart-counter-btn], [data-add-cart-counter-minus], [data-add-cart-counter-plus], .insales_widget-open_modal', () => {
			$('#insales_widget-delivery_info').css('min-height', $('#insales_widget-delivery_info').height())
		})
	}

	// после выбора города в виджете, меняем его в чекауте
	$(document).on('click', '.insales-autocomplete-address-result', () => {
		$('.insales_widget-modal_close').trigger('click')
		setTimeout(() => {
			let kladr = localStorage.getItem('InsalesAutocompleteAddress')
			let kladr_parse = JSON.parse(kladr)
			$.ajax({
				type: 'PUT',
				url: '/delivery/for_order.json?v2=true',
				data: 'shipping_address[kladr_json]=' + kladr + '&shipping_address[full_locality_name]=' + kladr_parse.result,
				dataType: 'json'
			})
		}, 200);
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
$(document).ready(() => {

	$(document).on('blur', '.js-review-content-input', () => {
		$('#review-content').val($('#review-content-comment').val().trim() + '*****' + $('#review-content-plus').val().trim() + '*****' + $('#review-content-minus').val().trim())
		if ($('#review-content').val() == '**********') {
			$('#review-content').val('')
		}
	})

	$(document).on('submit', '.js-comments-form', function (e) {
		e.preventDefault()
		let form = $(this)
		let formAction = $(this).attr('action')
		let formAlert = form.data('alert') || false
		let formCaptcha = form.find('[name="g-recaptcha-response"]') || false
		let formSend = true
		let formModerated = $(this).data('moderated')
		form.find('.js-feedback-alert').remove()
		if (formCaptcha.length && formCaptcha.val() == '') {
			form.prepend('<div class="form__item js-feedback-alert">' + templateLodashRender({}, 'alert-captcha') + '</div>')
			formSend = false
		}
		if (formSend) {
			let formData = new FormData(form[0])
			let formImage = form.find('[name="review[image_attributes][image]"]') || false
			if (formImage.length && formImage.val() != '') {
				formData.append("image_attributes][image", form.find('[name="review[image_attributes][image]"]')[0].files[0])
			}
			$.ajax({
				url: formAction,
				data: formData,
				type: 'post',
				contentType: false,
				cache: false,
				processData: false,
				dataType: 'json'
			}).fail((e) => {
				$.fancybox.close()
				msg.show(templateLodashRender({}, 'popup-error'))
			}).done((e) => {
				$.fancybox.close()
				if (e.status == 'ok' || e.comment) {
					msg.show(templateLodashRender({
						text: formAlert
					}, 'popup-success'))
					if (!formModerated) {
						setTimeout(() => {
							window.location.assign(window.location.origin + window.location.pathname + window.location.search + '#comments')
							window.location.reload()
						}, 1000)
					}
				} else {
					msg.show(templateLodashRender({}, 'popup-error'))
				}
			})
		}

	})

	$(document).on('click', '.js-product-comments', (e) => {
		e.preventDefault()
		$('[data-tabs-item="reviews"]').trigger('click')
		let scrollMargin = $('.js-header-main-sticky').outerHeight() + 20
		if ($('[data-tabs-content="reviews"]').length > 0) {
			$('[data-tabs-item="reviews"]').trigger('click')
			scrollToElement($('[data-tabs-content="reviews"]'), scrollMargin)
		} else {
			scrollToElement($('.reviews').closest('.section'), scrollMargin)
		}
	})

	if (location.hash == '#review_form' || location.hash == '#comment_form' || location.hash == '#comments') {
		let scrollMargin = $('.js-header-main-sticky').outerHeight() + 20
		if ($('[data-tabs-content="reviews"]').length > 0) {
			$('[data-tabs-item="reviews"]').trigger('click')
			scrollToElement($('[data-tabs-content="reviews"]'), scrollMargin)
		} else {
			scrollToElement($('.reviews').closest('.section'), scrollMargin)
		}
	}

	$(document).on('click', '.js-reviews-show-all', (e) => {
		e.preventDefault()
		$('.reviews-item.is-hidden').removeClass('is-hidden')
		$('.reviews-item__show-all').remove()
	})

})
;
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
  
  $('[data-fancybox="reviews"]').fancybox(fbxSettings)
  
})
;
$(document).ready(() => {

  $(document).on('click', '.js-share-copy', () => {
    let copyText = $('.js-share-url')
    navigator.clipboard.writeText(copyText.val().trim()).then(() => {
      $('.js-share-copy').hide()
      $('.js-share-success').show()
    }, () => {
      //что-то пошло не так
    })
  })

})
;





