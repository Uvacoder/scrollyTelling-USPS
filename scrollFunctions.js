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

const allStepTriggers = [
  "intro",
  "year2006",
  "year2008",
  "year2009",
  "year2010",
  "year2011",
  "year2012",
  "year2013",
  "year2014",
  "year2015",
  "year2016",
  "year2017",
  "year2018",
  "year2019",
  "year2020",
  "classBreakdown",
  "firstAndLast",
  "productLevel",
];

// function currentStepVLastCalled(){
function eventDifferenceSnip(currentStepId, lastCalledEvent) {
  let snipOutput;

  const currentStepIndex = allStepTriggers.indexOf(currentStepId);
  const lastCalledIndex = allStepTriggers.indexOf(lastCalledEvent);

  console.log(currentStepId, lastCalledEvent);
  // console.log(currentStepIndex, lastCalledIndex);

  if (lastCalledIndex > currentStepIndex) {
    snipOutput = allStepTriggers.slice(currentStepIndex, lastCalledIndex);

    console.log(snipOutput);
  }
  if (lastCalledEvent < currentStepIndex) {
    snipOutput = allStepTriggers.slice(lastCalledIndex, currentStepIndex);
    snipOutput.reverse();
    console.log(snipOutput);
  }
}

// let t;
// function recordStep(lastCalledEvent, currentStepId) {
//   lastCalledEvent = currentStepId;
// }

scroller
  .setup({
    step: "#scrolly article .step",
    offset: 0.63,
    debug: true,
  })
  .onStepEnter(handleStepEnter);

// d3 stack data

function handleStepEnter(resp) {
  let lastCalledEvent = "bob";

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
      changeEventsDownard[currentStepId](totalMdVolume, currentYear);

      // clearTimeout(t);
      // t = setTimeout(() => {
      //   recordStep(lastCalledEvent, currentStepId);
      // }, 1000);

      // console.log(lastCalledEvent, currentStepId);
    }

    if (
      ["classBreakdown", "firstAndLast", "productLevel"].includes(currentStepId)
    ) {
      changeEventsDownard[currentStepId]();
    }

    // if (currentStepId === "classBreakdown")
    //   // console.log("triggered atscroll functions ");
    //   // changeEventsDownard[`${classBreakdown}`]();
    //   changeEventsDownard[`classBreakdown`]();
  }

  if (scrollDirection === "up") {
    if (currentStepId === "intro") {
      changeEventsUpward.intro(totalMdVolume);
    }

    if (isYearElement) {
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
