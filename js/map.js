var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1056 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var projection = d3.geo.mercator();
var path = d3.geo.path().projection(projection);
  
var svg = d3.select("#map1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g");
//var worldObjects;


var digitScale = d3.scale.category20b();

var isoidData;
//var pationRate;



//read json file
d3.json("json/world-50m.json", function(error, world) {
  //worldObjects = world;
  
  if(error) {
    console.log(error);
  }

  var countries = topojson.feature(world,world.objects.countries).features;

    //add shadow to stroke
  var filter = g.append("filter")
        .attr("id", "stroke-shadow")
        .attr("height", "140%");  

    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 2)
    .attr("result", "blur");

    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 2)
    .attr("dy", 2)
    .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      //countries.forEach(function(country){
    g.selectAll("path").data(countries).enter()
    .append("path").attr("d",path)
    .style("stroke","#fff")
    .style("stroke-width","1")
    .style("stroke-opacity","1")
    .style("stroke-linejoin","round");
    //.style("filter", "url(#stroke-shadow)");

  d3.csv("WomenInWorkforce.csv",function(error,data){ //WomenInWorkforce.csv
    if (error) {console.log(error);}
    //console.log(rows);
    isoidData = d3.map(data, function (county) { return Number(county.ISOID); //console.log(county.ISOID)
    });
    console.log(isoidData); 
    g.selectAll("path")
    //.style("opacity","0.8")
    .style("fill",function(d){
      var countryData = isoidData.get(d.id);//only get one id
      console.log(countryData); //undefined
      console.log(d.id);
      //var pationRate = countryData.LaborForce;
      if (!countryData) { return "#DDDDDD";}
      else if (countryData.LaborForce <= 20) { return "#738AB0";}
      else if (countryData.LaborForce > 20 && countryData.LaborForce <=40) { return "#C9CFDB";}
      else if (countryData.LaborForce > 40 && countryData.LaborForce <=60) { return "#F0E3E8";}
      else if (countryData.LaborForce > 60 && countryData.LaborForce <=80) { return "#E7CAD5";}
      else if (countryData.LaborForce > 80 && countryData.LaborForce <=100) { return "#9C4769";}

      return "#DDDDDD";
    })
    .style("filter",function(d){
      var countryData = isoidData.get(d.id);
      if (countryData) { return "url(#stroke-shadow)";}
    })
    ;

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

console.log("after json");

//explanations
svg.append("rect")
      .attr("x", width + 23)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "#9C4769")
svg.append("text")
    .attr("x",width + 18)
    .attr("y",9)
    .attr("dy",".35em")
    .style("text-anchor", "end")
    .text("100% - 80%");


svg.append("rect")
      .attr("x", width + 23)
      .attr("y",18+2)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "#E7CAD5");
svg.append("text")
    .attr("x",width + 18)
    .attr("y",9+20)
    .attr("dy",".35em")
    .style("text-anchor", "end")
    .text("80% - 60%");

svg.append("rect")
      .attr("x", width + 23)
      .attr("y",18+2+20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "#F0E3E8");
svg.append("text")
    .attr("x",width + 18)
    .attr("y",9+40)
    .attr("dy",".35em")
    .style("text-anchor", "end")
    .text("60% - 40%");

svg.append("rect")
      .attr("x", width + 23)
      .attr("y",18+2+20+20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "#C9CFDB");
svg.append("text")
    .attr("x",width + 18)
    .attr("y",9+60)
    .attr("dy",".35em")
    .style("text-anchor", "end")
    .text("40% - 20%");

svg.append("rect")
      .attr("x", width + 23)
      .attr("y",18+2+20+20+20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "#738AB0");
svg.append("text")
    .attr("x",width + 18)
    .attr("y",9+80)
    .attr("dy",".35em")
    .style("text-anchor", "end")
    .text("20% - 0%");

svg.append("rect")
      .attr("x", width + 23)
      .attr("y",18+2+20+20+20+20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", "#DDDDDD");
svg.append("text")
    .attr("x",width + 18)
    .attr("y",9+100)
    .attr("dy",".35em")
    .style("text-anchor", "end")
    .text("No Data");

//title
svg.append("text")
    .style("fill","#4F598C")
    .style("font-size","18px")
    .attr("x",320)
    .attr("y",9)
    .attr("dy",".65em")
    .style("text-anchor", "end")
    .text("Map of Labor Force Participation Rate");


