$(document).ready(() => {

	if (Settings['module_select-variant']) {

		const variantTrigger = '[data-select-variant]'
		const variantForm = '.select-variant__form'
		const variantsList = {}

		let variant = {
			get: (id, jsonData) => {
				$.fancybox.open({
					src: templateLodashRender({}, 'select-variant-preloader'),
					type: 'inline',
					touch: false,
					backFocus: false,
					smallBtn: true
				})
				if (variantsList[id]) {
					variant.show(id, jsonData)
				} else {
					Products.get(id).done((data) => {
						variantsList[id] = data
						variant.show(id, jsonData)
					}).fail(() => {
						$.fancybox.close()
					})
				}
			},
			show: (id, jsonData) => {
				$('.js-select-variant-container').html(templateLodashRender({
					product: variantsList[id],
					jsonData: jsonData
				}, 'select-variant-content'))
				Products.initInstance($(variantForm)).done(() => {
					$('.js-select-variant-container').animate({
						'min-height': $(variantForm).height()
					}, 200, () => {
						$('.js-select-variant').addClass('is-init')
					})
				}).fail(() => {
					$.fancybox.close()
				})
			}
		}

		$(document).on('click', variantTrigger, function (e) {
			e.preventDefault()
			variant.get($(this).data('select-variant'), $(this).data('select-json'))
		})

		EventBus.subscribe('update_variant:insales:product', (dataSelect) => {
			let parent = $(variantForm)
			if (parent.length > 0) {
				let salePrice = Number(dataSelect.price)
				let oldPrice = Number(dataSelect.old_price)
				$('[data-ds-product-price]', parent).html(Shop.money.format(salePrice))
				if (oldPrice && oldPrice > salePrice) {
					$('[data-ds-product-old-price]', parent).html(Shop.money.format(oldPrice))
					$('[data-ds-product-discount-money]', parent).html(Shop.money.format(oldPrice - salePrice))
				}
				$('[data-ds-product-quantity]', parent).html(dataSelect.quantity || '')
				//мультисклады если подключены
				let productWh = $('[data-product-warehouses]', parent)
				let productWhData = productWh.data('product-warehouses')
				if (productWh.length > 0) {
					productWh.hide()
					let wh_count = 0
					_.forEach(productWhData[dataSelect.id].warehouses, (value, key) => {
						if (value != 0) {
							wh_count++
							productWh.show()
						}
					})
					productWh.find('span').html(_.replace(declOfNum(wh_count, Messages.stores), '[count]', wh_count))
					productWh.data('product-warehouses-current', dataSelect.id)
				}
			}
		})

	}

})
;
