define(['jquery', 'jquery-ui'], function ($) {




	//region ============read_data============
	$.get('./data/data.json',
		function (dataJson) {
			this.data = dataJson;
			return this.data;
		}
	);
	//endregion

	//region ============slider============
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