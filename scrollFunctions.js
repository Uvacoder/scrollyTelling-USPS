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

import { changeEventsDownard } from "./stepFunctionsDownard.js";

import { changeEventsUpward } from "./stepFunctionsUpward.js";

let activateFunctions = [];
// activateFunctions[0] = drawBar();

// activateFunctions = [drawAxes, drawBar];

const scroller = scrollama();

let main = d3.select("main");
var scrolly = main.select("#scrolly");
var article = scrolly.select("article");
var step = article.selectAll(".step");

scroller
  .setup({
    step: "#scrolly article .step",
    offset: 0.63,
    debug: true,
  })
  .onStepEnter(handleStepEnter);

// d3 stack data

function handleStepEnter(resp) {
  const scrollPoz = window.scrollY;

  let scrollDirection = resp.direction;

  const currentStepId = resp.element.id;
  const currentStepClass = resp.element.className;
  const isYearElement = currentStepClass.includes("year");

  let currentYear;
  let dataToyear;

  if (isYearElement) {
    currentYear = parseInt(currentStepId.match(/\d+/g));
    dataToyear = totalMdVolume.filter((row) => row.date <= currentYear);
  }

  if (scrollDirection === "down") {
    if (currentStepId === "intro") {
      changeEventsDownard.intro(totalMdVolume);
    }

    if (isYearElement) {
      // changeEventsDownard.year2006(totalMdVolume, currentYear);
      changeEventsDownard[currentStepId](totalMdVolume, currentYear);
    }

    if (
      ["classBreakdown", "firstAndLast", "productLevel"].includes(currentStepId)
    ) {
      changeEventsDownard[currentStepId]();
    }
  }

  if (scrollDirection === "up") {
    if (currentStepId === "intro") {
      changeEventsUpward.intro(totalMdVolume);
    }

    if (isYearElement) {
      // changeEventsDownard.year2006(totalMdVolume, currentYear);
      changeEventsUpward[currentStepId](totalMdVolume, currentYear);
    }

    if (
      ["classBreakdown", "firstAndLast", "productLevel"].includes(currentStepId)
    ) {
      changeEventsUpward[currentStepId]();
    }
  }

  const renderedText = document.querySelector("#renderedText");

  renderedText.className = "fadeOut";

  setTimeout(() => {
    renderedText.className = "fadeIn";
    renderedText.innerHTML = textStory[currentStepId];
  }, 500);
}

// //SECONDARY GRAPH
// if (currentYear === 2008) {
//   // d3.selectAll("#secondaryGraph").remove();
//   d3.selectAll(".secondary").remove();
//   drawSecondaryAxes(totalMdVolume);
//   // document.querySelector("#secondaryViz").innerHTML = "MORE STUFF";
// }
// if (currentYear < 2008) {
//   d3.select("#secondaryGraph").remove();
// }
// }
