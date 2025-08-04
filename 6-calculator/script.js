let currentInput = "";
document.getElementById("display").value = "0";

function appendToDisplay(value) {
  currentInput += value;
  document.getElementById("display").value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  document.getElementById("display").value = "0";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  document.getElementById("display").value = currentInput;
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    document.getElementById("display").value = currentInput;
  } catch (error) {
    document.getElementById("display").value = "Error";
    currentInput = "";
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    appendToDisplay(key);
  } else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "%" ||
    key === "(" ||
    key === ")"
  ) {
    appendToDisplay(key);
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Enter") {
    calculate();
  }
});
