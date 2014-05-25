function upgrade(x,y,n,p) {
		var self = tail(x,y,n,p);
		self.type = "upgrade";
		for (var i = 0; i < p.tail.length; i++) {
			p.tail[i].shootRate *= 0.85;
		}

		self.update = function (dt) {
			self.follow(dt);
		}

		self.draw = function () {
			if (!self.dead) {
				love.graphics.setColor(200,100,230)
			}
			else {
				love.graphics.setColor(40,40,40)
			}
			love.graphics.circle("line",self.x,self.y,self.size)
			self.fill();
		}

		self.die = function () {
			for (var i = 1; i < mySnake.length; i++) {
				mySnake[i].shootRate /= 0.85;
			}
		}

		self.live = function () {
			for (var i = 1; i < mySnake.length; i++) {
				mySnake[i].shootRate *= 0.85;
			}
		}

		return self;
}