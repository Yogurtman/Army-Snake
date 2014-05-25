function boulder(i) {
	var self = {};
	var cos = Math.cos((Math.PI*2)*Math.random())
	var sin = Math.sin((Math.PI*2)*Math.random())
	self.x = 400 + cos * 1000 * i;
	self.y = 400 + sin * 1000 * i;
	self.startx = self.x
	self.starty = self.y
	self.size = 50 + Math.random()*50;
	self.speed = 300 + Math.random()*100;
	self.cos = -cos
	self.sin = -sin
	self.dist = i


	self.update = function (dt) {
		self.x += self.cos * self.speed * dt;
		self.y += self.sin * self.speed * dt;

		if (getDistance({x:self.startx,y:self.starty},self) > 2000*self.dist) {
			var cos = Math.cos((Math.PI*2)*Math.random())
			var sin = Math.sin((Math.PI*2)*Math.random())
			self.x = 400 + cos * 1000 * self.dist;
			self.y = 400 + sin * 1000 * self.dist;
			self.startx = self.x
			self.starty = self.y
			self.size = 50 + Math.random()*50;
			self.speed = 300 + Math.random()*100;
			self.cos = -cos
			self.sin = -sin
		} 


	}

	self.draw = function () {
		love.graphics.setColor(25,53,132)
		love.graphics.circle("fill",self.x,self.y,self.size)		
	}




	return self;
}