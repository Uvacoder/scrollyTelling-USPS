import {
  updateLine,
  bar,
  drawAxes,
  drawSecondaryAxes,
  drawBar,
  removeBar,
} from "./graphFunctions.js";
import { totalMdVolume } from "./data/dataPrep.js";
import textStory from "./textStory.js";

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

function handleStepEnter(resp) {
  const scrollPoz = window.scrollY;

  const currentStepId = resp.element.id;
  const currentStepClass = resp.element.className;
  const yearElement = currentStepClass.includes("year");

  if (currentStepId === "intro") {
    // drawAxes(totalMdVolume);
    changeEvents.intro(totalMdVolume);
    // activateFunctions[0]();
  }

  let currentYear;
  let dataToyear;

  if (yearElement) {
    currentYear = parseInt(currentStepId.match(/\d+/g));
    dataToyear = totalMdVolume.filter((row) => row.date <= currentYear);
  }

  if (yearElement) {
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

  console.log(currentYear);

  if (currentYear === 2008) {
    // d3.selectAll("#secondaryGraph").remove();
    d3.selectAll(".secondary").remove();
    drawSecondaryAxes(totalMdVolume);
    // document.querySelector("#secondaryViz").innerHTML = "MORE STUFF";
  }
  if (currentYear < 2008) {
    d3.select("#secondaryGraph").remove();
  }
}
