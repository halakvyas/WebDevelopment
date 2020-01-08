// JavaScript source code

var score_value;
var time_remaining;
var action;
var playing = false;
var correct_ans;

window.onload = function(){
document.getElementById("reset").onclick =
function(){

   //if we are playing
   if(playing == true){
   	   location.reload();
   }
   else{
   	   score_value = 0;
	   time_remaining = 60;
	   
	   document.getElementById("scorevalue").innerHTML = score_value;
	   document.getElementById("time_rem").innerHTML = time_remaining;
	   document.getElementById("timer").style.display = "block";
	   document.getElementById("reset").innerHTML = "Reset Game";
	   playing = true;

	   startCountdown();
	   generateQA();
   }
}

for(i=1; i<5; i++){
	document.getElementById("box"+i).onclick=
function(){
	//check if we are playing
	if(playing){
		if(this.innerHTML == correct_ans){
		    //correct answer
			score_value++;
			document.getElementById("scorevalue").innerHTML = score_value;
		    
			//hide wrong box
			document.getElementById("incorrect").style.display = "none";
			document.getElementById("correct").style.display = "block";

			setTimeout(function(){
			   document.getElementById("correct").style.display = "none";
			},1000)
			generateQA();
		}

		else{
		//incorrect answer
			
			//hide right box
			document.getElementById("incorrect").style.display = "block";
			document.getElementById("correct").style.display = "none";

			setTimeout(function(){
			   document.getElementById("incorrect").style.display = "none";
			},1000)
		}
	}
}
}

}

function startCountdown(){
	action = setInterval(function(){
	     time_remaining -= 1;

		 document.getElementById("time_rem").innerHTML = time_remaining;

		 if(time_remaining==0){
		 	 document.getElementById("displayscore").style.display = "block";
			 stopCountdown();
			}
	},1000)
}

function stopCountdown(){
	clearInterval(action);
	document.getElementById("timer").style.display = "none";
	document.getElementById("reset").innerHTML = "Start Game";
	document.getElementById("score_s").innerHTML = score_value;
}

function generateQA(){
	var x = 1+Math.round(9*Math.random());
	var y = 1+Math.round(9*Math.random());

	correct_ans = x*y;

	document.getElementById("question").innerHTML = x + "X" + y ;

	var correct_position = 1+Math.round(3*Math.random());
	document.getElementById("box"+correct_position).innerHTML = correct_ans;

	//fill boxes with wrong answer
	for(i=1; i<5; i++){
		if(i != correct_position){
		    var wrong_ans;
			do
			{
				wrong_ans = (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random()));
			}while(wrong_ans == correct_ans)
		    document.getElementById("box"+i).innerHTML = wrong_ans;
		}

	}
}