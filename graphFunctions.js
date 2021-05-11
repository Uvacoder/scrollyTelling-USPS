import {
  margin,
  width,
  height,
  returnXScale,
  returnYScale,
  returnYAxisScale,
} from "./graphDimensions.js";

export function drawAxes(data) {
  d3.select("svg").remove();
  d3.select(".myXaxis").remove();
  d3.select(".myYaxis").remove();

  // append the svg object to the body of the page
  const svg = d3
    .select("#primaryViz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "primaryGraph");

  const xAxis = d3
    .axisBottom()
    .scale(returnXScale(data))
    .tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")
    .call(xAxis);

  var yAxis = d3.axisLeft().scale(returnYAxisScale(data));
  svg.append("g").attr("class", "myYaxis").call(yAxis);
}

export function drawSecondaryAxes(data) {
  // d3.select("svg").remove();
  // d3.select(".myXaxis").remove();
  // d3.select(".myYaxis").remove();

  // d3.select("#secondaryGraph").remove();

  // append the svg object to the body of the page
  const svg = d3
    .select("#secondaryViz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "secondaryGraph")
    .attr("class", "secondary")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xAxis = d3
    .axisBottom()
    .scale(returnXScale(data))
    .tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")
    .call(xAxis);

  var yAxis = d3.axisLeft().scale(returnYAxisScale(data));
  svg.append("g").attr("class", "myYaxis").call(yAxis);
}

export function drawBar(data, currentYear) {
  // Initialise a X axis:
  const xScale = returnXScale(data);
  const yScale = returnYScale(data);

  const svg = d3.select("svg");

  const dataToyear = data.filter((row) => row.date === currentYear);

  const thisYear = dataToyear[0].date;
  const thisValue = dataToyear[0].value;

  svg
    .append("rect")
    .attr("x", xScale(thisYear))
    .attr("y", height - yScale(thisValue))
    .attr("height", 0)
    .attr("width", 10)
    .attr("fill", "black")
    .attr("id", `bar${thisYear}`)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "bar");

  d3.select(`#bar${thisYear}`)
    .transition()
    .duration(1000)
    .attr("height", yScale(thisValue));

  setTimeout(() => {
    d3.selectAll(".bar zero").attr("height", (data) => {
      // return yScale(data.value);
    });
  }, 1150);
}

export function removeBar(data, currentYear) {
  d3.select(`#bar${currentYear}`)
    .transition()
    .duration(1000)
    .attr("height", 0)
    .attr("class", "bar zero");

  const nextYear = currentYear + 1;

  d3.select(`#bar${nextYear}`)
    .transition()
    .duration(1000)
    .attr("height", 0)
    .attr("class", "bar zero");

  // setTimeout(() => {
  //   d3.select(`#bar${currentYear}`).remove();
  //   d3.select(`#bar${nextYear}`).remove();
  // }, 1150);

  //check for fast scrolling bars
  const allYears = [];

  const startYear = d3.min(data, (d) => {
    return d.date;
  });

  const endYear = d3.max(data, (d) => {
    return d.date;
  });

  for (let i = startYear; i < endYear; i++) {
    allYears.push(i);
  }

  const barsExisting = d3.selectAll(".bar")._groups[0];

  const barsRequired = allYears.slice(0, allYears.indexOf(currentYear) + 1);

  barsRequired.map((year) => drawBar(data, year));
}

export function bar(data, currentYear) {
  // d3.selectAll(".bar").transition().duration(1000).remove();
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
    })
    .attr("y", (d) => {
      return height - y(d.value);
    })
    .attr("width", 10)
    .attr("height", (d) => y(d.value))
    .attr("fill", "black")
    .attr("width", 10)
    .attr("height", (d, i) => {
      // return y(d.value);
      return 0;
    })
    .attr("fill", "black")
    .attr("id", (d) => d.value);

  // d3.selectAll(".bar")
  //   .attr("height", (d) => y(d.value))
  //   .transition()
  //   .duration(1000);
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
