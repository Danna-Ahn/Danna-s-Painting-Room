const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
canvas.width = 1000;
canvas.height = 500;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 1000, 500);
ctx.strokeStyle = "##2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "##2c2c2c";

let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onMouseDown(event) {
  painting = true;
}
function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
}

function stopPainting() {
  painting = false;
}

function rangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
  var value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, green 0%, green " +
    value +
    "%, #fffdcc " +
    value +
    "%, #fffdcc 100%)";
}

function modeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function canvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 1000, 500);
  }
}

function rightClick(event) {
  event.preventDefault();
}

function saveClick(event) {
  const image = canvas.toDataURL("image");
  const link = document.createElement("a");
  link.href = image;
  link.download = "ArtWork🐭";
  link.click();
  console.log(link);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", rightClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", rangeChange);
}

if (mode) {
  mode.addEventListener("click", modeClick);
}
