import { updateLine, bar } from "./graphFunctions.js";
import cra from "./data/craData.js";
import { totalMdVolume } from "./data/dataPrep.js";
import { per } from "./data/dataPrep.js";
// import cow from "./data/dataPreprocessing";

console.log("tot", totalMdVolume);
console.log("per", per);
// console.log(cow);
// console.log(cra);

// const mdTemp = cra.filter((row) => row.class == "MD");
// let totalMd = [];

// function rowConverter(row) {
//   return {
//     date: row.fy,
//     value: row.vol,
//   };
// }

// mdTemp.forEach((row) => {
//   totalMd.push(rowConverter(row));
// });

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

  bar(totalMdVolume);

  //   if (scrollPoz <= changeEvents.barGraph) {
  //     updateLine(filteredData);
  //     //   bar(rawDataGroup);
  //   } else {
  //     bar(rawDataGroup);
  //     //   // update(filteredData);
  //   }
}

bar(totalMdVolume);

// there is hope!!

console.log(
  d3.max(totalMdVolume, (d) => {
    return d.value;
  })
);
