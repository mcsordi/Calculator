let response = document.getElementById("result");
let allNumbers = [...document.querySelectorAll(".someNumbers")];
let allOperations = [...document.querySelectorAll(".operations")];
let clearAll = document.getElementById("clearResult");
let backspace = document.getElementById("backspace");
let buttonEqual = document.getElementById("equal");
let copyButton = document.getElementById("copy");

const removeFontSize = () => {
  if (response.innerHTML == "Expressão mal formada") {
    response.innerHTML = "0";
    response.classList.remove("smallFont");
  }
};

const getElement = (el) => {
  el.map((element) => {
    element.addEventListener("click", (evt) => {
      removeFontSize();
      if (response.innerHTML == 0) {
        response.innerHTML = evt.target.innerHTML;
      } else {
        response.innerHTML += evt.target.innerHTML;
      }
      signal = false;
    });
  });
};

let signal = false;

allOperations.map((element) => {
  element.addEventListener("click", (evt) => {
    removeFontSize();
    if (!signal) {
      signal = true;
      if (response.innerHTML == 0) {
        response.innerHTML = evt.target.innerHTML;
      } else {
        response.innerHTML += evt.target.innerHTML;
      }
    }
  });
});
clearAll.addEventListener("click", () => {
  removeFontSize();
  response.innerHTML = 0;
  signal = true;
});
backspace.addEventListener("click", () => {
  removeFontSize();
  let numElements = response.innerHTML.length;
  let positionNumbers = response.innerHTML[response.innerHTML.length - 1];
  if (numElements == 1) {
    positionNumbers = 0;
  }
  console.log("backspace.addEventListener ~ positionNumbers:", positionNumbers);

  if (numElements <= 1) {
    response.innerHTML = 0;
  } else {
    response.innerHTML = response.innerHTML.slice(
      numElements[0],
      numElements - 1
    );
  }
  if (
    positionNumbers == "+ " ||
    positionNumbers == "-" ||
    positionNumbers == "x " ||
    positionNumbers == "÷" ||
    positionNumbers == "." ||
    positionNumbers == 0
  ) {
    signal = true;
  }
});

buttonEqual.addEventListener("click", () => {
  try {
    response.innerHTML = eval(
      response.innerHTML.replace(/x|÷/g, function (val) {
        if (val == "x") {
          return "*";
        } else {
          return "/";
        }
      })
    );
  } catch (error) {
    response.innerHTML = `Expressão mal formada`;
    response.classList.add("smallFont");
    return;
  }
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(response.innerHTML);
});

getElement(allNumbers);

window.onload = () => {
  if (response.innerHTML == 0) {
    signal = true;
  }
};
