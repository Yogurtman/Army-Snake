function engineer(x,y,n,p) {
	var self = tail(x,y,n,p);
	self.target;
	self.sX = self.x;
	self.sY = self.y;
	self.sA = self.angle;
	self.alpha = 0;
	self.alphaDirection = 1;

	self.update = function (dt) {
		self.follow(dt);

		if (self.dead) {
			self.target = self;
			if (self.health>=self.totalHealth) {
				self.health = self.totalHealth;
				self.dead = false;
				self.target = null;
			}
		}

		self.alpha += 500*dt*self.alphaDirection;
		if (self.alpha > 255) {
			self.alpha = 255;
			self.alphaDirection = -1;
		}

		if (self.alpha < 0) {
			self.alpha = 0;
			self.alphaDirection = 1;
		}

		if (!self.target) {
			self.setTarget();
		}
		
		if (self.target) {
			if (self.target.parent.trail.length>mySnake.tail.length*4) {
				self.sX = self.target.parent.trail[4*self.target.number].x;
				self.sY = self.target.parent.trail[4*self.target.number].y;
				self.sA = self.target.angle;
				self.target.health += dt*15;
				if (self.target.health>self.target.totalHealth) {
					self.target.heatlh = self.target.totalHealth;
					self.target.live();
					self.target.dead = false;
					self.target = null;
				}
			}
		}
		
	}

	self.draw = function () {
		if (!self.dead) {
			love.graphics.setColor(230,142,22);
			if (self.target) {
				love.graphics.setColor(230,142,22,self.alpha);
				love.graphics.circle("line",self.sX,self.sY,self.size+5);
				love.graphics.setColor(230,142,22,255);
			}
		}
		else {
			love.graphics.setColor(40,40,40);
		}
		love.graphics.circle("line",self.x,self.y,self.size);
		self.fill();
		if (self.target) {
			love.graphics.setColor(230,142,22,self.alpha);
			love.graphics.circle("line",self.sX,self.sY,self.size+5);
			love.graphics.setColor(230,142,22,255);
		}

	}

	self.setTarget = function () {
		for (var i = 1; i < mySnake.tail.length; i++) {
			if (mySnake.tail[i].dead) {
				self.target = mySnake.tail[i];
				if (Math.random()>0.5) {
					break;
				}
			}
		}
	}

	return self;
}