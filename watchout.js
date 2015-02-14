// start slingin' some d3 here.

var boardX = 700;
var boardY = 450;
var enemies = 60;
var difficulty = 500;
var size = 5;
collisions = 0;
score = 0;
highScore = 0;
shuriken = false;

// var createBoard = function(){
  d3.select("body")
  .append("svg")
  .attr("width",boardX)
  .attr("height",boardY)
  .append("rect")
  .attr("width",boardX)
  .attr("height",boardY)
  .attr("style","fill:red");
  var board = d3.select("svg");
// }

var setUpShuriken = function(){
  d3.select('body')
  .append('svg')
  .attr({id:'mySvg',width:20, height:19})
  .append('defs')
  .attr({id: 'mdef'})
  .append('pattern')
  .attr({id: 'image', x:0,y:0,height:19,width:20})
  .append('image')
  .attr({x:0,y:0,width:20,height:19,'xlink:href':'ninja_star_sm.png'});
}

var generatePositions = function(n,boardX,boardY){
  var positions = [];
  for (i = 0; i < n; i++){
    var obj = {};
    obj.x = Math.round(Math.random()*boardX);
    obj.y = Math.round(Math.random()*boardY);
    obj.id = i;
    positions.push(obj);
  }
  return positions;
};
// var positions = [{id: 1, x: x1, y: randY() },{id: 2; x:100, y:100}];
// var positions = generatePositions(enemies,boardX,boardY);

//draws circles

var drawEnemies = function(){
  var positions = generatePositions(enemies,boardX,boardY);
  board.selectAll(".enemy").data(positions, function(d){return d.id;})
    .enter().append("circle")
    .attr("cx", function(d){return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("style", 'fill:black')
    // .style('fill','url(#image)')
    .attr("r", size)
    .attr("class","enemy");
};

var moveEnemies = function(){
 var positions = generatePositions(enemies,boardX,boardY);
 board.selectAll(".enemy").data(positions,function(d){return d.id;})
   .transition()
   .tween("custom", collisionTween)
   .duration(difficulty)
   .attr("cx", function(d){return d.x;})
   .attr("cy", function(d){return d.y;});
   // .attr("style", 'fill:url(#image)',' transform:rotate(180deg)');
};

var dragMove = function(d){
  d3.select(this)
  .attr("cx",d3.event.x)
  .attr("cy",d3.event.y);
}
var drag = d3.behavior.drag().on("drag",dragMove);

var drawHero = function(){
  var position = [{x:(boardX/2),y:(boardY/2),id:enemies}];
  board.selectAll(".hero").data(position, function(d){return d.id;})
    .enter().append("circle")
    .attr("cx", function(d){return d.x;})
    .attr("cy", function(d){return d.y;})
    .attr("style", "fill:gold")
    .attr("r", size)
    .attr("class","hero")
    .call(drag);
};

var distanceToHero = function(currentX, currentY){
  var hero = d3.selectAll(".hero").data()[0];
  // console.log(hero);
  var x = currentX - hero.x;
  var y = currentY - hero.y;
  var l = Math.sqrt( (x*x) + (y*y) );
  return l;
};

var collisionDetector = function(endData,t){
  var startData = d3.select(this);
  x = parseFloat(startData.attr("cx")) + t * ( endData.x - parseFloat(startData.attr("cx")));
  y = parseFloat(startData.attr("cy")) + t * ( endData.y - parseFloat(startData.attr("cy")));

  debugger;


  if(distanceToHero(x,y) < 2 * size){
    // console.log("COLLLLIDEDED");
    collision();
  }
};

var collisionTween = function(d){
  // console.log(d);
    // console.log(d3.select(this));

  return function(t){
    // console.log(t);
    collisionDetector.call(this,d,t);
  }
};

var collision = function(){
  collisions++;
  d3.select(".collisions").select("span").text(collisions);
  if (score > highScore){
    highScore = score;
    d3.select(".high").select("span").text(highScore);
  }
  score = 0;
};

var updateScore = function(){
  score++;
  d3.select(".current").select("span").text(score);
};

// createBoard();
if (shuriken){
  setUpShuriken();
}
drawHero();
drawEnemies();
setInterval(moveEnemies,difficulty);
setInterval(updateScore,50);
