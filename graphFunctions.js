// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 50 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3.scaleLinear().range([0, width]);
var xAxis = d3.axisBottom().scale(x);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis");

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis");

// Create a function that takes a dataset as input and update the plot:
export function update(data) {
  // d3.selectAll(".bar").remove();
  d3.selectAll(".bar").transition().duration(1000).style("opacity", 0).remove();
  d3.select(".myXaxis").remove();
  d3.select(".myYaxis").remove();
  // d3.selectAll("g").remove();

  // Initialise a X axis:
  var x = d3.scaleLinear().range([0, width]);
  var xAxis = d3.axisBottom().scale(x);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis");

  // Initialize an Y axis
  var y = d3.scaleLinear().range([height, 0]);
  var yAxis = d3.axisLeft().scale(y);
  svg.append("g").attr("class", "myYaxis");

  // Create the X axis:
  x.domain([
    0,
    d3.max(data, function (d) {
      return d.period;
    }),
  ]);
  svg.selectAll(".myXaxis").transition().duration(1000).call(xAxis);
  // create the Y axis
  y.domain([
    d3.min(data, function (d) {
      return d.rev;
    }) - 10,
    d3.max(data, function (d) {
      return d.rev;
    }),
  ]);
  svg.selectAll(".myYaxis").transition().duration(1000).call(yAxis);

  // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest").data([data], function (d) {
    return d.period;
  });

  // Updata the line
  u.enter()
    .append("path")
    .attr("class", "lineTest")
    .merge(u)
    .transition()
    .duration(1000)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.period);
        })
        .y(function (d) {
          return y(d.rev);
        })
    )
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2.5);
}

export function bar(data) {
  d3.selectAll(".lineTest")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove();
  d3.select(".myXaxis").remove();
  d3.select(".myYaxis").remove();

  // Initialise a X axis:
  var x = d3.scaleLinear().range([0, width]);
  var xAxis = d3.axisBottom().scale(x);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis");

  // Initialize an Y axis
  var y = d3.scaleLinear().range([height, 0]);
  var yAxis = d3.axisLeft().scale(y);
  svg.append("g").attr("class", "myYaxis");

  x.domain([
    0,
    d3.max(data, function (d, i) {
      return i;
    }),
  ]);
  svg.selectAll(".myXaxis").transition().duration(1000).call(xAxis);

  y.domain([
    d3.min(data, function (d) {
      return d.value;
    }),
    d3.max(data, function (d) {
      return d.value;
    }),
  ]);
  svg.selectAll(".myYaxis").transition().duration(1000).call(yAxis);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => {
      return x(i);
    })
    .attr("y", (d) => {
      //   return y(d);
      return 100;
    })
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "black")
    .attr("width", 10)
    .attr("height", (d) => {
      //   return 100;
      //   return y(d);
      return d.value * 10;
    })
    .attr("fill", "black")
    .transition()
    .duration(1000);
}
