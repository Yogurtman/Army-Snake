function health(x,y,n,p) {
		var self = tail(x,y,n,p);
		self.type = "health";
		for (var i = 0; i < p.tail.length; i++) {
			p.tail[i].health *= 1.5;
			p.tail[i].totalHealth *= 1.5;
		}

		self.health *= 1.5;
		self.totalHealth *= 1.5;

		self.update = function (dt) {
			self.follow(dt);
		}

		self.draw = function () {
			if (!self.dead) {
				love.graphics.setColor(0,200,0)
			}
			else {
				love.graphics.setColor(40,40,40)
			}
			love.graphics.circle("line",self.x,self.y,self.size)
			self.fill();
		}

		self.die = function () {
			for (var i = 0; i < mySnake.length; i++) {
				mySnake[i].totalHealth /= 1.5;
				mySnake[i].health = Math.min(mySnake[i].totalHealth,mySnake[i].health);
			}
		}

		self.live = function () {
			for (var i = 0; i < mySnake.length; i++) {
				mySnake[i].totalHealth *= 1.5;
			}
		}

		return self;
}