function tail (x,y,n,p) {
	var self = {};
	self.x = -100;
	self.y = -100;
	self.size = 10
	self.number = n;
	self.parent = p;
	self.health = 100;
	for (var i = 0; i < p.tail.length; i++) {
		if (p.tail[i].type == "health") {
			if (!p.tail[i].dead) {
				self.health *= 1.5;
			}
		}
	}
	self.totalHealth = self.health;
	self.dead = false;


	self.follow = function (dt) {
		
		if (self.parent.trail[4*self.number]) {
			self.x = self.parent.trail[4*self.number].x
			self.y = self.parent.trail[4*self.number].y
		}
		
	}

	self.fill = function () {
		// if (self.number == mySnake.upgrade) {
		// 	love.graphics.circle("fill",self.x,self.y,self.size)
		// }

		love.graphics.circle("fill",self.x,self.y,(self.size/self.totalHealth)*self.health)

	}


	self.hitBullet = function () {
		if (!self.dead) {
			self.health = Math.max(0,self.health-9);
			if (self.health==0) {
				self.dead = true;
				self.die();
			}
		}
		
	}

	self.die = function () {}
	self.live = function () {}

	return self;
}