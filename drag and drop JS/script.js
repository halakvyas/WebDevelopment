document.addEventListener("DOMContentLoaded", function(){
  var square = document.getElementById("square");
  var circle = document.getElementById("circle");
  var triangle = document.getElementById("triangle");
  var arrow = document.getElementById("arrow");

  var v = "";

  v=circle.getContext("2d");
  v.beginPath();
  v.strokeStyle = "#1454d8db";
  v.arc(95,50,40,0,2*Math.PI);
  v.stroke();

  v = square.getContext("2d");
  v.rect(1,1,70,70);
  v.strokeStyle = "#1454d8db";
  v.stroke();

  v = triangle.getContext("2d");
  v.strokeStyle = "#1454d8db";
  v.beginPath();
  v.moveTo(40, 0);
  v.lineTo(80, 80);
  v.lineTo(0, 80);
  v.closePath();
  v.stroke();

  v = arrow.getContext("2d");
  v.beginPath();
  v.moveTo(1, 35);
  v.lineTo(50, 35);
  v.lineTo(50, 20);
  v.lineTo(98, 49);
  v.lineTo(50, 80);
  v.lineTo(50, 65);
  v.lineTo(1, 65);
  v.closePath();
  v.strokeStyle = "#1454d8db";
  v.stroke();
});

function ignore(e) {
    e.preventDefault();
}

function drag(e){
  e.dataTransfer.setData("text",e.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(e){
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  var target = document.getElementById("canvas");
  var canvas = target.getBoundingClientRect();
  var x = e.clientX - canvas.left;
  var y = e.clientY - canvas.top;

  var v = target.getContext('2d');

  if(data == "square")
    addSquare(v, x, y);
  else if(data == "circle")
    addCircle(v, x, y);
  else if(data == "triangle")
    addTriangle(v, x, y);
  else if(data == "arrow")
    addArrow(v, x, y);
}

var sCount = 0;
var tCount = 0;
var aCount = 0;
var cCount = 0;

function addSquare(v,x,y){
  sCount++;
  v.beginPath();
  v.rect(x-50, y-50, 80,80);
  v.closePath();
  v.font = "Calibri 10px";
  v.fillText("Rectangle "+sCount,x-35,y+2);
  v.strokeStyle = "#1454d8db";
  v.stroke();
}

function addCircle(v,x,y){
  cCount++;
  v.beginPath();
  v.arc(x,y,40,0,2*Math.PI);
  v.font = "Calibri 10px";
  v.fillText("Circle "+cCount,x-20,y+7);
  v.strokeStyle = "#1454d8db";
  v.stroke();
}

function addTriangle(v, x, y) {
	tCount++;
	v.beginPath();
    v.moveTo(x, y-40);
    v.lineTo(x+40, y+40);
    v.lineTo(x-40, y+40);
    v.closePath();
	v.font = "Calibri 10px";
	v.fillText("Triangle "+tCount, x-20, y+20);
  v.strokeStyle = "#1454d8db";
	v.stroke();
}

function addArrow(v, x, y) {
	aCount++;
	v.beginPath();
    v.moveTo(x-50, y-15);
    v.lineTo(x, y-15);
    v.lineTo(x, y-30);
    v.lineTo(x+50, y);
    v.lineTo(x, y+30);
    v.lineTo(x, y+15);
    v.lineTo(x-50, y+15);
    v.closePath();
    v.font = "Calibri 10px";
	v.fillText("Arrow "+aCount, x-27, y+5);
  v.strokeStyle = "#1454d8db";
    v.stroke();
}
