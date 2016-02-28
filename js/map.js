var width = 1056,
    height = 550;

var projection = d3.geo.mercator();
var path = d3.geo.path().projection(projection);
  
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);
var g = svg.append("g");
var worldObjects;

//read json file
d3.json("json/world-50m.json", function(error, world) {
  worldObjects = world;
  
  if(error) {
    console.log(error);
  }

  var countries = topojson.feature(world,world.objects.countries).features;

  countries.forEach(function(country){
    g.append("path").attr("d",path(country))
    .style("fill", "#192128")
    .style("stroke","#2A2F3B");
  }); 

  var ithacaCoorde = projection([-76,42]);
  g.append("circle").attr("cx",ithacaCoorde[0])
  .attr("cy",ithacaCoorde[1])
  .attr("r",10)
  .attr("fill","none")
  .attr("stroke","#EC314D")
  .attr("stroke-width",1)
  .attr("stroke-opacity",0.7);

  var nullIsland = projection([0,0]); 
  g.append("circle").attr("cx",nullIsland[0])
  .attr("cy",nullIsland[1])
  .attr("r",21)
  .attr("fill","none")
  .attr("stroke","#EC314D")
  .attr("stroke-width",1)
  .attr("stroke-opacity",0.7);

  g.selectAll("path").data(countries)
  .on("mouseover", function (country){
    console.log(country.id);
  });
});
  console.log("after json");