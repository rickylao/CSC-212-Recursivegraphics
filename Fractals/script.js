//For slider: choose a fractal to display on the canvas. Sierpinski = 1, Hilbert = 2, Koch = 3;
	var whichfractal = 0;
	var outputfractal = document.getElementById("currentfractal");
	var howdisplay = document.getElementById("howitworks");
	//Lime green, Purple, orange, yellow, crimson, white, black, brown, pinkish, navy
	var recursiveLevelColors = ['#C4F1BE','#FF00F9','#FF7F00','#FFEC08','#C80000','#FFFFFF','#000000','#DA8A00','#FF2772','#2E167E'];
	function chooseSierpinski() {
		slider.value = 0;
		outputfractal.innerHTML = "";
		output.innerHTML = "0";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		whichfractal = 1;
		outputfractal.innerHTML = "Sierpinki's Triangle";
		howdisplay.innerHTML = "How it works: A triangle is made up of three smaller copies of itself. The side length of a smaller copy is half the length of the original triangle."
	}
	function chooseHilbert() {
		slider.value = 0;
		outputfractal.innerHTML = "";
		output.innerHTML = "0";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		whichfractal = 2;
		outputfractal.innerHTML = "Hilbert's Curve";
		howdisplay.innerHTML = "How it works: Construct a U-shape. Then take the inital shape and place it into 4-quadrants of a square, rotating the shape left and right for the top two quadrants, and connect the gaps.";
	}
	function chooseKoch() {
		slider.value = 0;
		outputfractal.innerHTML = "";
		output.innerHTML = "0";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		whichfractal = 3;
		outputfractal.innerHTML = "Koch's Snowflake";
		howdisplay.innerHTML = "How it works: Take an equilateral triangle and its sides. Construct an equilateral triangle on each of its sides with a third of its length.";
	}
	//Choose length of the whole curves:
	var triangle_length = window.innerHeight/2.5;
	var hilbert_length = window.innerHeight/2.5;
	var koch_length = window.innerHeight/1.5;

	//Create Canvas
	const width = window.innerWidth/2.2;
	const height = window.innerHeight/1.2;

	var canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;

	//Sierpinki's triangle functions

		//function to draw a triangle
		function drawTriangle(x, y, length, color) {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(x, y-length);
			ctx.lineTo(x-length, y+length);
			ctx.lineTo(x+length, y+length);
			ctx.fill();

		}

		//Recursive function to divide the main triangle
		//The first two parameters are the center points within the canvas of each piece
		function divide(x, y, length, color, copies){
			if(copies > 0) {

			   //Divides top piece
				divide(x, y-(length/2), length/2, color, copies - 1);

				//Divides bottom left piece
				divide(x-(length/2), y+(length/2), length/2, color, copies - 1);

				//Divides bottom right piece
				divide(x+(length/2), y+(length/2), length/2, color, copies - 1);
			} else {
			//After recursive functions finish dividing, draw the triangles at every center point
			drawTriangle(x, y, length, color);
			}
		}

		//Function call to draw Sierpinski for slider
		function sierpinski(levels) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			divide(width/2, height/2, triangle_length, '#C4F1BE', levels);
		};

	//Hilbert's Curve functions

		//function to draw a u shape with a line
		function drawLine(length, angle, color, linewidth) {
		  ctx.strokeStyle = color;
		  ctx.lineWidth = linewidth;
		  ctx.beginPath();
		  ctx.moveTo(0, 0);
		  //Rotates "angle" degress clockwise
		  rotation(angle);
		  ctx.lineTo(length, 0);
		  ctx.stroke();
		  ctx.translate(length, 0);

		  ctx.moveTo(0, 0);
		  //Rotates "angle" degress counter-clockwise
		  rotation(-angle);
		  ctx.lineTo(length, 0);
		  ctx.stroke();
		  ctx.translate(length, 0);

		  ctx.moveTo(0, 0);
		  //Rotates "angle" degress counter-clockwise
		  rotation(-angle);
		  ctx.lineTo(length, 0);
		  ctx.stroke();
		  ctx.translate(length, 0);

		  rotation(angle);


		}



		//Recursive function to divide square into 4 and rotate the u shape
		function recursiveHilbert(n, length, angle, linewidth) {
		  if (n<=1) {
			drawLine(length, angle, '#C4F1BE', linewidth);
		  }
		  else {
			 ctx.lineWidth = linewidth;
			 //Rotates the angle of the first recursive call
			rotation(angle);
			//negative angle causes the curve to flip
			 recursiveHilbert(n-1,length/2 , -angle, linewidth/1.5);

			 ctx.moveTo(0, 0);
			 //Draws a line to connect each of the curves created.
			 //Even as n and length decreases due to recurrsion, the math results in the same length as long
			 //as the number length is being dived above matched the number below, in this case, 2.
			 ctx.lineTo(length/(Math.pow(2, n - 1)) , 0);
			 ctx.stroke();

			 ctx.translate(length/(Math.pow(2, n - 1)) , 0);
			//rotates counter-clockwise to next two curves in the similar to the level one curve but smaller.
			 rotation(-angle);
			 recursiveHilbert(n-1,length/2 , angle, linewidth/1.5);

			 ctx.moveTo(0, 0);
			 //No need to rotate the point being drawn to this time.
			 ctx.lineTo(length/(Math.pow(2, n - 1)) , 0);
			 ctx.stroke();

			 ctx.translate(length/(Math.pow(2, n - 1)) , 0);
			//Another level drawn.
			 recursiveHilbert(n-1,length/2 , angle, linewidth/1.5);
			 //rotates up to draw the next curve.
			 rotation(-angle);
			 ctx.moveTo(0, 0);
			 ctx.lineTo(length/(Math.pow(2, n - 1)) , 0);
			 ctx.stroke();
			 ctx.translate(length/(Math.pow(2, n - 1)) , 0);
			//curve is flipped so the angle needs to be negative.
			 recursiveHilbert(n-1,length/2 , -angle, linewidth/1.5);
			 rotation(angle);


			 }
		  }

		//Function to draw Hilbert's curve for slider
		function hilbert(levels) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			var offset = hilbert_length;
			var temp = 0.5;

			//Center the curve to center
			for(let i = 1; i <levels-1; i++) {
				temp =  temp / 2;
				temp = temp + 0.5;
			}
			if(levels > 1) {
			offset = hilbert_length * (temp+1);
			}
			ctx.translate(((width-(offset))/2), ((height-offset)/2));

			recursiveHilbert(levels, hilbert_length, 90, 15);
			//Reset rotation transformations
			  ctx.resetTransform();
		};


	//Koch's Snowflake functions
	function drawlen(distance) {
	  ctx.strokeStyle = '#C4F1BE';
	  ctx.lineWidth = 3;
	  ctx.beginPath();
	  ctx.moveTo(0,0);
	  ctx.lineTo(distance, 0);
	  ctx.stroke();

	  //Move cursor to new point after drawing line
	  ctx.translate(distance, 0);
	}

	function rotation(degree) {
	  ctx.rotate(degree*Math.PI/180);
	}

	  function snowflake_test(n, length) {
		if(n <= 0) {
		  drawlen(length);

		} else {

		snowflake_test(n - 1, length/3);
		//Rotate counter clock wise
		rotation(-60);

		snowflake_test(n - 1, length/3);
		//Rotate clock wise
		rotation(120);

		snowflake_test(n - 1, length/3);
		//Rotate counter clock wise
		rotation(-60);

		snowflake_test(n - 1, length/3);
	  }
	  }

		//Function to draw Koch snowflake for slider
		function kochSnowflake(levels){
		  ctx.clearRect(0, 0, canvas.width, canvas.height);
		  //Moves origin to the center of canvas, later on rotating around canvas
		  ctx.translate((width-koch_length)/2, (height-(koch_length*Math.sqrt(3)/2)+(koch_length*Math.sqrt(3)/6))/2);
		  //Create snowflake only creates one side, I need to rotate the drawing cursor to draw the other 3 sides.
		  snowflake_test(levels, koch_length);
		  rotation(120);
		  snowflake_test(levels, koch_length);
		  rotation(120);
		  snowflake_test(levels, koch_length);
		  //Reset rotation transformations
			ctx.resetTransform();
		};


//Slider component
	var slider = document.getElementById("valueslider");
	var output = document.getElementById("outputrange");
	slider.oninput = function() {

		//Output current level of fractal
		output.innerHTML = this.value;

		//From the variable that the buttons changes
		if(whichfractal == 0) {
			//Do nothing when page opens
		} else if (whichfractal == 1) {
			//Perform sierpinski
			sierpinski(this.value);
		} else if (whichfractal == 2) {
			//Perform Hilbert
			hilbert(this.value);
		} else if(whichfractal == 3) {
			//Perform Koch
			kochSnowflake(this.value);
		}
	}
	//Reset slider with reset button
	function reset() {
		whichfractal = 0;
		slider.value = 0;
		outputfractal.innerHTML = "";
		output.innerHTML = "0";
		howdisplay.innerHTML = "";
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}