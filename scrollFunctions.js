import {
  updateLine,
  drawAxes,
  drawSecondaryAxes,
  drawBar,
  removeBar,
  stackedBarChart,
} from "./graphFunctions.js";
import { totalMdVolume } from "./data/dataPrep.js";
import textStory from "./textStory.js";
import { cra } from "./data/craData.js";

const changeEvents = {
  intro: drawAxes,
};

// const funcArray = [drawAxes];

// const changeEvents = {
//   intro: drawAxes,
// };

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

  const currentStepId = resp.element.id;
  const currentStepClass = resp.element.className;
  const isYearElement = currentStepClass.includes("year");

  if (currentStepId === "intro") {
    changeEvents.intro(totalMdVolume);
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
    }
    if (resp.direction === "up") {
      removeBar(totalMdVolume, currentYear);
    }
  }

  const renderedText = document.querySelector("#renderedText");

  renderedText.className = "fadeOut";

  setTimeout(() => {
    renderedText.className = "fadeIn";
    renderedText.innerHTML = textStory[currentStepId];
  }, 500);

  if (currentStepId === "classBreakdown") {
    // changeEvents.intro(totalMdVolume);

    // drawAxes(totalMdVolume);

    d3.selectAll(".bar").remove();

    stackedBarChart(cra, totalMdVolume);
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
}
