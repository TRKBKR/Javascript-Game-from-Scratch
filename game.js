var image=Map.Gen();

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 400;
var context = canvas.getContext('2d');
// CANAVAs

function main(){
	//context.beginPath();
	context.clearRect(0, 0, canvas.width, canvas.height);
	Map.draw(context,player.posX,player.posY);
	trail(player.posX,player.posY,player.color,0);
	update();
	
	for (var i = 0; i < bots.length; i++) {
		
		trail(bots[i].posX,bots[i].posY,bots[i].color,bots[i].id);
		mov(bots[i]);
		if(bots[i].wal == true){
			//bots[i].posX=bots[i].posX+1;
			//bots[i].posY=bots[i].posY+1;
			//bots[i].wal=false;
		}
	}
	
	requestAnimationFrame(main);
	}
bots=botgen();
main();
