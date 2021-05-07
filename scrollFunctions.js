import { updateLine, bar } from "./graphFunctions.js";
import cra from "./data/craData.js";

// console.log(cra);

const mdTemp = cra.filter((row) => row.class == "MD");
let totalMd = [];

function rowConverter(row) {
  return {
    date: row.fy,
    value: row.vol,
  };
}

mdTemp.forEach((row) => {
  totalMd.push(rowConverter(row));
});

const changeEvents = {
  lineGraph: 0,
  barGraph: 1070,
};

// set the dimensions and margins of the graph
export const margin = { top: 10, right: 30, bottom: 30, left: 50 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
export const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
export const x = d3.scaleLinear().range([0, width]);
export const xAxis = d3.axisBottom().scale(x);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class", "myXaxis");

// Initialize an Y axis
export const y = d3.scaleLinear().range([height, 0]);
export const yAxis = d3.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis");

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

  bar(totalMd);

  //   if (scrollPoz <= changeEvents.barGraph) {
  //     updateLine(filteredData);
  //     //   bar(rawDataGroup);
  //   } else {
  //     bar(rawDataGroup);
  //     //   // update(filteredData);
  //   }
}

bar(totalMd);

// there is hope!!

console.log(
  d3.max(totalMd, (d) => {
    return d.value;
  })
);
