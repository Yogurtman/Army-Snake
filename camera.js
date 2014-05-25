function camera(target) {
	var self = {};
	self.x = target.x;
	self.y = target.y;
	self.scale = 1;

	self.update = function (dt) {
		// var dist = 0
		// var obja, objb
		// for (var i = 0; i < mySnake.tail.length; i++) {
		// 	for (var j = 0; j < mySnake.tail.length; j++) {
		// 		if (dist < getDistance(mySnake.tail[i],mySnake.tail[j])) {
		// 			dist = getDistance(mySnake.tail[i],mySnake.tail[j])
		// 			obja = mySnake.tail[i]
		// 			objb = mySnake.tail[j]
		// 		}
		// 	}
		// }

		// var ang = Math.atan2(obja.y - objb.y,obja.x-objb.x)
		// self.x = 400 + Math.cos(ang)*(dist/2)
		// self.y = 400 + Math.sin(ang)*(dist/2)
		self.x = mySnake.x
		self.y = mySnake.y

		if (love.keyboard.isDown("up")) {
			self.scale = Math.max(0.8,self.scale-dt)
		}
		else {
			self.scale = Math.min(1,self.scale+dt)
		}

		// self.scale = Math.min(1,1/((Math.abs(400-mySnake.x)/400)+(Math.abs(400-mySnake.y)/400)))
	}


	self.draw = function () {
		// love.graphics.scale(self.scale,self.scale)
		love.graphics.scale(self.scale,self.scale)
		love.graphics.translate(-self.x+(400/self.scale),-self.y+(400/self.scale));
	}	


	return self;
}