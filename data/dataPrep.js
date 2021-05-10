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

export { per };

// console.log(per);

export default per;
