define(['knockout', 'jquery', 'jquery-ui', 'semantic'], function (ko, $) {

	$.getJSON('./data/data.json',
		function (dataJson) {

			var filteredProducts;
			$('#form-with-settings').on('submit', function (event) {
				event.preventDefault();
				var resolutionsSelector = $('#amount'),
					firmsHash = {},
					prices = {
						min: parseInt($("#min").val()),
						max: parseInt($("#max").val())
					},
					resolutions = {
						min: sliderRange.slider('values', 0),
						max: sliderRange.slider('values', 1)
					};

				$('#brands input:checked').each(function(i, input){
				    firmsHash[input.value] = true;
				});

				filteredProducts = dataJson.filter(function (product) {

					if (firmsHash.hasOwnProperty(product.brand)
						&& product.price >= prices.min
						&& product.price <= prices.max
						&& product.resolution >= resolutions.min
						&& product.resolution <= resolutions.max) {
						return true;
					}
					return false;

				});

				productsView.newArray.removeAll();

				filteredProducts.forEach(function(item){
					productsView.newArray.push(item);
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

				/*Так я думала пушить отфильтрованные данные в self.newArray, но так не работает
				filteredProducts.forEach(function (productInList) {
					self.newArray.push(new ProductOptions(productInList));
				});*/

				dataJson.forEach(function (productInList) {
					self.newArray.push(new ProductOptions(productInList));
				});
			}

			var productsView = new ProductsListVM();

			ko.applyBindings(productsView);
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

	$('.ui.checkbox').checkbox();

	//endregion


});