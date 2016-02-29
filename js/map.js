var width = 1056,
    height = 550;

var projection = d3.geo.mercator();
var path = d3.geo.path().projection(projection);
  
var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);
var g = svg.append("g");
//var worldObjects;

var digitScale = d3.scale.category20b();

var allDataMap;
//var pationRate;

//read json file
d3.json("json/world-50m.json", function(error, world) {
  //worldObjects = world;
  
  if(error) {
    console.log(error);
  }

  var countries = topojson.feature(world,world.objects.countries).features;

  //countries.forEach(function(country){
    g.selectAll("path").data(countries).enter()
    .append("path").attr("d",path)
    //.style("fill", function (c){ return digitScale(Math.floor(c.id/5)); })//"#192128")
    .style("stroke","#2A2F3B");
  //}); 

  /**g.selectAll("path").data(countries)
  .on("mouseover", function (country){
    console.log(country.id);
  });**/

  d3.csv("WomenInWorkforce.csv",function(error,data){ //WomenInWorkforce.csv
    if (error) {console.log(error);}
    //console.log(rows);

    allDataMap = d3.map(data, function (county) { return Number(county.ISOID); //console.log(county.ISOID)
    });
    console.log(allDataMap); 
    g.selectAll("path")
    .style("fill",function(d){
      var countryData = allDataMap.get(d.id);//only get one id
      console.log(countryData); //undefined
      console.log(d.id);
      //var pationRate = countryData.LaborForce;
      if (!countryData) { return "#2A2F3B";}
      else if (countryData.LaborForce <= 30) { return "#000000";}
      else if (countryData.LaborForce > 30 && countryData.LaborForce <=50) { return "#333333";}
      else if (countryData.LaborForce > 50 && countryData.LaborForce <=70) { return "#777777";}
      else if (countryData.LaborForce > 70 && countryData.LaborForce <=100) { return "#bfbfbf";}

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