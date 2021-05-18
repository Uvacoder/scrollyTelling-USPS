// console.log(
//   `${formattedData[0].date.getFullYear()} ${
//     formattedData[0].date.getUTCMonth() + 1
//   }`
// );

// // like this??
// console.log(
//   d3
//     .scaleTime()
//     .domain([
//       d3.min(formattedData, function (d) {
//         return d.date;
//       }),
//       d3.max(formattedData, function (d) {
//         return d.date;
//       }),
//     ])
//     .range([0, 4])
// );

// console.log(
//   d3.max(formattedData, function (d) {
//     return d.date;
//   })
// );

// const data1 = formattedData.slice(0, 3);

// const data2 = formattedData;

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
}

const craFilt = [];
