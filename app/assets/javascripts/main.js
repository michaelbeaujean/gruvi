var A = T("sin", {freq:220, mul:.5});
var B = T("sin", {freq:246.942, mul:.5});
var cSharp = T("sin", {freq:277.183, mul:.5});
var D = T("sin", {freq:293.665, mul:.5});
var E = T("sin", {freq:329.628, mul:.5});
var fSharp = T("sin", {freq:369.994, mul:.5});
var gSharp = T("sin", {freq:415.305, mul:.5});
var highA = T("sin", {freq:440, mul:.5});

$(document).ready(function(){
  $("#1").on('click', function(){
    T("perc", {r:1000}, A).on("ended", function() {
		  this.pause();
		}).bang().play();
	});
	$("#2").on('click', function(){
		T("perc", {r:1000}, B).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#3").on('click', function(){
		T("perc", {r:1000}, cSharp).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#4").on('click', function(){
		T("perc", {r:1000}, D).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#5").on('click', function(){
		T("perc", {r:1000}, E).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#6").on('click', function(){
		T("perc", {r:1000}, fSharp).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#7").on('click', function(){
		T("perc", {r:1000}, gSharp).on("ended", function(){
			this.pause();
		}).bang().play();
	});
	$("#8").on('click', function(){
		T("perc", {r:1000}, highA).on("ended", function(){
			this.pause();
		}).bang().play();
	});
});
