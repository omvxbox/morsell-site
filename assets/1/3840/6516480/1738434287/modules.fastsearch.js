$(document).ready(() => {

	if (Settings['module_fastsearch']) {

		let search = $('.js-search-input')

		search.on('focus', () => {
			$('body').addClass('is-search-focus')
		})

		$(document).on('click', (e) => {
			if ($('body').hasClass('is-search-focus')) {
				if ($(e.target).closest('.search').length == 0) {
					$('body').removeClass('is-search-focus')
					search.blur()
				}
			}
		})

		search.each(function () {
			let serachItem = $(this)
			serachItem.autocomplete({
				serviceUrl: '/search.json',
				paramName: 'q',
				params: {
					page_size: 20,
					lang: Site.locale
				},
				dataType: 'json',
				deferRequestBy: 300,
				preserveInput: true,
				noCache: true,
				appendTo: serachItem.closest('form').find('.js-search-results'),
				minChars: 0,
				showNoSuggestionNotice: true,
				preventBadQueries: false,
				noSuggestionNotice: templateLodashRender({}, 'search-empty'),
				transformResult: (response) => {
					return {
						suggestions: $.map(response, (dataItem) => {
							return {
								value: _.escape(dataItem.title),
								data: {
									url: dataItem.url + ((Site.locale_not_default) ? '?lang=' + Site.locale + '' : ''),
									price_min: dataItem.price_min,
									price_max: dataItem.price_max,
									image: dataItem.first_image.thumb_url
								}
							}
						})
					}
				},
				formatResult: (suggestions, currentValue) => {
					suggestions.value = suggestions.value.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + serachItem.devbridgeAutocomplete().currentValue + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<strong>$1</strong>')
					return templateLodashRender(suggestions, 'search-results')
				},
				onSearchStart: (params) => {
					serachItem.addClass('in-progress')
				},
				onSearchComplete: (query, suggestions) => {
					serachItem.removeClass('in-progress')
					if (suggestions.length == 0) {
						if (query != '') {
							serachItem.closest('form').find('.autocomplete-no-suggestion').show()
						} else {
							serachItem.closest('form').find('.autocomplete-no-suggestion').hide()
						}
					}
				},
				beforeRender: (container, suggestions) => {
					$('.autocomplete-suggestions-total').remove()
					if (suggestions.length > 0) {
						$(container).parent().append(templateLodashRender({
							count: suggestions.length
						}, 'search-total'))
					}
				}
			})
		})

		$('.search-mobile .js-search-results').on('touchmove', () => {
			$('.search-mobile .js-search-input').blur()
		})

	}

})
;
