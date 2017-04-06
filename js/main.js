const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 50;

let isDrawing = false; //Flag to check if mousebutton is down
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
	if (!isDrawing) return;
	//console.log(e);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	//ctx.lineWidth = hue;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	lastX = e.offsetX;
	lastY = e.offsetY;
	hue++;
	if (hue >= 360) {
		hue = 0;
	}
	if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
		direction = !direction;
	}
	
	if (direction) {
		ctx.lineWidth++;
	} 
	else ctx.lineWidth--;
	
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
	isDrawing = true;
	lastX = e.offsetX;
	lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseout", () => isDrawing = false);

// Downloading the image

function downloadImage() {
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
	window.location.href = image; // it will save locally

}