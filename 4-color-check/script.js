const input = document.querySelector("#inputvalue");
const submitBtn = document.querySelector("#submit");
const boxes = document.querySelectorAll(".box");
const info = document.querySelector(".copied");
document.querySelector("form").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

input.addEventListener("input", () => {
  if (input.value.length > 6) {
    input.value = input.value.slice(0, 6);
  }
  clicking();
});

input.addEventListener("keydown", (e) => {
  keycheck(e);
});

function keycheck(e) {
  let key = e.key;
  if (
    !/^[0-9A-Fa-f]$/.test(key) &&
    key !== "Backspace" &&
    key !== "Delete" &&
    key !== "ArrowLeft" &&
    key !== "ArrowRight" &&
    key !== "Enter"
  ) {
    e.preventDefault();
  }
  if (key === "Enter") {
    clear();
  }
}

boxes.forEach((box) => {
  let span = box.querySelector("span");

  box.addEventListener("click", () => {
    box.classList.toggle("selected");
    clicking();
  });

  span.addEventListener("click", (e) => {
    e.stopPropagation();

    let bgColor = window.getComputedStyle(box).backgroundColor;
    let hexColor = rgbToHex(bgColor);
    navigator.clipboard.writeText(hexColor);
    info.classList.add("copies");
    setTimeout(() => {
      info.classList.remove("copies");
    }, 2000);
  });
});

document.body.addEventListener("keydown", (e) => {
  if (
    /^[0-9a-fA-F]$/.test(e.key) ||
    e.key === "Backspace" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight"
  ) {
    input.focus();
  }
  keycheck(e);
});

submitBtn.addEventListener("click", clear);

function clicking() {
  let selected = document.querySelectorAll(".selected");

  if ([3, 6].includes(input.value.length)) {
    let hexCode = `#${input.value}`;

    // Convert shorthand hex to full hex before applying
    if (hexCode.length === 4) {
      hexCode = `#${hexCode[1]}${hexCode[1]}${hexCode[2]}${hexCode[2]}${hexCode[3]}${hexCode[3]}`;
    }

    selected.forEach((box) => {
      box.style.backgroundColor = hexCode;

      let svgPath = box.querySelector("span svg path"); // Select the path inside SVG
      if (!svgPath) return;

      if (isDarkColor(hexCode)) {
        svgPath.style.fill = "#FFFFFF"; // Change to white for dark backgrounds
      } else {
        svgPath.style.fill = "#000000"; // Default black for light backgrounds
      }
    });
  }
}

function isDarkColor(hex) {
  if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) return false;

  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128;
}

function clear() {
  input.value = "";
  document.querySelectorAll(".selected").forEach((box) => {
    box.classList.remove("selected");
  });
}

function rgbToHex(rgb) {
  let result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  return `#${(
    (1 << 24) +
    (parseInt(result[0]) << 16) +
    (parseInt(result[1]) << 8) +
    parseInt(result[2])
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}
