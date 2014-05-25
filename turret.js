function turret(x,y,n,p) {
	var self = tail(x,y,n,p);
	self.target;
	self.type = "turret";
	self.shootTimer = Math.random();
	self.shootRate = 1;

	for (var i = 0; i < p.tail.length; i++) {
		if (p.tail[i].type == "upgrade") {
			if (!p.tail[i].dead) {
				self.health *= 0.85;
			}
		}
	}

	self.update = function (dt) {
		self.follow(dt);
		if (!self.dead) {
			self.setTarget();
			if (self.target) {
				self.shootTimer += dt
				if (self.shootTimer>self.shootRate) {
					self.shoot();
					self.shootTimer = 0;
				}
			}
		}
	}

	self.draw = function () {
		if (!self.dead) {
			love.graphics.setColor(255,255,0)
		}
		else {
			love.graphics.setColor(40,40,40)
		}
		love.graphics.circle("line",self.x,self.y,self.size)
		self.fill();
	}

	self.shoot = function () {
		myBullets.push(bullet(self.x,self.y,self.target.x,self.target.y,"snake"))
	}

	self.setTarget = function () {
		var dist = {obj:null,d:500}
		for (var i = myEnemies.length - 1; i >= 0; i--) {
				var newDist = getDistance(myEnemies[i],self);
				if (newDist < 250) {
					if (dist.d > newDist) {
						dist.obj = myEnemies[i];
						dist.d = newDist;
					}
				}
		}
		self.target = dist.obj;
	}
	return self;
}