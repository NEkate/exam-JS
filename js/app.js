define(['knockout', 'jquery', 'jquery-ui', 'semantic'], function (ko, $) {

	//region ====productVM====
	var productsView = ko.observableArray([]),
		brandsList = [],
		brandsView = ko.observableArray(brandsList);

	ko.applyBindings({
		products: productsView,
		brands: brandsView
	});
	//endregion

	var fullProductsList = [];

	$('#form-with-settings').on('submit', function (event) {
		event.preventDefault();
		var resolutionsSelector = $('#amount'),
			brandsHash = {},
			prices = {
				min: parseInt($("#min").val()),
				max: parseInt($("#max").val())
			},
			resolutions = {
				min: sliderRange.slider('values', 0),
				max: sliderRange.slider('values', 1)
			};

		brandsList.forEach(function (brand) {
			if (brand.selected()) {
				brandsHash[brand.name] = true;
			}
		});

		var filteredProducts = fullProductsList.filter(function (product) {
			if (brandsHash.hasOwnProperty(product.brand)
				&& product.price >= prices.min
				&& product.price <= prices.max
				&& product.resolution >= resolutions.min
				&& product.resolution <= resolutions.max
				) {
				return true;
			}

			return false;
		});

		productsView.removeAll();

		filteredProducts.forEach(function (item) {
			productsView.push(item);
		});
	});

	//region ====slider====
	var sliderRange = $('#slider-range'),
		amount = $("#amount");

	sliderRange.slider({
		range: true,
		min: 2,
		max: 20,
		values: [10, 15 ],
		slide: function (event, ui) {
			amount.val(ui.values[ 0 ] + " - " + ui.values[ 1 ]);
		}
	});

	amount.val(sliderRange.slider('values', 0) +
		" - " + sliderRange.slider('values', 1));

	//endregion

	$.getJSON('./data/data.json',
		function (dataJson) {

			var brandsHash = {};
			dataJson.forEach(function (product) {
				fullProductsList.push(product);
				productsView.push(product);
				brandsHash[product.brand] = true;
			});

			for (var brandName in brandsHash) {
				if (!brandsHash.hasOwnProperty(brandName)) {
					continue;
				}

				brandsView.push({
					name: brandName,
					selected: ko.observable(true)
				});
			}

		}
	);
});