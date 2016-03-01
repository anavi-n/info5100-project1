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
    //.style("stroke","#000000");
    .style("stroke","#ffffff");
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
    //.style("opacity","0.8")
    .style("fill",function(d){
      var countryData = allDataMap.get(d.id);//only get one id
      console.log(countryData); //undefined
      console.log(d.id);
      //var pationRate = countryData.LaborForce;
      if (!countryData) { return "#feebe2";}
      /**else if (countryData.LaborForce <= 5) { return "rgb(63,0,11)";}
      else if (countryData.LaborForce > 5 && countryData.LaborForce <=15) { return "rgb(240,57,89)";}
      else if (countryData.LaborForce > 15 && countryData.LaborForce <=25) { return "rgb(245,102,126)";}
      else if (countryData.LaborForce > 25 && countryData.LaborForce <=35) { return "rgb(254,130,152)";}
      else if (countryData.LaborForce > 35 && countryData.LaborForce <=45) { return "rgb(255,143,16)";}
      else if (countryData.LaborForce > 45 && countryData.LaborForce <=55) { return "rgb(251,174,188)";}
      else if (countryData.LaborForce > 55 && countryData.LaborForce <=65) { return "rgb(254,222,227)";}
      else if (countryData.LaborForce > 65 && countryData.LaborForce <=75) { return "rgb(255,239,242)";}
      else if (countryData.LaborForce > 75 && countryData.LaborForce <=85) { return "rgb(255,245,250)";}
      else if (countryData.LaborForce > 85 && countryData.LaborForce <=95) { return "rgb(255,255,255)";}
      else if (countryData.LaborForce > 95 && countryData.LaborForce <=100) { return "rgb(245,255，245)";}
      return "#192128";**/

      else if (countryData.LaborForce <= 5) { return "#feebe2";}
      else if (countryData.LaborForce > 5 && countryData.LaborForce <=15) { return "#feebe2";}
      else if (countryData.LaborForce > 15 && countryData.LaborForce <=25) { return "#fbb4b9";}
      else if (countryData.LaborForce > 25 && countryData.LaborForce <=35) { return "#fbb4b9";}
      else if (countryData.LaborForce > 35 && countryData.LaborForce <=45) { return "#f768a1";}
      else if (countryData.LaborForce > 45 && countryData.LaborForce <=55) { return "#f768a1";}
      else if (countryData.LaborForce > 55 && countryData.LaborForce <=65) { return "#c51b8a";}
      else if (countryData.LaborForce > 65 && countryData.LaborForce <=75) { return "#c51b8a";}
      else if (countryData.LaborForce > 75 && countryData.LaborForce <=85) { return "#7a0177";}
      else if (countryData.LaborForce > 85 && countryData.LaborForce <=95) { return "#7a0177";}
      else if (countryData.LaborForce > 95 && countryData.LaborForce <=100) { return "#7a0177";}
      return "#7a0177";
    })

    /**.style("stroke-width",function(d){
      var countryData = allDataMap.get(d.id);
      if (!countryData) {return 1;}
      else if (countryData.LaborForce <= 15) { return 3;}
      else if (countryData.LaborForce > 75 && countryData.LaborForce <=100) {return 3;}
      return 1;
    })
    .style("stroke-opacity", function(d){
      var countryData = allDataMap.get(d.id);
      if (!countryData) {return 0.5;}
      else if (countryData.LaborForce <= 15) { return 0.8;}
      else if (countryData.LaborForce > 75 && countryData.LaborForce <=100) {return 0.8;}
      return 0.5;
    })**/
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