var botsnum=2;
var bott = {
	posX: Math.floor(Math.random()*200),
	posY: Math.floor(Math.random()*100),
	radius: 5,//5,
	speed: 2,
	color: "red"
};
function botgen(){
	bots=[];
	
	var colors = ["#FF0000", "#BF0000", "#800000", "#FF1B00", "#FF5440", "#FF8D80"];
	for (var i = 0; bots.length < botsnum; i++) {
		positions.push([]);
		bots.push(
		{
			posX: Math.floor(Math.random()*200),
			posY: Math.floor(Math.random()*100),
			radius: 5,//5,
			speed: 1,
			color: randomColor(colors),
			col:false,
			wal:false,
			id:i+1
		});
	}
	return bots
}
function mov(bot){
	let disTargetX,disTargetY
	disTargetX = player.posX - bot.posX;
	disTargetY = player.posY - bot.posY;
	
	const angleTarget = Math.atan2(disTargetY, disTargetX);
    let moveAngle = angleTarget;
    for (var i = 0; i < obstaclow.length; i++) {
		if(obstaclow[i].x  < context.canvas.width || obstaclow[i].y < context.canvas.height){
			const disObstacleX = obstaclow[i].x - bot.posX;
			const disObstacleY = obstaclow[i].y - bot.posY;
			if (Math.sqrt(disObstacleX * disObstacleX + disObstacleY * disObstacleY) < obstaclow[i].radius+bot.radius) { 
				const angleObstacle = Math.atan2(disObstacleY, disObstacleX);
				delta = Math.PI/2.0;
				cross = Math.sin(moveAngle-angleObstacle);
				if (cross>0) { moveAngle += delta; }
				if (cross<0) { moveAngle -= delta; }
				if (cross==0) {
					   if (Math.random(2)==1) {
						 moveAngle += delta;
					   } else {
						 moveAngle -= delta;
					   }
					}
				//moveAngle += /*angleTarget -*/angleObstacle + Math.random(90)-45;
			}
		}
		
		}
	
	
	
	bot.posX += Math.cos(moveAngle);
	bot.posY += Math.sin(moveAngle);
	
	}
function mouv(bot){
	//console.log(bot);
	distant=Math.hypot(player.posX - bot.posX,player.posY - bot.posY+bot.radius);
	if (distant - player.radius - bot.radius < 1){
		player.color="red";
		bot.col=true;
	}else{
		player.color="yellow";
		bot.col=false;
		
	}
	for (var i = 0; i < obstacles.length; i++) {
		distat=Math.hypot((obstacles[i].x - player.posX) - bot.posX,(obstacles[i].y - player.posY) - bot.posY);
		if (distat - obstacles[i].radius - bot.radius < 1){
			bot.wal=true;
			//bot.posX=bot.posX+distat - obstacles[i].radius - bot.radius;
			//bot.posY=bot.posY+distat - obstacles[i].radius - bot.radius;
		}
	}
	
	/*
	for (var i = 0; i < bots.length; i++) {
		for (var j = 0; j < bots.length; j++) {
				if (Math.hypot(bots[j].posX - bots[i].posX,bots[j].posY - bots[i].posY) - bots[i].radius - bots[j].radius < 1 & i != j){
					bots[i].col=true;
				}else if(i != j){ bots[i].col=false;}
		}
	}*/
	if (player.posX< bot.posX && bot.col == false && bot.wal == false){
		bot.posX=bot.posX-bot.speed;
	}else if (player.posX > bot.posX && bot.col == false && bot.wal == false){
		bot.posX=bot.posX+bot.speed;
	}if (player.posY< bot.posY && bot.col == false && bot.wal == false){
		bot.posY=bot.posY-bot.speed;
	}else if (player.posY> bot.posY && bot.col == false && bot.wal == false){
		bot.posY=bot.posY+bot.speed;
	}
	}
