// set the dimensions and margins of the graph\

export const margin = { top: 10, right: 30, bottom: 30, left: 50 };
export const width = 460 - margin.left - margin.right;
export const height = 300 - margin.top - margin.bottom;

export function returnXScale(data) {
  return d3
    .scaleLinear()
    .range([0, width])
    .domain([
      d3.min(data, (d) => {
        return d.date;
      }),
      d3.max(data, function (d) {
        return d.date;
      }),
    ]);
}

export function returnYScale(data) {
  return d3
    .scaleLinear()
    .range([0, height])
    .domain([
      d3.min(data, function (d) {
        return d.value;
      }),
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);
}

export function returnYAxisScale(data) {
  return d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      d3.min(data, function (d) {
        return d.value;
      }),
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);
}

export const changeEvents = {
  //   intro: drawAxes(totalMdVolume),
  // year2006: drawBar(),
  // year2007: drawBar(),
  // year2008: drawBar(),
  // year2009: drawBar(),
};
