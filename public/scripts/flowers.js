$(document).ready(function() {
	var moreOrLess = $(".dropdown-toggle");
	moreOrLess.on("click", function() {
		$(this).parent().toggleClass("dropup");
		$(this).parent().parent().find(".card-text").toggleClass("show-flower-desc");
	});

	var howMany = $(".how-many");
	var minus = $(".minus");
	minus.on("click", function() {
		var thisMany = howMany.val();
		if(thisMany > 0) {
			howMany.val(howMany.val() - 1);
		}
	});

	var plus = $(".plus");
	plus.on("click", function() {
		var thisMany = howMany.val();
		if(thisMany < 10) {
			howMany.val(parseInt(howMany.val()) + 1);
		}
	});
});