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
var x = d3.scaleLinear().range([0, width]).domain([2005, 2021]);

var xAxis = d3.axisBottom().scale(x).tickFormat(d3.format("d"));
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis")
  .call(xAxis);

// Initialize an Y axis
// var y = d3.scaleLinear().range([0, height]);
var yAxisScale = d3.scaleLinear().range([height, 0]).domain([100, 250]);
var yAxis = d3.axisLeft().scale(yAxisScale);
svg.append("g").attr("class", "myYaxis").call(yAxis);

export function bar(data, currentYear) {
  d3.selectAll(".bar").remove();

  // d3.select(".myXaxis").remove();
  // d3.select(".myYaxis").remove();

  d3.selectAll(".lineTest")
    .transition()
    .duration(1000)
    .style("opacity", 0)
    .remove();

  // Initialise a X axis:
  var x = d3.scaleLinear().range([0, width]).domain([2005, 2021]);
  // var xAxis = d3.axisBottom().scale(x);
  // svg
  //   .append("g")
  //   .attr("transform", "translate(0," + height + ")")
  //   .attr("class", "myXaxis");

  // Initialize an Y axis
  const y = d3.scaleLinear().range([0, height]).domain([100, 250]);
  // const y = d3.scaleLinear().range([height, 0]);

  // var yAxis = d3.axisLeft().scale(yAxisScale);
  // svg.append("g").attr("class", "myYaxis");

  // x.domain([
  //   d3.min(data, (d) => {
  //     return d.date;
  //   }),
  //   d3.max(data, function (d) {
  //     return d.date;
  //   }),
  // ]);

  // svg.selectAll(".myXaxis").transition().duration(1000).call(xAxis);

  // y.domain([
  //   d3.min(data, function (d) {
  //     return d.value;
  //   }),
  //   d3.max(data, function (d) {
  //     return d.value;
  //   }),
  // ]);
  // svg.selectAll(".myYaxis").transition().duration(1000).call(yAxis);

  // console.log(data);

  const dataToyear = data.filter((row) => row.date <= currentYear);

  console.log(dataToyear);

  svg
    .selectAll(".bar")
    .data(dataToyear)
    // .data(dataToyear)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => {
      return x(d.date);
      // return i * 20;
    })
    .attr("y", (d) => {
      // return y(d.value) + 10;
      // return y(d);

      return height - y(d.value);
      // return 100;
    })
    .attr("width", 10)
    .attr("height", (d) => y(d.value))
    .attr("fill", "black")
    .attr("width", 10)
    .attr("height", (d, i) => {
      return y(d.value);
    })
    .attr("fill", "black")
    .attr("id", (d) => d.value);

  // d3.selectAll(".bar").transition().duration(1000);
}

// Create a function that takes a dataset as input and update the plot:
export function updateLine(data) {
  d3.selectAll(".bar").transition().duration(1000).style("opacity", 0).remove();
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
