var context = new webkitAudioContext();
var oscillator, gain;
var now = context.currentTime;
var oscillatorCounter = 0;

function startOsc(frequency){ // Frequency is passed to this function from input button 
 
    // Create OscillatorNode
    oscillator = context.createOscillator(); // Create sound source
    oscillator.type = 0; // Sine wave
    oscillator.frequency.value = frequency; // Frequency in hertz (passed from input button)
    oscillator.noteOn(now); // Play oscillator instantly

    // Create GainNode    
    gain = context.createGainNode(); // Create gain node
    gain.gain.value = .5; // Set gain to full volume
 
    // Connect the Nodes
    oscillator.connect(gain); // Connect oscillator to gain
    gain.connect(context.destination); // Connect gain to output
    oscillatorCounter++;
};


function off() {
    setTimeout(function(){
    	oscillator.noteOff(now);
		oscillator.disconnect();
    }, 200);
};

var api = T("WebAudioAPI:recv");
var context = api.context;
var synth = T("+sin", {freq:2, mul:0.5}, api);

var send = T("WebAudioAPI:send", synth).send(context.destination);

timbre.once("reset", function() {
  send.cancel();
});

var A = T("sin", {freq:220, mul:.5});
var B = T("sin", {freq:246.942, mul:.5});
var cSharp = T("sin", {freq:277.183, mul:.5});
var D = T("sin", {freq:293.665, mul:.5});
var E = T("sin", {freq:329.628, mul:.5});
var fSharp = T("sin", {freq:369.994, mul:.5});
var gSharp = T("sin", {freq:415.305, mul:.5});
var highA = T("sin", {freq:440, mul:.5});

$(document).ready(function(){
	$("#1").on('mousedown', function(event){
		startOsc(220);
	});
	$("#1").on('mouseup', function(event){
		off();
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