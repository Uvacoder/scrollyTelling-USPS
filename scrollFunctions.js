import { updateLine, bar } from "./graphFunctions.js";
import cra from "./data/craData.js";
import { totalMdVolume } from "./data/dataPrep.js";
import { per } from "./data/dataPrep.js";
// import cow from "./data/dataPreprocessing";

const changeEvents = {
  lineGraph: 0,
  barGraph: 1070,
};

const scroller = scrollama();

let main = d3.select("main");
var scrolly = main.select("#scrolly");
var article = scrolly.select("article");
var step = article.selectAll(".step");

scroller
  .setup({
    step: "#scrolly article .step",
    offset: 0.33,
    debug: true,
  })
  .onStepEnter(handleStepEnter);

function handleStepEnter(resp) {
  const scrollPoz = window.scrollY;

  const currentStepId = resp.element.id;
  const currentYear = parseInt(currentStepId.split("-")[1]);

  const dataToyear = totalMdVolume.filter((row) => row.date <= currentYear);

  bar(totalMdVolume, currentYear);
  // bar(dataToyear);

  //   if (scrollPoz <= changeEvents.barGraph) {
  //     updateLine(filteredData);
  //     //   bar(rawDataGroup);
  //   } else {
  //     bar(rawDataGroup);
  //     //   // update(filteredData);
  //   }
}

// bar(totalMdVolume, 2015);
// bar(totalMdVolume.filter((row) => row.date <= 2006));
