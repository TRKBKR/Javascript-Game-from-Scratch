function randomColor(colors) { return colors[Math.floor(Math.random() * colors.length)]; }
obstacles=[];
obstaclelen=200;
obstaclow=[];
Map.Gen = function() {
	const ctx = document.getElementById('canvas').getContext('2d');
	const a = 2 * Math.PI / 6;
	const r = 10; 
	width=2000;
	height=2000;
	color="red";
	ctx.canvas.width = width;
    ctx.canvas.height = height;
	
	var colors = ["#002B36", "#00556B", "#0080A1", "#002B36", "#00AAD6", "#00CBFF"];
	
	function drawHexagon(x, y) { 
		ctx.beginPath();
		for (var i = 0; i < 6; i++) {
			ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
		}
		color = (color == "red" ? randomColor(colors) : randomColor(colors));
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
	}


	for (let y = 0; y + r * Math.sin(a) < height; y += r * Math.sin(a)) {
		for (let x = 0, j = 0; x + r * (1 + Math.cos(a)) < width; x += r * (1 + Math.cos(a)), y += (-1) ** j++ * r * Math.sin(a)) {
			drawHexagon(x, y);
		}
	}
	
	image = new Image();
    image.src = ctx.canvas.toDataURL("image/png");
    //ctx = null;
    return image;
}
Map.draw = function(context, xView, yView) {
    // easiest way: draw the entire map changing only the destination coordinate in canvas
    // canvas will cull the image by itself (no performance gaps -> in hardware accelerated environments, at least)
    /*context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -xView, -yView, this.image.width, this.image.height);*/

    // didactic way ( "s" is for "source" and "d" is for "destination" in the variable names):
    
    var sx, sy, dx, dy;
    var sWidth, sHeight, dWidth, dHeight;

    // offset point to crop the image
    sx = xView;
    sy = yView;

    // dimensions of cropped image          
    sWidth = context.canvas.width;
    sHeight = context.canvas.height;

    // if cropped image is smaller than canvas we need to change the source dimensions
    if (image.width - sx < sWidth) {
      sWidth = image.width - sx;
    }
    if (image.height - sy < sHeight) {
      sHeight = image.height - sy;
    }

    // location on canvas to draw the croped image
    dx = 0;
    dy = 0;
    // match destination with source to not scale the image
    dWidth = sWidth;
    dHeight = sHeight;
    
	
    context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    for (var i = 0; i < obstacles.length; i++) {
		let chnh=image.height/context.canvas.height;
		let chnw=image.width/context.canvas.width;
		if(obstacles[i].x - sx < context.canvas.width && obstacles[i].y - sy < context.canvas.height ){
			drawobs(obstacles[i].x - sx,obstacles[i].y - sy);
			if (obstaclow.length > obstacles.length) {
				obstaclow.shift();
			  }
			obstaclow.push({
				x:obstacles[i].x - sx,
				y:obstacles[i].y - sy,
				color:obstacles[i].color,
				radius:obstacles[i].radius
			});
		}
	}
	/*
	 for (var i = 0; i < obstacles.length; i++) {
		if((image.width/context.canvas.width) * sx > obstacles[i].x && (image.height/context.canvas.height) * sx > obstacles[i].y ){
			drawobs((obstacles[i].x /image.width)*context.canvas.width,
				(obstacles[i].y /image.height)*context.canvas.height);
			
			}
	}*/
  }


function genobstacle(){
		for (i=0;i < obstaclelen;i++){
			obstacles.push({
			x:Math.random() * 2000,
			y:Math.random() * 1000,
			color:"red",
			radius:20
			});
		}
	}
	
function drawobs(cx,cy) {

      context.beginPath();
      
      context.arc(cx, cy, 20 , (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
	  //context.lineWidth = 8;
	  context.fillStyle = 'green';
	  context.stroke();
	  context.fill();
	  context.closePath();
	  
    }
genobstacle()
//for (var i = 0; i < obstacles.length; i++) {
//		drawobs(obstacles[i].x,obstacles[i].y);
//	}
