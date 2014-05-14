var simonNotes = [];
var simonCounter = 0;

var  DICTIONARY = {
	64849: "#FFFF9C",
	47556: "#9CD2FF",
	43744: "#A6FF9C",
	43604: "#B19CFF",
	43649: "#FF9CF7",
	43656: "#FF9C9C",
	43686: "#FFE19C",
	43601: "#9CFFDC",
};

$(document).ready(function(){
	// var p = $("<p>").text("play");

	// $("#gameplay-box").append(p);
	
	$("#64849").on('click', function(){
		playSound(ABuffer, 0);
	});
	$("#47556").on('click', function(){
		playSound(BBuffer, 0);
	});
	$("#43744").on('click', function(){
		playSound(CSharpBuffer, 0);
	});
	$("#43604").on('click', function(){
		playSound(DBuffer, 0);
	});
	$("#43649").on('click', function(){
		playSound(EBuffer, 0);
	});
	$("#43656").on('click', function(){
		playSound(FSharpBuffer, 0);
	});
	$("#43686").on('click', function(){
		playSound(GSharpBuffer, 0);
	});
	$("#43601").on('click', function(){
		playSound(HighABuffer, 0);
	});
});

function playSimon() {
	simonCounter++;

	var note = _.sample(bufferLoader.bufferList);
	simonNotes.push(note);

	var startTime = context.currentTime;

	for (i=0; i<simonNotes.length; i++) {
		playSound(simonNotes[i], startTime);
		startTime += 0.300;
	};
};

function blink(div, color) {
    $(div).stop().css("background-color", color).animate({ backgroundColor: "#FFFFFF"}, 1500);
}