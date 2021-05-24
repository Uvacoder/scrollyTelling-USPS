import {
  updateLine,
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
  lastCalledEvent,
  middleBarsDownReverse,
  forceChartReverse,
} from "./graphFunctions.js";
import { totalMdVolume } from "./data/dataPrep.js";
import textStory from "./textStory.js";
import cra from "./data/craData.js";

export const changeEventsDownard = {
  intro: drawAxes,
  year2006: drawBar,
  year2007: drawBar,
  year2008: drawBar,
  year2009: drawBar,
  year2010: drawBar,
  year2011: drawBar,
  year2012: drawBar,
  year2013: drawBar,
  year2014: drawBar,
  year2015: drawBar,
  year2016: drawBar,
  year2017: drawBar,
  year2018: drawBar,
  year2019: drawBar,
  year2020: drawBar,
  classBreakdown: fromRegToStacked,
  firstAndLast: firstAndLastFunctions,
  productLevel: forceChartFunctions,
};

function firstAndLastFunctions() {
  middleBarsDown();

  //include cleanup functions heere
  //   include laststep functions here
}

function forceChartFunctions() {
  forceChart();
}

function fromRegToStacked() {
  fadeBarsOut("reg");
  stackedBarChart(cra, "allYears");
  fadeBarsIn("stacked");
}
