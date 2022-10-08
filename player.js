var player = {
	posX: 10,
	posY: 10,
	radius: 5,//5,
	speed: 2,
	color: "yellow"
};
// PLAYER
function drawplay(x,y,a,color) {
      var alpha;
      var scale;

      if (a == "primary") {
        // don't bother fading or scaling the trail "leader" :P
        alpha = 1;
        scale = player.radius;
      } else {
        // adjust the transparency and scale
        alpha = 1;//totalPositionsToStore/a/10;
        //alert(a);
        scale = (a/totalPositionsToStore)*player.radius;
      }

      context.beginPath();
      
      context.arc(x, y, scale , (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);
      context.fillStyle = color;//"rgba(204, 102, 153, " + alpha + ")";
      context.globalAlpha = alpha;
      context.stroke();
      context.fill();
      context.closePath();
    }
