let maxIterations = 500;

let zoomX = 1.5;
let zoomY = 1.5;


function setup() {
	createCanvas(1024, 1024);
	pixelDensity(1)
}

function draw() {
	loadPixels();

	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++){

			let a = map(x, 0, width, -zoomX, zoomX);
			let b = map(y, 0, height, -zoomY, zoomY);
			
			let ca = a;
			let cb = b;

			let n = 0;

			while(n < maxIterations){
				let za = a * a - b * b;
				let zb = 2 * a * b;

				a = za + ca;
				b = zb + cb;

				if(a + b > 32){
					break;
				}

				n++;
			}
			let bright = map(n, 0, maxIterations, 0, 1);
			bright = map(sqrt(bright), 0, 1, 0, 255);

			let index = (x + y * width) * 4;
			pixels[index + 0] = n == maxIterations? 0 : bright;
			pixels[index + 1] = n == maxIterations? 0 : bright;
			pixels[index + 2] = n == maxIterations? 0 : bright;
			pixels[index + 3] = 255;
		} 
	}
	updatePixels();
	noLoop();
}