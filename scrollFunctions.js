import { updateLine, bar, drawAxes, drawBar } from "./graphFunctions.js";
// import cra from "./data/craData.js";
import { totalMdVolume } from "./data/dataPrep.js";
import { per } from "./data/dataPrep.js";
// import cow from "./data/dataPreprocessing";

const changeEvents = {
  // intro: drawAxes(totalMdVolume),
  // year2006: drawBar(),
  // year2007: drawBar(),
  // year2008: drawBar(),
  // year2009: drawBar(),
};

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
    drawAxes(totalMdVolume);
  }

  let currentYear;
  let dataToyear;

  if (yearElement) {
    currentYear = parseInt(currentStepId.match(/\d+/g));
    dataToyear = totalMdVolume.filter((row) => row.date <= currentYear);
  }

  if (yearElement) {
    drawBar(totalMdVolume, currentYear);
  }

  // // changeEvents[currentStepId];

  // // bar(totalMdVolume, currentYear);
}
