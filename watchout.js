// start slingin' some d3 here.

var boardX = 700;
var boardY = 450;
var enemies = 30;
var difficulty = 1000;

d3.select("body")
.append("svg")
.attr("width",boardX)
.attr("height",boardY)
.append("rect")
.attr("width",boardX)
.attr("height",boardY)
.attr("style","fill:red");
var board = d3.select("svg");
// board
// .append("rect")
// .attr("width", 100)
// .attr('height',50)
// .attr('style','fill:blue');

// var randX = function(boardX) {
//   return boardX*random();
// }



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
    .attr("r", 5)
    .attr("class","enemy");
};

var moveEnemies = function(){
 var positions = generatePositions(enemies,boardX,boardY);
 board.selectAll(".enemy").data(positions,function(d){return d.id;})
   .transition().duration(difficulty)
   .attr("cx", function(d){return d.x;})
   .attr("cy", function(d){return d.y;});
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
    .attr("r", 5)
    .attr("class","hero")
    .call(drag);
};

drawHero();
drawEnemies();
setInterval(moveEnemies,difficulty);
