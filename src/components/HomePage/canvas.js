// window.onload = function() {
// 	makeCanvas();
// 	setTimeout(() => {
// 		addActiveClass("section-1")
// 	}, 1000)
// };

export default () => {
	let canvas = document.getElementById("canvas_bg1");
	let ctx = canvas.getContext("2d");

	let gradient = ctx.createLinearGradient(5, 15, 32, 32);
	gradient.addColorStop(0, "green");
	gradient.addColorStop(0.5, "white");
	gradient.addColorStop(1, "yellow");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 32, 32);

	gradient = ctx.createLinearGradient(0, 32, 32, 0);
	gradient.addColorStop(0, "pink");
	gradient.addColorStop(0.5, "rgba(23, 222, 128, 0.7)");
	gradient.addColorStop(1, "yellow");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 32, 32);


	canvas = document.getElementById("canvas_bg2");
	ctx = canvas.getContext("2d");

	gradient = ctx.createLinearGradient(0, 22, 32, 12);
	gradient.addColorStop(0, "#ff38ff");
	gradient.addColorStop(0.5, "rgba(0,0,0,0.0)");
	gradient.addColorStop(1, "#e500e5");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 32, 32);
}

// function addActiveClass (className) {
// 	document.getElementsByClassName("section-title")[0].className += " active";
// }
