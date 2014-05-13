$(document).ready(function(){	
	$("#1").on('click', function(){
		playSound(ABuffer.buffer, 0);
	});
	$("#2").on('click', function(){
		playSound(BBuffer.buffer, 0);
	});
	$("#3").on('click', function(){
		playSound(CSharpBuffer.buffer, 0);
	});
	$("#4").on('click', function(){
		playSound(DBuffer.buffer, 0);
	});
	$("#5").on('click', function(){
		playSound(EBuffer.buffer, 0);
	});
	$("#6").on('click', function(){
		playSound(FSharpBuffer.buffer, 0);
	});
	$("#7").on('click', function(){
		playSound(GSharpBuffer.buffer, 0);
	});
	$("#8").on('click', function(){
		playSound(HighABuffer.buffer, 0);
	});
});
