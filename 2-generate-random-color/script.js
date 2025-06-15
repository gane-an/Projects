const colorDisplay = document.querySelector(".display");
const genBtn = document.querySelector(".gen-btn");
const copyBtn = document.querySelector(".copy-btn");
const hexCode = document.querySelector("#hexCode");
const info = document.querySelector(".info-content");
let hex = "123456789ABCDEF";
colorDisplay.style.backgroundColor = "#000";

genBtn.addEventListener("click", generateCode);
function generateCode() {
  let code = "#";
  for (let i = 0; i < 6; i++) {
    code += hex[Math.floor(Math.random() * hex.length)];
  }
  hexCode.value = code;
  colorDisplay.style.backgroundColor = code;
  //   hexCode.style.color = code;
}
// window.onload(generateCode);

copyBtn.addEventListener("click", () => {
  //   hexCode.select();
  //   document.execCommand("copy");

  navigator.clipboard.writeText(hexCode.value);

  info.style.transform = "translateX(0)";
  setTimeout(() => {
    info.style.transform = "translateX(200%)";
  }, 2000);
});
