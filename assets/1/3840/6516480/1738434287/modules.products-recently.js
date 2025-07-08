$(document).ready(() => {

	if (Settings['module_products-recently']) {

		const recentlyContainer = '[data-recently]'
		const recentlyData = $(recentlyContainer).data('recently')
		const recentlyMax = 40
		let recentlyProducts = Cookies.get('recently-view') ? JSON.parse(Cookies.get('recently-view')) : []
		const recentlyCurrent = recentlyData ? recentlyData.id : false
		const recentlyClear = '[data-recently-clear]'

		let recently = {
			init: () => {
				if (recentlyData) {
					if (recentlyCurrent) {
						recently.add(recentlyCurrent)
					} else {
						recently.get(recentlyProducts)
					}
				}
			},
			add: (id) => {
				recentlyProducts = recentlyProducts.filter(item => item != id)
				recently.get(recentlyProducts)
				recentlyProducts.unshift(recentlyCurrent || id)
				recentlyProducts = recentlyProducts.slice(0, recentlyMax)
				Cookies.set('recently-view', JSON.stringify(recentlyProducts), {
					path: '/',
					expires: 365
				})
			},
			get: (products) => {
				if (products.length > 0) {
					fetch('/products_by_id/' + products.join(',') + '.json').then((response) => {
						return response.json()
					}).then((data) => {
						if (data.products.length > 0) {
							let sortedData = []
							$.each(products, (index, item) => {
								let x = data.products.filter(o => o.id == item)
								if (x.length > 0) {
									sortedData.push(x[0])
								}
							})
							recently.draw(sortedData)
						}
					})
				}
			},
			draw: (data) => {
				$(recentlyContainer).html(templateLodashRender({
					products: data
				}, 'template-products-recently'))
				new Swiper('.js-recently-swiper', {
					slidesPerView: 7,
					slidesPerGroup: 7,
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
						376: {
							slidesPerView: 3,
							slidesPerGroup: 3,
							spaceBetween: 10
						},
						576: {
							slidesPerView: 4,
							slidesPerGroup: 4,
							spaceBetween: 10
						},
						768: {
							slidesPerView: 5,
							slidesPerGroup: 5,
							spaceBetween: 20
						},
						1025: {
							slidesPerView: 6,
							slidesPerGroup: 6,
							spaceBetween: 20
						},
						1200: {
							slidesPerView: 7,
							slidesPerGroup: 7,
							spaceBetween: 20
						}
					},
					on: {
						init: (event) => {
							$(event.el).css({
								'--swiper-thumb-height': $(event.el).find('.thumb:first').height() + 'px'
							})
							lazyLoad.update()
						}
					}
				})
			},
			clear: () => {
				Cookies.remove('recently-view')
				$(recentlyContainer).slideUp(() => {
					$(recentlyContainer).html('')
				})
			},
			quickview: (id) => {
				let recentlyProducts = Cookies.get('recently-view') ? JSON.parse(Cookies.get('recently-view')) : []
				recentlyProducts = recentlyProducts.filter(item => item != id)
				recentlyProducts.unshift(id)
				recentlyProducts = recentlyProducts.slice(0, recentlyMax)
				Cookies.set('recently-view', JSON.stringify(recentlyProducts), {
					path: '/',
					expires: 365
				})
				recently.get(recentlyProducts)
				$(recentlyContainer).show()
			},
		}

		recently.init()

		$(document).on('click', recentlyClear, (e) => {
			e.preventDefault()
			recently.clear()
		})

		globalFunctions.recentlyQuickview = (id) => {
			recently.quickview(id)
		}

	}

})
;
