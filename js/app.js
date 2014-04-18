define(['knockout', 'jquery', 'jquery-ui'], function (ko, $) {

	$.getJSON('./data/data.json',
		function (dataJson) {

			var filteredProducts;
			$('#form-with-settings').on('click', function (event) {
				event.preventDefault();
				var pricesSelector = $("input#min"),
					resolutionsSelector = $('input#amount'),
					firms = {},
					prices = {
						minPrice: parseInt(pricesSelector.val()),
						maxPrice: parseInt(pricesSelector.val())
					},
					resolutions = {
						minResolution: parseInt(resolutionsSelector.val()),
						maxResolution: parseInt(resolutionsSelector.val().match(/\d+$/))
					};

				(function () {
					var firm = $('input.firm:checked');
					for (var i = 0; i < firm.length; i++) {
						var f = firm[i];
						firms[f] = f;
					}
				})();

				filteredProducts = dataJson.filter(function (product) {

					if (firms.hasOwnProperty(product.brand)
						&& product.price > prices.minPrice
						&& product.price < prices.maxPrice
						&& product.resolution > resolutions.minResolution
						&& product.resolution < resolutions.maxResolution) {
						return true;
					}
					return false;

				});
			});

			//region ====productVM====
			function ProductOptions(options) {
				var self = this;
				self.title = options.title;
				self.price = options.price;
				self.brand = options.brand;
				self.resolution = options.resolution;
			}

			function ProductsListVM() {
				var self = this;
				self.newArray = ko.observableArray([]);

				dataJson.forEach(function (productInList) {
					self.newArray.push(new ProductOptions(productInList));
				});
			}

			ko.applyBindings(new ProductsListVM());
			//endregion

			return dataJson;
		}
	);
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


});