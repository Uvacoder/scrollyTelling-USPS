import { totalMdVolume } from "./data/dataPrep.js";
import {
  margin,
  width,
  height,
  xScale,
  xScaleInd,
  yScale,
  yScaleReverse,
} from "./graphDimensions.js";

import cra from "./data/craData.js";
import craFiltInital from "./data/craFiltered.js";

import { stackData } from "./data/dataPrep.js";

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

  const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")
    .call(xAxis);

  var yAxis = d3.axisLeft().scale(yScaleReverse);
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

  const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")
    .call(xAxis);

  var yAxis = d3.axisLeft().scale(yScale);
  svg.append("g").attr("class", "myYaxis").call(yAxis);
}

export function drawBar(data, currentYear) {
  // Initialise a X axis:

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
    .attr("class", "bar  reg");

  d3.select(`#bar${thisYear}`)
    .transition()
    .duration(1000)
    .attr("height", yScale(thisValue));

  setTimeout(() => {
    d3.selectAll(".bar zero").attr("height", (data) => {
      return yScale(data.value);
    });
  }, 1150);

  removedStackedbars();
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

  removedStackedbars();
}

export function fillMissingBars(data, currentYear) {
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

  const barsRequired = allYears.slice(0, allYears.indexOf(currentYear) + 1);

  const barElementsExisting = d3.selectAll(".bar")._groups[0];

  const barYearsExisting = Array.from(barElementsExisting).map((node) =>
    parseInt(node.id.match(/\d+/g))
  );

  let barsMissing = [];

  barsRequired.map((year) => {
    if (!barYearsExisting.includes(year)) {
      barsMissing.push(year);
    }
  });

  barsMissing.map((year) => drawBar(totalMdVolume, year));

  const allBarHeights = Array.from(barElementsExisting).map(
    (node) => node.attributes[2].nodeValue
  );

  for (let i = 0; i < barYearsExisting.length; i++) {
    const aYear = barYearsExisting[i];

    if (allBarHeights[i] === "0") {
      const dataToyear = totalMdVolume.filter(
        // (row) => row.date === parseString(aYear)
        (row) => row.date === parseInt(aYear)
      );
      const thisValue = dataToyear[0].value;

      d3.select(`#bar${aYear}`)
        .transition()
        .duration(1000)
        .attr("height", yScale(thisValue));
    }
  }
}

export function drawAllBars(data) {
  const svg = d3.select("svg");

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => {
      return xScale(d.date);
    })
    .attr("y", (d) => {
      return yScaleReverse(d.value);
    })
    .attr("height", (d) => {
      return yScale(d.value);
      // return 100;
    })
    .attr("width", 10)
    .attr("fill", "black")
    .attr("id", (d) => {
      return `bar${d.date}`;
    })
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "bar reg");

  svg
    .selectAll(".zero")
    .classed("zero", false)
    .attr("height", (d) => {
      return yScale(d.value);
    });
}

export function stackedBarChart(cra, totalMdVolume) {
  const stackedData = stackData(cra, totalMdVolume);

  const svg = d3.select("svg");

  var color = d3
    .scaleOrdinal()
    .domain(["fc", "mm", "per", "ps"])
    .range(["#e41a1c", "#377eb8", "#4daf4a", "#6F2E99"]);

  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", function (d) {
      return color(d.key);
    })
    .selectAll("rect")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      return xScaleInd(i);
    })

    .attr("y", function (d) {
      return yScaleReverse(d[1]);
    })
    .attr("height", function (d) {
      const diff = d[1] - d[0];
      return yScale(diff);
    })
    .attr("width", 10)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", (d) => {
      let barYear = d.data.date;
      if (barYear === 2008 || barYear === 2020) {
        return `bar stacked outside`;
      } else {
        return `bar stacked inside`;
      }
    })
    .attr("id", (d) => {
      return d[0];
      // return d.data.date;
    })
    .style("opacity", 0);

  // console.log(stackedData);
}

