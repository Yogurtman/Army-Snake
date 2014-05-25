function orb (x,y) {
	var self = {};
	self.x = x;
	self.y = y;
	self.size = 5;

	self.update = function (dt) {
		
	}

	self.draw = function () {
		love.graphics.setColor(255,255,255)
		love.graphics.circle("line",self.x,self.y,self.size)
	}


	return self;
}