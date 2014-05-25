function game_load () {
	started = false
	love.graphics.setBackgroundColor(255,0,0)
	mySnake = head();
	mySnake.addTail("turret");
	mySnake.addTail("engineer");
	myOrbs = [];
	myOrbs.push(orb(400+Math.cos(Math.random()*360)*Math.random()*600,400+Math.sin(Math.random()*260)*Math.random()*600));
	myOrbs.push(orb(400+Math.cos(Math.random()*360)*Math.random()*600,400+Math.sin(Math.random()*260)*Math.random()*600));
	myOrbs.push(orb(400+Math.cos(Math.random()*360)*Math.random()*600,400+Math.sin(Math.random()*260)*Math.random()*600));
	myOrbs.push(orb(400+Math.cos(Math.random()*360)*Math.random()*600,400+Math.sin(Math.random()*260)*Math.random()*600));
	
	myEnemies = [];
	myEnemies.push(enemy(400+Math.cos(Math.random()*360)*Math.random()*750,400+Math.sin(Math.random()*260)*Math.random()*750));
	myEnemies.push(enemy(400+Math.cos(Math.random()*360)*Math.random()*750,400+Math.sin(Math.random()*260)*Math.random()*750));
	myEnemies.push(enemy(400+Math.cos(Math.random()*360)*Math.random()*750,400+Math.sin(Math.random()*260)*Math.random()*750));

	myBullets = [];

	myCamera = camera(mySnake);

	pause = false
	enemyTimer = 0;
	dead = false;

	myBackground = [];
	for (var i = 0; i < 40; i++) {
		myBackground.push({x:-400+Math.random()*1500,y:-400+Math.random()*1500,s:5+Math.random()*40})
	}

	backgroundCanvas = love.graphics.newCanvas(10000,10000)
	love.graphics.setCanvas(backgroundCanvas)
	love.graphics.setColor(10,10,10)
	love.graphics.rectangle("fill",0,0,10000,10000)
	love.graphics.setBlendMode("destination-out")
	love.graphics.circle("fill",5000,5000,750)
	love.graphics.setBlendMode("source-over")
	love.graphics.setColor(255,255,255)
	love.graphics.setCanvas()


}


function game_update (dt) {
	if (started) {
		if (!pause) {
			enemyTimer += dt;
			if (enemyTimer > 3/(mySnake.tail.length/10)) {
				myEnemies.push(enemy(400+Math.cos(Math.random()*(Math.PI*2))*1500,400+Math.sin(Math.random()*(Math.PI*2))*1500));
				enemyTimer = 0
			}

			mySnake.update(dt);
			for (var i = myOrbs.length - 1; i >= 0; i--) {
				if (circleCollision(mySnake,myOrbs[i])) {
					mySnake.upgrade += 1
					if (mySnake.upgrade > mySnake.tail.length) {
						pause = true
						mySnake.upgrade = 1;
					}
					myOrbs.splice(i,1);
				}
			}
			

			for (var i = myEnemies.length-1; i >= 0; i--) {
				myEnemies[i].update(dt);

				if (myEnemies[i].dead) {
					myOrbs.push(orb(400+Math.cos(Math.random()*360)*Math.random()*600,400+Math.sin(Math.random()*260)*Math.random()*600));
					myEnemies.splice(i,1)
				}
			}
			
			for (var i = myBullets.length - 1; i >= 0; i--) {
				myBullets[i].update(dt);
				if (myBullets[i].dead) {
					myBullets.splice(i,1);
				}
			}
		}
		
	}

	myCamera.update(dt);
	
}


function game_draw () {
	love.graphics.push();
	myCamera.draw();
	love.graphics.setColor(0,0,0)
	love.graphics.circle("fill",400,400,750)
	love.graphics.setColor(10,10,10)
	for (var i = 0; i < myBackground.length; i++) {
		love.graphics.circle("fill",myBackground[i].x,myBackground[i].y,myBackground[i].s)
	}
	love.graphics.setColor(255,255,255,255)
	mySnake.draw();
	for (var i = 0; i < myOrbs.length; i++) {
		myOrbs[i].draw();
	};
	for (var i = 0; i < myEnemies.length; i++) {
		myEnemies[i].draw();
	}

	for (var i = 0; i < myBullets.length; i++) {
		myBullets[i].draw()
	}

	love.graphics.draw(backgroundCanvas,-5000+375,-5000+375)

	// love.graphics.setColor(10,10,10)
	// love.graphics.setBlendMode("destination-over")
	// love.graphics.rectangle("fill",-2000,-2000,5000,5000)
	// love.graphics.setBlendMode("source-over")

	love.graphics.pop();

	if (pause) {
		love.graphics.setColor(0,0,0,150);
		love.graphics.rectangle("fill",0,0,800,800);
		love.graphics.setColor(255,255,255,255);
		love.graphics.print("1: Turret / 2: Health / 3: Health regen",80,350);
		love.graphics.print("4: Engineer / 5: Turret upgrade",160,450);
	}

	love.graphics.setColor(0,0,0);
	love.graphics.rectangle("fill",0,0,250,50);
	love.graphics.setColor(255,255,255)
	love.graphics.print("Longest tail:" + maxTailLength,10,40);

}

function game_keypressed (key) {
	started = true
	if (key == " ") {
		mySnake.addTail();
	}
	if (pause) {
		if (key == "1" || key == "2" || key == "3" || key == "4" || key == "5") {
			if (key == "1") {
				mySnake.addTail("turret");
			}
			if (key == "2") {
				mySnake.addTail("health");
			}
			if (key == "3") {
				mySnake.addTail("regen");
			}
			if (key == "4") {
				mySnake.addTail("engineer");
			}
			if (key == "5") {
				mySnake.addTail("upgrade");
			}

			pause = false;
		}
	}
	
}

function spawnEnemies () {
	for (var i = 0; i < mySnake.tail.length; i++) {
		myEnemies.push(enemy(10+Math.random()*780,10+Math.random()*780));
	}
}


function game_mousepressed (x,y,button) {


}

function getDistance (a,b) {
	return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2))
}


function circleCollision (a,b) {
	return Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2)) < a.size + b.size
}