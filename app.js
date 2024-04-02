(function () {
  const currentYearEle = document.querySelector("footer #current-year");
  if (currentYearEle) {
    currentYearEle.innerHTML = new Date().getFullYear();
  }
})();

function transform() {
  const numberSeriesEle = document.querySelector("#numberSeries");
  const prefixEle = document.querySelector("#prefixText");
  const inputEle = document.querySelector("#input-text-area");
  const outputEle = document.querySelector("#output-text-area");
  const alertEle = document.querySelector("#alert");

  // Remove successful banner if any
  alertEle.classList.remove("hide");

  const series = Number(numberSeriesEle.value);
  const prefix = prefixEle.value;
  const stringArr = inputEle.value.split("\n");
  const length = stringArr.length;
  const regex = new RegExp(`${prefix}(.*)\\d`, "gm");

  let num = 0;
  let index = 0;

  do {
    const str = stringArr[index];
    const isMatched = str.match(regex);
    if (isMatched) {
      stringArr[index] = str.replace(
        regex,
        `${prefix}${String(num + 1).padStart(series, "0")}`
      );
      num++;
    }
    index++;
  } while (index < length);

  const result = stringArr.join("\n");

  // Assign the result to the output text field
  outputEle.value = result;

  // Select the output text field
  outputEle.select();
  outputEle.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(result);

  // Show the successful banner
  alertEle.classList.add("show");

  // Hide the banner after 2 seconds
  setTimeout(() => {
    alertEle.classList.remove("show");
    alertEle.classList.add("hide");
  }, 2000);
}

function onShowHowToUse() {
  const howToUseSectionEle = document.querySelector("#how-to-use");

  if (howToUseSectionEle.classList.contains("show")) {
    howToUseSectionEle.classList.remove("show");
    howToUseSectionEle.classList.add("hide");
  } else {
    howToUseSectionEle.classList.remove("hide");
    howToUseSectionEle.classList.add("show");
  }
}