export function removedStackedbars() {
  d3.selectAll(".stacked").remove();
  d3.selectAll(".reg").style("opacity", 1);
}

export function cleanupZeroBars() {
  d3.selectAll(".zero").transition().duration(1000).attr("height", 0);

  setTimeout(() => {
    d3.selectAll(".zero").remove();
  }, 1000);
}

export function fadeBarsOut(barClass) {
  barClass = `.${barClass}`;
  d3.selectAll(barClass).transition().duration(1000).style("opacity", 0);
}

export function fadeBarsIn(barClass) {
  barClass = `.${barClass}`;
  d3.selectAll(barClass).transition().duration(1000).style("opacity", 1);
}

export function middleBarsDown() {
  d3.selectAll(".inside")
    .transition()
    .duration(1750)
    .attr("height", 0)
    .attr("class", "bar stacked inside zero");

  setTimeout(() => {
    d3.selectAll(".zero").remove();
    d3.selectAll(".reg").remove();
  }, 1750);
}

export function middleBarsDownFinalState() {
  // dont do it this way just run the full stack function then middle bars down

  stackedBarChart(cra, totalMdVolume);
  middleBarsDown();
}

export function forceChart() {
  d3.selectAll(".stacked").remove();

  d3.select(".myXaxis").transition().duration(1000).style("opacity", 0);
  d3.select(".myYaxis").transition().duration(1000).style("opacity", 0);

  // setTimeout(() => {
  //   d3.select(".myXaxis").remove();
  //   d3.select(".myYaxis").remove();
  // }, 1000);

  let craFilt = craFiltInital;

  let aggregateVolume = 0;
  let aggregateVolumeWithMargin = 0;

  for (let i = 1; i < craFilt.length; i++) {
    const previousElement = craFilt[i - 1];
    const currentElement = craFilt[i];
    aggregateVolume += previousElement.vol;
    // if (currentElement.fy === 2006 && currentElement.name === "spLetters") {
    //   aggregateVolume = aggregateVolume - 163;
    // }

    aggregateVolumeWithMargin = aggregateVolume + i * 3.2;
    // aggregateVolumeWithMargin +=

    currentElement.aggregateVolume = aggregateVolume;
    currentElement.aggregateVolumeWithMargin = aggregateVolumeWithMargin;
  }

  // craFilt[0].prevYPoz = 0;
  craFilt[0].aggregateVolume = 0;
  craFilt[0].aggregateVolumeWithMargin = 0;

  console.log(craFilt);

  const svg = d3.select("svg");

  svg
    .selectAll(".force")
    .data(craFilt)
    .enter()
    .append("rect")
    .attr("x", (d) => {
      return xScale(d.fy) + margin.left;
    })
    .attr("y", (d) => {
      let yPoz = yScaleReverse(d.vol) + yScaleReverse(d.aggregateVolume);

      if (d.fy === 2008) {
        return yPoz - 200;
      } else {
        return yPoz;
      }
    })
    .attr("height", (d) => {
      return yScale(d.vol);
    })
    .attr("width", 10)
    .attr("fill", (d) => {
      if (d.class === "FC") {
        return "#e41a1c";
      }
      if (d.class === "MM") {
        return "#377eb8";
      }
      if (d.class === "PER") {
        return "#4daf4a";
      }
      if (d.class === "PS") {
        return "#6F2E99";
      }
    })
    .attr("class", "force")
    .attr("id", (d) => d.name);

  d3.selectAll(".force")
    .transition()
    .duration(2000)
    .attr("height", (d) => {
      return yScale(d.vol);
    })
    .attr("y", (d) => {
      let yPozForce =
        yScaleReverse(d.vol) + yScaleReverse(d.aggregateVolumeWithMargin);

      if (d.fy === 2008) {
        // return yScaleReverse(d.aggregateVolumeWithMargin);
        return yPozForce - 100 - 50;
      } else {
        // return yScaleReverse(d.aggregateVolumeWithMargin);
        return yPozForce + 100 - 50;
      }
    })
    .attr("width", 20)
    .style("margin-top", 10);
}

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
