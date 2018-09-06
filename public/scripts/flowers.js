$(document).ready(function() {
	var moreOrLess = $(".show-more");
	moreOrLess.data("text-original", "More");
	moreOrLess.on("click", function() {
		$(this).toggleClass("show-less");
		$(this).parent().find(".card-text").toggleClass("show-flower-desc");

		if($(this).text() == $(this).data("text-original")) {
			$(this).text($(this).data("text-swap"));
		} else {
			$(this).text($(this).data("text-original"));
		}
	});
});