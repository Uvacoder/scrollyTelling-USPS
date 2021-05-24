import cra from "./craData.js";

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

const totalMdVolume = totalMd.sort(function (a, b) {
  return a.date > b.date;
});

export { totalMdVolume };

// console.log(totalMd);

const per = cra.filter((row) => row.class == "PER");

export function stackData(cra, craFilterType) {
  let classes = d3
    .map(cra, function (d) {
      return d.class;
    })
    .keys();

  classes = classes.slice(0, 4);

  let craFiltered = cra
    .filter((row) => classes.includes(row.class))
    .filter((row) => row.total === "yes");

  const colors = ["#4D9981", "#46E6B4", "#E6BA5C", "#6F2E99"];

  let years = [
    2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
    2018, 2019, 2020,
  ];

  if (craFilterType === "middleYears") {
    years = years.filter((year) => year !== 2008 && year !== 2020);
  }

  if (craFilterType === "outsideYears") {
    years = years.filter((year) => year === 2008 || year === 2020);
  }

  const relavantCols = craFiltered.map((row) => {
    return { fy: row.fy, class: row.class, vol: row.vol };
  });

  let preStack = [];

  for (let i = 0; i < years.length; i++) {
    const thisYear = years[i];
    const yearRows = relavantCols.filter((row) => row.fy === thisYear);

    const thisMM = yearRows.filter((row) => row.class == "MM")[0].vol;
    const thisFC = yearRows.filter((row) => row.class == "FC")[0].vol;
    const thisPER = yearRows.filter((row) => row.class == "PER")[0].vol;
    const thisPS = yearRows.filter((row) => row.class == "PS")[0].vol;

    preStack.push({
      date: thisYear,
      mm: thisMM,
      fc: thisFC,
      per: thisPER,
      ps: thisPS,
    });
  }

  const genStack = d3.stack().keys(["fc", "mm", "per", "ps"]);

  const stackedData = genStack(preStack);

  console.log(stackedData);

  return stackedData;
}
