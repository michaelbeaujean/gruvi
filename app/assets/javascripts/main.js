var simonNotes = [];
var simonCounter = 0;
var playerNotes = [];
var playersTurn = false;
var correctResponse = true;
var simonDuration = simonCounter * eighthNote;
var expertMode = false;

// The keys are the length of the individual note buffers; the values are the hex codes
// for the colors their circles flash.  The Dictionary is ordered from low to high notes.
var DICTIONARY = {
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

	$("#64849").on('click', function(){
		playBuffer(ABuffer);
	});
	$("#47556").on('click', function(){
		playBuffer(BBuffer);
	});
	$("#43744").on('click', function(){
		playBuffer(CSharpBuffer);
	});
	$("#43604").on('click', function(){
		playBuffer(DBuffer);
	});
	$("#43649").on('click', function(){
		playBuffer(EBuffer);
	});
	$("#43656").on('click', function(){
		playBuffer(FSharpBuffer);
	});
	$("#43686").on('click', function(){
		playBuffer(GSharpBuffer);
	});
	$("#43601").on('click', function(){
		playBuffer(HighABuffer);
	});

	$("#easy").on('click', function(){
		startGame();
	});

	$("#hard").on('click', function(){
		expertMode = true;
		startGame();
	});
});

// somewhat reducing repetition of code in above event listeners
function playBuffer(buffer) {
	playSound(buffer, 0, expertMode);
};

// makes the circles flash
function blink(div, color) {
    $(div).stop().css("background-color", color).animate({ backgroundColor: "#FFFFFF"}, 1500);
};

// plays a tone and makes the associated circle flash
function playSound(buffer, startTime, mode) {
	// accesses the buffer's length to use as a key for the dictionary, then gets the color
	// value
	var length = buffer.length;
	var color = DICTIONARY[length];
	var div = "#" + length;

	// WebAudioAPI boilerplate I copied from the docs
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);

	// actually plays the note and blinks the div, if in normal mode
	setTimeout(function(){
		source.noteOn(0);
		if (!expertMode) {
			blink(div, color);
		};
	}, (startTime * 1000));

	// if it's the player's turn, adds the note to his/her array of responses
	if (playersTurn) {
		playerNotes.push(buffer);
		getPlayerInput(buffer);
	};
};

// adds a note to the computer-generated sequence, plays the sequence, then prompts the
// player to repeat it
function playSimon() {

	simonCounter++;

	// creates a slight pause before the round starts
	var startTime = eighthNote;

	// selects a random note of the scale and pushes it to the computer-generated sequence
	var note = _.sample(bufferLoader.bufferList);
	simonNotes.push(note);

	// plays the notes in the sequence, an eighth-note apart
	for (i=0; i<simonNotes.length; i++) {
		playSound(simonNotes[i], startTime, expertMode);
		startTime += eighthNote;
	};

	var nowYou = $("<p>").attr("id", "now-you").text("Now you!");

	// an eighth-note after the computer sequence is finished playing, prompts the player
	// to try to match the sequence
	setTimeout(function(){
		$("#gameplay-box").append(nowYou);
		playersTurn = true;
		getPlayerInput();
	}, (simonDuration * 1000) + (eighthNote * 1000));
};

function startGame(){
	$("#easy").hide();
	$("#hard").hide();
	playSimon();
};

// evaluates each note the player inputs to see if it matches the corresponding note in
// the computer's sequence, whether the player has inputted the same number of notes
// as are in the sequence, and, if so, if s/he matched the sequence correctly.  Either
// begins a new round or ends the game, as appropriate.
function getPlayerInput(note){
	var responseLength = playerNotes.length;

	// as long as the game hasn't just started (meaning there's no player input yet),
	// compares the player's most recent note against the corresponding note in the
	// computer-generated sequence.  If they don't match, sets correctResponse to false.
	if ((responseLength > 0) && !(note === simonNotes[responseLength - 1])) {
		correctResponse = false;
	};

	// if the length of the sequence the player has inputted matches the length of the
	// computer's sequence, evaluates whether to begin another round or end the game.
	if (responseLength === simonNotes.length) {
		$("#gameplay-box").empty();
		playerNotes = [];
		playersTurn = false;
	
		if (correctResponse) {
			var goodJob = $("<p>").text("Good job!");

			// creates a double-length pause before beginning the next round
			setTimeout(function(){
				$("#gameplay-box").append(goodJob);
				playersTurn = false;
				playSimon();
			}, (eighthNote * 2000));	
		}
		else {
			var sorry = $("<p>").text("Sorry!");

			simonNotes = [];
			simonCounter = 0;
			correctResponse = true;

			$("#gameplay-box").append(sorry);

			// creates a quadruple-length pause before offering the user a
			// chance to play again
			setTimeout(function(){
				$("#gameplay-box").empty();
				$("#gameplay-box").reveal(easy);
				$("#gameplay-box").append(hard);
			}, (eighthNote * 4000));
		};
	};
};