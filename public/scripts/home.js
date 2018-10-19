$(document).ready(function() {
	window.addEventListener("scroll", function() {
		var yPos = window.scrollY;
		$("#fixedImg").css("filter", "blur(" + yPos/100 + "px)");
	});
});