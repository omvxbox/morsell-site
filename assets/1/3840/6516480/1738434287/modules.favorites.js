$(document).ready(() => {

	if (Settings['module_favorites']) {

		$(document).on('click', '[data-ui-favorites-trigger]', function () {
			$(this).toggleClass('favorites-not-added favorites-added')
		})

		$(document).on('click', '[data-ui-favorites-delete]', function (e) {
			$(this).prop('disabled', true).find('svg').replaceWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-icon" data-icon="spinner"><path fill="currentColor" d="m460.1 373.8-20.8-12a12 12 0 0 1-4.7-15.8 200.4 200.4 0 0 0-5.4-190 200.4 200.4 0 0 0-161.8-99.7 12 12 0 0 1-11.4-12v-24a12 12 0 0 1 12.7-12A248.5 248.5 0 0 1 470.8 132c42 72.7 44 162.3 6 236.8a12 12 0 0 1-16.7 5z"/></svg>')
		})

		EventBus.subscribe('update_items:insales:favorites_products', (data) => {
			$('.js-toolbar-favorites').html(templateLodashRender(data, 'toolbar-favorites'))
			if (Site.template == 'favorite') {
				if (data.products.length > 0) {
					if (data.action.method == 'remove_item') {
						$('.js-page-favorites [data-product-id="' + data.action.item + '"]').remove()
					}
				} else {
					$('.js-page-favorites').html(templateLodashRender(data, 'page-favorites'))
				}
			}
			if (data.products.length > 0) {
				$('.js-toolbar-favorites-header').html('(' + data.products.length + ' ' + declOfNum(data.products.length) + ')').show()
			} else {
				$('.js-toolbar-favorites-header').hide()
			}
		})

		EventBus.subscribe('overload:insales:favorites_products', () => {
			msg.show(templateLodashRender({}, 'toolbar-favorites-error'))
			FavoritesProducts.update()
		})

	}

})
;
