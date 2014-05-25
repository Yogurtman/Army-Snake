function regen(x,y,n,p) {
	var self = tail(x,y,n,p);
	self.timer = 0


	self.update = function (dt) {
		self.follow(dt);
		self.timer += dt;
		if (self.timer > 0.1) {
			for (var i = 0; i < mySnake.tail.length; i++) {
				if (!mySnake.tail[i].dead) {
					mySnake.tail[i].health = Math.min(mySnake.tail[i].totalHealth,mySnake.tail[i].health+(mySnake.tail[i].totalHealth/10)*dt);
				}
			}
			self.timer = 0;
		}
	}

	self.draw = function () {
		if (!self.dead) {
			love.graphics.setColor(100,100,255);
		}
		else {
			love.graphics.setColor(40,40,40)
		}
		love.graphics.circle("line",self.x,self.y,self.size)
		self.fill();
	}

	return self;
}