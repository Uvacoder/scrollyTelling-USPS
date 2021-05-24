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

function handleStepEnterDELETE(resp) {
  const scrollPoz = window.scrollY;

  const currentStepId = resp.element.id;
  const currentStepClass = resp.element.className;
  const isYearElement = currentStepClass.includes("year");

  if (currentStepId === "intro") {
    changeEventsDownard.intro(totalMdVolume);
  }

  let currentYear;
  let dataToyear;

  if (isYearElement) {
    currentYear = parseInt(currentStepId.match(/\d+/g));
    dataToyear = totalMdVolume.filter((row) => row.date <= currentYear);
  }

  if (isYearElement) {
    if (resp.direction === "down") {
      drawBar(totalMdVolume, currentYear);

      // console.log(current)

      // drawAllBars(totalMdVolume);
    }
    if (resp.direction === "up") {
      removeBar(totalMdVolume, currentYear);
      cleanupZeroBars();

      fillMissingBars(totalMdVolume, currentYear);
    }
  }

  const renderedText = document.querySelector("#renderedText");

  renderedText.className = "fadeOut";

  setTimeout(() => {
    renderedText.className = "fadeIn";
    renderedText.innerHTML = textStory[currentStepId];
  }, 500);

  if (currentStepId === "classBreakdown") {
    if (resp.direction === "down") {
      fadeBarsOut("bar");
    }
    if (resp.direction === "up") {
      fadeBarsOut("stacked");
    }

    // setTimeout(() => {
    //   stackedBarChart(cra);
    // }, 1000);
  }

  if (currentStepId === "firstAndLast") {
    console.log(resp.direction);

    if (resp.direction === "down") {
      middleBarsDown();

      setTimeout(() => {
        middleBarsDownFinalState();
      }, 1800);
    }

    if (resp.direction === "up") {
      // setTimeout(() => {
      //   middleBarsDownFinalState();
      // }, 1800);

      middleBarsDownReverse();
    }
  }

  if (currentStepId === "productLevel") {
    forceChart();
  }
}
