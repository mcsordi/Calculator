let response = document.getElementById("result");
let allNumbers = [...document.querySelectorAll(".someNumbers")];
let allOperations = [...document.querySelectorAll(".operations")];
let clearAll = document.getElementById("clearResult");
let backspace = document.getElementById("backspace");
let buttonEqual = document.getElementById("equal");

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
    });
  });
};
clearAll.addEventListener("click", () => {
  removeFontSize();
  response.innerHTML = "0";
});
backspace.addEventListener("click", () => {
  removeFontSize();
  let numElements = response.innerHTML.length;
  if (numElements <= 1) {
    response.innerHTML = 0;
  } else {
    response.innerHTML = response.innerHTML.slice(
      numElements[0],
      numElements - 1
    );
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

getElement(allNumbers);
getElement(allOperations);
