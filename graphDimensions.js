// set the dimensions and margins of the graph\

import { totalMdVolume } from "./data/dataPrep.js";

export const margin = { top: 50, right: 80, bottom: 30, left: 70, barTop: 20 };
export const width = 550 - margin.left - margin.right;
export const height = 450 - margin.top - margin.bottom;
export const barWidth = 10;
export const forceWidth = 20;

export const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain([
    d3.min(totalMdVolume, (d) => {
      return d.date;
    }),
    d3.max(totalMdVolume, function (d) {
      return d.date;
    }),
  ]);

export const yScaleReverse = d3
  .scaleLinear()
  .range([height, 0])
  .domain([
    0,
    d3.max(totalMdVolume, function (d) {
      return d.value;
    }),
  ]);

export const yScale = d3
  .scaleLinear()
  .range([0, height])
  .domain([
    // d3.min(totalMdVolume, function (d) {
    //   return d.value;
    // }),
    0,
    d3.max(totalMdVolume, function (d) {
      return d.value;
    }),
  ]);

export const xScaleInd = d3
  .scaleLinear()
  .range([0, 380])
  .domain([
    d3.min(totalMdVolume, (d, i) => {
      return i;
    }),
    d3.max(totalMdVolume, (d, i) => {
      return i;
    }),
  ]);

export const changeEvents = {
  //   intro: drawAxes(totalMdVolume),
  // year2006: drawBar(),
  // year2007: drawBar(),
  // year2008: drawBar(),
  // year2009: drawBar(),
};
