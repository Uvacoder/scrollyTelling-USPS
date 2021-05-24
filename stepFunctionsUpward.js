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
  firstAndLast: middleBarsDownReverse,
  productLevel: forceChartReverse,
};

function fromStackedToReg() {
  fadeBarsOut("stacked");
  drawAllBars(totalMdVolume);
  fadeBarsIn("reg");

  //include cleanup functions heere
  //   include laststep functions here
}
