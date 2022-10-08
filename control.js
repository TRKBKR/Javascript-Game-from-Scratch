var arrowKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
};
var currentKeys = [];

function handleKeyDown (e) {
	if (arrowKeys[e.keyCode]) {
		e.preventDefault();

		var addKey = true;

		currentKeys.forEach(function (key) {
			if (e.keyCode === key) {
				addKey = false;
			}
		});

		if (addKey) {
			currentKeys.push(e.keyCode);
		}
	}
}

function handleKeyUp (e) {
	if (arrowKeys[e.keyCode]) {
		e.preventDefault();

		currentKeys.forEach(function (key, i) {
			if (e.keyCode === key) {
				currentKeys.splice(i, 1);
			}
		});
	}
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
// KEYS


function update() {
	currentKeys.forEach(function (key) {
		switch(key) {
			case 37:
				// left
				if (player.posX > player.radius) {
					player.posX -= player.speed;
				}
				break;
			case 38:
				// up
				if (player.posY > player.radius) {
					player.posY -= player.speed;
				}
				break;
			case 39:
				// right
				if (player.posX < canvas.width - player.radius) {
					player.posX += player.speed;
				}
				break;
			case 40:
				// down
				if (player.posY < canvas.height - player.radius) {
					player.posY += player.speed;
				}
				break;
		}
	});
}
positions=[[],[]];
totalPositionsToStore=40;
function trail(posX,posY,color,id){
	  
      if (positions[id].length > totalPositionsToStore) {
        positions[id].shift();
      }
      for (var i = 0; i < positions[id].length; i++) {
        drawplay(positions[id][i].x, positions[id][i].y,i,color);
        //if(positions[i].x != player.posX){console.log(player.posX);}
      }
      drawplay(posX,posY,"primary",color);
            // push an item
      positions[id].push({
        x: posX,
        y: posY
      });
      
	}
