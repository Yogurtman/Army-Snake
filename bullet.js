function bullet(x,y,tox,toy,from) {
	var self = {};
	self.x = x;
	self.y = y;
	self.angle = Math.atan2(toy-y,tox-x);
	self.cos = Math.cos(self.angle);
	self.sin = Math.sin(self.angle);
	self.speed = 600;
	self.size = 3;

	self.dead = false;

	if (from == "snake") {
		self.color = [255,255,255];
	}
	if (from == "enemy") {
		self.color = [255,0,0];
	}

	self.update = function (dt) {
		self.x += self.speed * self.cos * dt;
		self.y += self.speed * self.sin * dt;
		if (getDistance({x:400,y:400},self) > 750) {
			self.dead = true;
		} 
		if (!self.dead) {
			if (from == "snake") {
				for (var i = 0; i < myEnemies.length; i++) {
					if (circleCollision(self,myEnemies[i])) {
						myEnemies[i].hitBullet(self);
						self.dead = true
						break;
					}
				}
			}
			if (from == "enemy") {
				for (var i = 0; i < mySnake.tail.length; i++) {
					if (circleCollision(self,mySnake.tail[i])) {
						mySnake.tail[i].hitBullet(self);
						self.dead = true
						break;
					}
				}
			}
		}
	}

	self.draw = function () {
		if (!self.dead) {
			love.graphics.setColor(self.color[0],self.color[1],self.color[2])
			love.graphics.circle("line",self.x,self.y,self.size);
		}
	}

	return self;
}