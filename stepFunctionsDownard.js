import {
  drawAxes,
  drawSecondaryAxes,
  drawBar,
  removeBar,
  stackedBarChart,
  fadeBarsOut,
  fadeBarsIn,
  drawAllBars,
  cleanupZeroBars,
  fillMissingBars,
  middleBarsDown,
  middleBarsDownFinalState,
  forceChart,
  middleBarsDownReverse,
  forceChartReverse,
  removeAxesFade,
  createSVG,
} from "./graphFunctions.js";

import { totalMdVolume } from "./data/dataPrep.js";
import textStory from "./textStory.js";
import cra from "./data/craData.js";

let lastUpwardEventFinished;

export const changeEventsDownard = {
  intro: introFunctions,
  year2006: drawYearFunctions,
  year2007: drawYearFunctions,
  year2008: drawYearFunctions,
  year2009: drawYearFunctions,
  year2010: drawYearFunctions,
  year2011: drawYearFunctions,
  year2012: drawYearFunctions,
  year2013: drawYearFunctions,
  year2014: drawYearFunctions,
  year2015: drawYearFunctions,
  year2016: drawYearFunctions,
  year2017: drawYearFunctions,
  year2018: drawYearFunctions,
  year2019: drawYearFunctions,
  year2020: drawYearFunctions,
  classBreakdown: fromRegToStacked,
  firstAndLast: firstAndLastFunctions,
  productLevel: forceChartFunctions,
};

function introFunctions() {
  createSVG();
  drawAxes();
  // drawAllBars(totalMdVolume);
}

function drawYearFunctions(totalMdVolume, currentYear) {
  drawBar(totalMdVolume, currentYear);

  setTimeout(() => {
    if (currentYear === 2020) {
      drawAllBars(totalMdVolume);
    }
  }, 900);
}

function firstAndLastFunctions() {
  d3.selectAll(".bar").remove();
  stackedBarChart(cra, "allYears");
  d3.selectAll(".bar").style("opacity", 1);
  middleBarsDown();
}

function forceChartFunctions() {
  d3.selectAll(".bar").remove();

  stackedBarChart(cra, "outsideYears");
  d3.selectAll(".bar").style("opacity", 1);
  forceChart();
  removeAxesFade();
}

function fromRegToStacked() {
  d3.select("svg").remove();

  createSVG();
  drawAxes();

  drawAllBars(totalMdVolume);
  d3.selectAll(".reg").style("opacity", 1);

  d3.selectAll(".reg").transition().duration(500).style("opacity", 0);

  stackedBarChart(cra, "allYears");
  d3.selectAll(".stacked").style("opacity", 0);

  d3.selectAll(".stacked").transition().duration(500).style("opacity", 1);

  // d3.selectAll(".bar").remove();

  // fadeBarsOut("reg");
  // stackedBarChart(cra, "allYears");
  // d3.selectAll(".stacked").style("opacity", 0);

  // fadeBarsIn("stacked");

  // setTimeout(() => {
  //   d3.selectAll(".reg").remove();
  // }, 900);
}
