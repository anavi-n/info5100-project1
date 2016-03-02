var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1056 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


// setup x
var xValue = function(d) { return d.literacyRate;}, // data -> value
    xScale = d3.scale.linear().domain([0,100]).range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(11);

// setup y
var yValue = function(d) { return d.LFPrate;}, // data -> value
    yScale = d3.scale.linear().domain([0,100]).range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

// setup fill color
<<<<<<< Updated upstream
var legendColor = ["#000080","#31a354","  #FFFF00"];
var developState = ["Highly Developed","Medium Development","Low Development"];
var color = d3.scale.ordinal().domain(developState).range(legendColor);

var cValue = function(d) { return d.developState;};
=======
var cValue = function(d) { return d.developState;},
    color = d3.scale.category20();
>>>>>>> Stashed changes

// add the graph canvas to the body of the webpage
var svg = d3.select("#map2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//add bands
<<<<<<< Updated upstream
var bandColor = ["#feebe2","#fbb4b9","#f768a1","#c51b8a","#7a0177"];
for (var i = 0; i < bandColor.length; i++){
  svg.append("g")
  .append("rect")
  .attr("x", xScale(0))
  .attr("y", yScale(100-i*20))
  .attr("height", xScale(20))
  .attr("width", width)
  .style("opacity", 0.5)
  .style("fill",bandColor[4-i]);
}

=======
svg.append("rect")
  .attr("x", 0)
  .attr("y", yScale(0.1) )
  .attr("width",width)
  .attr("height", 0.1 * height)
  .style("fill", "#feebe2")
  .style("opacity","0.4")
  .style("stroke","#fff")
  .style("stroke-width","1");
>>>>>>> Stashed changes

  svg.append("rect")
    .attr("x", 0)
    .attr("y", yScale(0.2) )
    .attr("width",width)
    .attr("height", 0.1 * height)
    .style("fill", "#fbb4b9")
    .style("opacity","0.4")
    .style("stroke","#fff")
    .style("stroke-width","1");


// load data
d3.csv("mergedData.csv", function(error, data) {
<<<<<<< Updated upstream
 
=======

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.literacyRate = +d.literacyRate;
    d["LFPrate"] = +d["LFPrate"];

  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

>>>>>>> Stashed changes
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Adult female literacy %");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Adult female labor %");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
<<<<<<< Updated upstream
      .style("fill", function(d) { return color(cValue(d));})
      // I don't see any difference with or without these code
      /*.on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 1);
          tooltip.html(d.literacyRate + "<br/> (" + xValue(d)
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0.5);
      });*/
=======
      .style("fill", function(d) { return color(cValue(d));});

>>>>>>> Stashed changes

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})
});
