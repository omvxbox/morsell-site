$(document).ready(() => {

	if (Settings['module_quickview']) {

		const quickviewTrigger = '[data-quickview]'
		const quickviewForm = '.quickview__form'
		const quickviewList = {}
		let galleryItemsOld, galleryItemsNew
		let gallerySwiper

		let quickItems = []
		let quickVideosThumbs = []

		let fbxGroups

		let fbxSelector = '[data-fancybox="quickview-gallery"]'
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
				if ($('.quickview__gallery').length > 0) {
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

		let quickview = {
			collect: () => {
				quickItems = _.map($(quickviewTrigger), (e) => $(e).data('quickview'))
			},
			get: (id, jsonData) => {
				galleryItemsOld = '0'
				galleryItemsNew = ''
				$.fancybox.open({
					src: templateLodashRender({}, 'quickview-preloader'),
					type: 'inline',
					touch: false,
					backFocus: false,
					smallBtn: true,
					afterShow: () => {
						//window.addEventListener('keydown', quickview.keydown)
					},
					afterClose: () => {
						//window.removeEventListener('keydown', quickview.keydown)
					}
				})
				if (quickviewList[id]) {
					quickview.show(id, jsonData)
				} else {
					Products.get(id).done((data) => {
						quickviewList[id] = data
						quickview.show(id, jsonData)
					}).fail(() => {
						$.fancybox.close()
					})
				}
			},
			show: (id, jsonData) => {
				quickview.collect()
				let length = quickItems.length
				let index = _.indexOf(quickItems, id)
				let prevId = '', nextId = ''
				if (length >= 2) {
					prevId = quickItems[index - 1]
					nextId = quickItems[index + 1]
					if (index == 0) {
						prevId = quickItems[length - 1]
					}
					if (index == length - 1) {
						nextId = quickItems[0]
					}
					if ($('[data-quickview-swipe]').length > 0) {
						$('[data-quickview-swipe].is-prev').data('quickview-swipe', prevId)
						$('[data-quickview-swipe].is-next').data('quickview-swipe', nextId)
					} else {
						$('.js-quickview-swipe').html(templateLodashRender({
							prevId: prevId,
							nextId: nextId
						}, 'quickview-swipe'))
					}
				}
				$('.js-quickview-container').html(templateLodashRender({
					product: quickviewList[id],
					jsonData: jsonData,
				}, 'quickview-content'))
				quickVideosThumbs = jsonData.videos || []
				Products.initInstance($(quickviewForm)).done(() => {
					if (jsonData.swap_ids) {
						$(document).one('swap_variant_quickview_complete', () => {
							quickview.resize()
						})
						globalFunctions.SwapVariantsQuickview($('[data-quickview-form]'), 'quickview')
					} else {
						quickview.resize()
					}
					FavoritesProducts.update()
					Compare.update()
				}).fail(() => {
					$.fancybox.close()
				})
				globalFunctions.recentlyQuickview(id)
			},
			gallery: (images, videos) => {
				$('.js-quickview-gallery').html(templateLodashRender({
					images: images,
					videos: videos,
					thumbs: quickVideosThumbs
				}, 'quickview-gallery'))
				fbxGroups = $('.quickview__gallery').data('fancybox-groups')
				fbxGroups['images'].index = (images.length > 0) ? 0 : -1
				fbxGroups['images'].count = images.length
				fbxGroups['videos'].index = images.length
				fbxGroups['videos'].count = videos.length
				if (images.length > 0) {
					gallerySwiper = new Swiper('.js-quickview-swiper', {
						slidesPerView: 1,
						slidesPerGroup: 1,
						spaceBetween: 0,
						loop: false,
						touchEventsTarget: 'container',
						pagination: {
							el: '.js-swiper-pagination-quickview',
							clickable: true
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev'
						},
						on: {
							init: () => {
								lazyLoad.update()
							}
						}
					})
				}
				$(fbxSelector).fancybox(fbxSettings)
			},
			swipe: (id) => {
				$('.js-quickview').removeClass('is-init')
				$('[data-quickview-swipe]').prop('disabled', true)
				setTimeout(() => {
					galleryItemsOld = '0'
					galleryItemsNew = ''
					let jsonData = $('[data-quickview="' + id + '"]').data('quickview-json')
					if (quickviewList[id]) {
						quickview.show(id, jsonData)
					} else {
						Products.get(id).done((data) => {
							quickviewList[id] = data
							quickview.show(id, jsonData)
						}).fail(() => {
							$.fancybox.close()
						})
					}
				}, 200)
			},
			keydown: (event) => {
				switch (event.key) {
					case "ArrowLeft":
						$('[data-quickview-swipe].is-prev').trigger('click')
						break
					case "ArrowRight":
						$('[data-quickview-swipe].is-next').trigger('click')
						break
				}
			},
			resize: () => {
				$('.js-quickview-container').animate({
					'min-height': $(quickviewForm).height()
				}, 200, () => {
					$('.js-quickview').addClass('is-init')
					$('.js-quickview-swipe').addClass('is-show')
					$('[data-quickview-swipe]').prop('disabled', false)
				})
			}
		}

		$(document).on('click', quickviewTrigger, function (e) {
			e.preventDefault()
			quickview.get($(this).data('quickview'), $(this).data('quickview-json'))
		})

		$(document).on('click', '[data-quickview-swipe]', function (e) {
			e.preventDefault()
			quickview.swipe($(this).data('quickview-swipe'))
		})

		$(document).on('click', '.js-quickview-gallery-video', function (e) {
			e.preventDefault()
			let index = $(this).data('index')
			$('[data-quickview-gallery-video-index="' + index + '"]').trigger('click')
		})

		let currentVariant = 0, currentVariantOldPrice, currentData

		function updateQuickviewPrices(currentVariant, currentVariantOldPrice, currentData) {
			let parent = $(quickviewForm)
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

		EventBus.subscribe('update_variant:insales:product', (dataQuickview) => {
			if (!dataQuickview.action.product.is('[data-quickview-form]')) {
				return
			}
			let parent = $(quickviewForm)
			if (parent.length > 0) {
				//обновляем цены, скидки и бонусы
				currentVariant = dataQuickview.id
				currentVariantOldPrice = dataQuickview.old_price
				currentData = dataQuickview
				updateQuickviewPrices(currentVariant, currentVariantOldPrice, currentData)
				//типы цен
				if (currentData.available) {
						if (!currentData.quantity) {
							if (!currentData.price2) {
								$('[data-price-types_for_two]').addClass("is-hidden");
							}
							$('[data-product-price2]').html(Shop.money.format(currentData.price2));
							$('[data-product-price2-discount]').html(Math.round(((currentData.price - currentData.price2)/currentData.price)*100));
							if (!currentData.price3) {
								$('[data-price-types_for_five]').addClass("is-hidden");
							}
							$('[data-product-price3]').html(Shop.money.format(currentData.price3));
							$('[data-product-price3-discount]').html(Math.round(((currentData.price - currentData.price3)/currentData.price)*100));
							if (!currentData.price4) {
								$('[data-price-types_for_ten]').addClass("is-hidden");
							}
							$('[data-product-price4]').html(Shop.money.format(currentData.price4));
							$('[data-product-price4-discount]').html(Math.round(((currentData.price - currentData.price4)/currentData.price)*100));
						} else {
							if (!currentData.price2 || currentData.quantity < 2) {
								$('[data-price-types_for_two]').addClass("is-hidden");
							}
							$('[data-product-price2]').html(Shop.money.format(currentData.price2));
							$('[data-product-price2-discount]').html(Math.round(((currentData.price - currentData.price2)/currentData.price)*100));
							if (!currentData.price3 || currentData.quantity < 3) {
								$('[data-price-types_for_five]').addClass("is-hidden");
							}
							$('[data-product-price3]').html(Shop.money.format(currentData.price3));
							$('[data-product-price3-discount]').html(Math.round(((currentData.price - currentData.price3)/currentData.price)*100));
							if (!currentData.price4 || currentData.quantity < 5) {
								$('[data-price-types_for_ten]').addClass("is-hidden");
							}
							$('[data-product-price4]').html(Shop.money.format(currentData.price4));
							$('[data-product-price4-discount]').html(Math.round(((currentData.price - currentData.price4)/currentData.price)*100));
						}
				} else {
						$('[data-price-types_for_two]').addClass("is-hidden");
						$('[data-price-types_for_five]').addClass("is-hidden");
						$('[data-price-types_for_ten]').addClass("is-hidden");
				}
				//остатки
				$('[data-ds-product-quantity]', parent).html(dataQuickview.quantity || '')
				//галерея
				let galleryImages = []
				let galleryVideos = dataQuickview.action.productJSON.video_links
				if (Settings.product_variant_images) {
					if (dataQuickview.image_ids.length > 0) {
						galleryItemsNew = dataQuickview.image_ids.join(',')
						dataQuickview.image_ids.forEach((image_id) => {
							galleryImages.push(dataQuickview.action.productJSON.images.find(e => e.id === image_id));
						})
					} else {
						galleryItemsNew = ''
						galleryImages = dataQuickview.action.productJSON.images
					}
					if (galleryItemsOld != galleryItemsNew) {
						quickview.gallery(galleryImages, galleryVideos)
					}
					galleryItemsOld = galleryItemsNew
				} else {
					galleryImages = dataQuickview.action.productJSON.images
					if (galleryItemsOld != galleryItemsNew) {
						quickview.gallery(galleryImages, galleryVideos)
					}
					galleryItemsOld = galleryItemsNew
					if (dataQuickview.image_id) {
						gallerySwiper.slideTo($('[data-image-id="' + dataQuickview.image_id + '"]', parent).data('slide-index'));
					}
				}
				//мультисклады если подключены
				let productWh = $('[data-product-warehouses]', parent)
				let productWhData = productWh.data('product-warehouses')
				if (productWh.length > 0) {
					productWh.hide()
					let wh_count = 0
					_.forEach(productWhData[dataQuickview.id].warehouses, (value, key) => {
						if (value != 0) {
							wh_count++
							productWh.show()
						}
					})
					productWh.find('span').html(_.replace(declOfNum(wh_count, Messages.stores), '[count]', wh_count))
					productWh.data('product-warehouses-current', dataQuickview.id)
				}
				//обновляем ссылку на WhatsApp
				let waButton = $('.js-quickview-quick-whatsapp', parent)
				if (waButton.length > 0) {
					let waProductHref = waButton.data('product-whatsapp-href')
					let waProductTitle = waButton.data('product-whatsapp-title')
					let waVariantTitle = ''
					if (dataQuickview.title) {
						waVariantTitle = `${waProductTitle} (${dataQuickview.title})`
						waButton.attr('href', encodeURI(_.replace(waProductHref, waProductTitle, waVariantTitle)))
					}
				}
			}
		})

		EventBus.subscribe('update_items:insales:cart', () => {
			let parent = $(quickviewForm)
			if (parent.length > 0) {
				updateQuickviewPrices(currentVariant, currentVariantOldPrice, currentData)
			}
		})

	}

})
;
