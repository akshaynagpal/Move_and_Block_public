var p1WinState = {    
    create: function(){
        var gameoverSound = game.add.audio('gameover');
        gameoverSound.play();
    	var restartStyle = { font: ""+Math.abs(box_width)+"px Arial", fill: "#0000FF"};
    	var msgStyle = { font: ""+ Math.abs(box_width)+"px Bold Arial", fill: "#FF0000"};
    	var msgLabel = game.add.text(game.world.centerX,Math.abs(gameHeight/8),'P1 Wins!!',msgStyle);
        var restartLabel = game.add.text(game.world.centerX,Math.abs(gameHeight/2),'<Restart>',restartStyle);
        msgLabel.anchor.setTo(0.5);
        restartLabel.anchor.setTo(0.5);
        game.input.onTap.add(this.startGame,this);
    },

    startGame: function(){
        gameOver = true;
        game.state.start('menu');
    }
};