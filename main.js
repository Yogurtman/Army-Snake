love.load = function () {
	maxTailLength = 0;
	love.graphics.setNewFont("arial",30)
	game_load();
}

love.update = function (dt) {
	game_update(dt);

}

love.draw = function () {
	love.graphics.setColor(255,255,255)
	game_draw();

}

love.config = function (t) {
	//Set the width/height of the canvas
	t.width = 800;
	t.height = 800;
}

//If a key is pressed
love.keypressed = function (key) {
	game_keypressed(key);
}

//If a mousebutton is pressed
love.mousepressed = function (x,y,button) {
	//If the left mousebutton is pressed
	game_mousepressed(x,y,button)

}

//Initialize love
love.run();