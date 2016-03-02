var width = 1056,
    height = 550;

var projection = d3.geo.mercator();
var path = d3.geo.path().projection(projection);
  
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);
var g = svg.append("g");
var worldObjects;

var digitScale = d3.scale.category20b();

var allDataMap;
var pationRate;

//read json file
d3.json("json/world-50m.json", function(error, world) {
  worldObjects = world;
  
  if(error) {
    console.log(error);
  }

  var countries = topojson.feature(world,world.objects.countries).features;

  //countries.forEach(function(country){
    g.selectAll("path").data(countries).enter()
    .append("path").attr("d",path)
    .style("fill", function (c){ return digitScale(Math.floor(c.id)); })//"#192128")
    .style("stroke","#2A2F3B");
  //}); 

  g.selectAll("path").data(countries)
  .on("mouseover", function (country){
    console.log(country.id);
  });

  d3.csv("WomenInWorkforce.csv",function(error,rows){
    if (error) {console.log(error);}
    //console.log(rows);

    allDataMap = d3.map(rows,function(c) {return Number(c.ISOID);  });
    //console.log(allDataMap);
    g.selectAll("path")
    .style("fill",function(c){
      var eachCountryData = allDataMap.get(c.id);
      console.log(eachCountryData);
      pationRate = eachCountryData.LaborForce;
      if (!eachCountryData) { return "#2A2F3B";}
      else if (pationRate <= 30) { return "#000000";}
      else if (pationRate > 30 && pationRate <=50) { return "#333333";}
      else if (pationRate > 50 && pationRate <=70) { return "#777777";}
      else if (pationRate > 70 && pationRate <=100) { return "#7bfbfbf";}

      return "#192128";
    })
  });

});



/**var width = 1056,
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
});**/
  console.log("after json");