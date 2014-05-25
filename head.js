function head () {
	var self = {};
	self.x = 400;
	self.y = 400;
	self.moveSpeed = 300;
	self.ultraSpeed = 500;
	self.rotSpeed = 6;
	self.angle = 0;
	self.tail = [self];
	self.trail = [];
	self.size = 15;
	self.health = 250;
	self.totalHealth = 250;
	self.upgrade = 1

	self.update = function (dt) {
		if (love.keyboard.isDown("up")) {
			self.x += Math.cos(self.angle) * self.ultraSpeed * dt 
			self.y += Math.sin(self.angle) * self.ultraSpeed * dt
		}
		else {
			self.x += Math.cos(self.angle) * self.moveSpeed * dt 
			self.y += Math.sin(self.angle) * self.moveSpeed * dt
		}
		

		if (love.keyboard.isDown("left")) {
			self.angle -= self.rotSpeed * dt;
		}
		if (love.keyboard.isDown("right")) {
			self.angle += self.rotSpeed * dt;
		}

		self.trail.unshift({x:self.x,y:self.y})
		while (self.trail.length>17*self.tail.length) {
			self.trail.pop()
		}

		for (var i = 1; i < self.tail.length; i++) {
			self.tail[i].update(dt)
		};

		for (var i = 1; i < self.tail.length; i++) {
			if (circleCollision(self,self.tail[i])) {
				self.reset();
			}
		}

		if (getDistance({x:400,y:400},self) > 750) {
			self.reset();
		} 

		// for (var i = 0; i < myEnemies.length; i++) {
		// 	if (circleCollision(self,myEnemies[i])) {
		// 		self.reset();
		// 	}
		// }


		// if (self.x<0)
		// 	self.x = 799;
		// if (self.y<0)
		// 	self.y = 799;
		// self.x = self.x % 800;
		// self.y = self.y % 800;
		// if (self.x > 800 || self.x < 0 || self.y > 800 || self.y < 0) {
		// 	self.reset();
		// }

		if (self.health <= 0) {
			self.reset();
		}


	}

	self.draw = function () {
		love.graphics.setLineWidth(1.5);
		love.graphics.circle("line",self.x,self.y,self.size)
		love.graphics.circle("fill",self.x,self.y,self.size/self.totalHealth*self.health)

		for (var i = 1; i < self.tail.length; i++) {
			self.tail[i].draw();
		}


	}

	self.addTail = function (type) {
		if (type=="turret") {
			self.tail.push(turret(self.x,self.y,self.tail.length+1,self));
		}
		if (type == "health") {
			self.tail.push(health(self.x,self.y,self.tail.length+1,self));
		}
		if (type == "regen") {
			self.tail.push(regen(self.x,self.y,self.tail.length+1,self));
		}
		if (type == "engineer") {
			self.tail.push(engineer(self.x,self.y,self.tail.length+1,self));
		}
		if (type == "upgrade") {
			self.tail.push(upgrade(self.x,self.y,self.tail.length+1,self));
		}
		maxTailLength = Math.max(maxTailLength,self.tail.length-1);
	}

	self.hitBullet = function () {
		self.health -= 26;

	}

	self.reset = function () {
		game_load();
	}


	return self;
}