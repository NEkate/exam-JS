define(['knockout', 'jquery', 'jquery-ui'], function (ko, $) {

	$.getJSON('./data/data.json',
		function (dataJson) {
			//region ==========ProductsListVM=========
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

});