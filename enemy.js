function enemy(x,y) {
	var self = {};
	self.x = x;
	self.y = y;
	self.size = 10
	self.target;
	self.bullets = [];
	self.shootTimer = Math.random();
	self.health = mySnake.tail.length*2;
	self.totalHealth = self.health;
	self.speed = 100 + Math.random()*1000;
	self.xVelocity = 0;
	self.yVelocity = 0;
	self.moveSinus = Math.random()*13;


	self.update = function (dt) {
		self.moveSinus += 2 * dt;
		self.setTarget();
		if (self.target) {
			self.shootTimer += dt
			if (self.shootTimer>0.3) {

				self.shoot();
				self.shootTimer = 0;
			}
		}
		self.x += self.xVelocity*dt;
		self.y += self.yVelocity*dt;

		// self.x = (self.x+800) % 800;
		// self.y = (self.y+800) % 800;

		var angle = Math.atan2(mySnake.y-self.y,mySnake.x-self.x);
		self.xVelocity += Math.cos(angle)*self.speed*dt*Math.abs(Math.sin(self.moveSinus));
		self.yVelocity += Math.sin(angle)*self.speed*dt*Math.abs(Math.sin(self.moveSinus));

		self.xVelocity /= 1.1;
		self.yVelocity /= 1.1;

	}

	self.draw = function () {
		love.graphics.setColor(255,0,0)
		love.graphics.circle("line",self.x,self.y,self.size)
		love.graphics.circle("fill",self.x,self.y,self.size/self.totalHealth*self.health)
		
	}

	self.shoot = function () {
		myBullets.push(bullet(self.x,self.y,self.target.x,self.target.y,"enemy"))
	}

	self.setTarget = function () {
		var dist = {obj:null,d:500}
		for (var i = mySnake.tail.length - 1; i >= 0; i--) {
				var newDist = getDistance(mySnake.tail[i],self);
				if (newDist < 250) {
					if (!mySnake.tail[i].dead) {
						if (dist.d > newDist) {
							dist.obj = mySnake.tail[i];
							dist.d = newDist;
						}
					}
				}
		}
		self.target = dist.obj;
	}

	self.hitBullet = function (bullet) {
		self.xVelocity += Math.cos(bullet.angle)*100;
		self.yVelocity += Math.sin(bullet.angle)*100;
		self.health -= 7;
		if (self.health <= 0) {
			self.dead = true;
		}
	}

	return self;
}