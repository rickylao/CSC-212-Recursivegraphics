var canvas = document.getElementById('theCanvas');
const ctx = canvas.getContext('2d');
//Create Canvas
const width = window.innerWidth/2;
const height = window.innerHeight/1.2;

canvas.width = width;
canvas.height = height;
/* Wikipedia pseudocode
for each pixel (Px, Py) on the screen do
    x0 := scaled x coordinate of pixel (scaled to lie in the Mandelbrot X scale (-2.00, 0.47))
    y0 := scaled y coordinate of pixel (scaled to lie in the Mandelbrot Y scale (-1.12, 1.12))
    x := 0.0
    y := 0.0
    iteration := 0
    max_iteration := 1000
    while (x*x + y*y ≤ 2*2 AND iteration < max_iteration) do
        xtemp := x*x - y*y + x0
        y := 2*x*y + y0
        x := xtemp
        iteration := iteration + 1

    color := palette[iteration]
    plot(Px, Py, color)
    */

function drawPixel(stuff, x, y, color) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    stuff.fillStyle = color || '#000';
  	stuff.fillRect(roundedX, roundedY, 1, 1);
}
/*
for(var i = 0; i < screen.width; i++) {
    drawPixel(ctx, i, 20, 'black');
}
*/

function drawMandelbrot(tolerance) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var Px = 0; Px < width; Px++) {
        for(var Py = 0; Py < height; Py++) {
            var ratio = width / height;

            var  x0 = (((2*Px) / width) - 1) * ratio;
            var  y0 = ((2*Py) / height) - 1;
            var x = 0.0;
            var y = 0.0;
            var iteration = 0;
            var max_iteration = 100;
            while(((x*x + y*y) <= 2*2) && (iteration < max_iteration)) {
                var xtemp = x*x - y*y + x0;
                y = 2*x*y + y0;
                x = xtemp;
                iteration = iteration + 1;
            }
            //console.log(iteration);
            if(iteration < tolerance) {
                var color = '#201E50';
            } else {
                var color = '#C4F1BE';
            }
            //var color = 'black';
            drawPixel(ctx, Px, Py, color);
        }
    }

}

var slid = document.getElementById("mandelSlider");
var output = document.getElementById("mandelRange");
slid.oninput = function() {
    //Output current tolerance of fractal
	output.innerHTML = this.value;
    drawMandelbrot(this.value);
}

//Reset slider with reset button
function reset() {
    slid.value = 0;
    output.innerHTML = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}