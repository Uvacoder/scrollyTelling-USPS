// const scrolly = document.querySelector("#scrolly");
const scrollSteps = document.getElementById("scrollSteps");

for (let i = 2006; i < 2021; i++) {
  const yearStep = `<div class="step" id=year-${i}>
    <p>${i}</p>
  </div>`;
  scrollSteps.innerHTML += yearStep;
}

console.log(scrollSteps);
// console.log("scrolly");
