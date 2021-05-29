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
  drawAxesFade,
  createSVG,
} from "./graphFunctions.js";
import { totalMdVolume } from "./data/dataPrep.js";
import textStory from "./textStory.js";
import cra from "./data/craData.js";

export const changeEventsUpward = {
  intro: drawAxes,
  year2006: removeBar,
  year2007: removeBar,
  year2008: removeBar,
  year2009: removeBar,
  year2010: removeBar,
  year2011: removeBar,
  year2012: removeBar,
  year2013: removeBar,
  year2014: removeBar,
  year2015: removeBar,
  year2016: removeBar,
  year2017: removeBar,
  year2018: removeBar,
  year2019: removeBar,
  year2020: removeBar,
  classBreakdown: fromStackedToReg,
  firstAndLast: firstAndLastFunctions,
  productLevel: forceChartReverseAll,
};

function fromStackedToReg() {
  d3.select("svg").remove();

  createSVG();
  drawAxes();

  drawAllBars(totalMdVolume);
  d3.selectAll(".reg").style("opacity", 0);

  d3.selectAll(".reg").transition().duration(1500).style("opacity", 1);

  stackedBarChart(cra, "allYears");
  d3.selectAll(".stacked").style("opacity", 1);

  d3.selectAll(".stacked").transition().duration(1500).style("opacity", 0);
}

function firstAndLastFunctions() {
  d3.select("svg").remove();

  createSVG();
  drawAxes();

  stackedBarChart(cra, "outsideYears");
  d3.selectAll(".bar").style("opacity", 1);

  // stacked bar chart middle years only

  // stackedBarChart(cra, "middleYears");
  // d3.selectAll(".middle").attr("height", 0);

  // d3.selectAll(".middle").transition().duration(1000)
  //initialize with height 0
  // then middlebardown reverse

  middleBarsDownReverse();
}

function forceChartReverseAll() {
  forceChartReverse();
  drawAxesFade();
}
