var menuState = {    
    create: function(){
    	var nameStyle = { font: "Bold "+ Math.abs(box_width)+"px Arial", fill: "#FF0000"};
        var startStyle = { font: ""+Math.abs(box_width)+"px Arial", fill: "#0000FF",backgroundColor:"#FFFFFF"};
    	var instructionStyle = {font: ""+Math.abs(box_width/2.8)+"px Arial", fill: "#FFFFFF"};

    	var nameLabel = game.add.text(game.world.centerX,Math.abs(gameHeight/10),'Move & Block',nameStyle);
        var startLabel = game.add.text(game.world.centerX,Math.abs(gameHeight/1.2),'<START>',startStyle);
        var instructionLabel = game.add.text(game.world.centerX,Math.abs(gameHeight/2),'- It\'s a 2 player game.\n- In each turn, each player\nmoves 1 of his 4 pieces,\nHORIZONTALLY, VERTICALLY or \nDIAGONALLY, as far as possible,\nand then BLOCKS any 1 box on the grid.\n- The first player to block opponent\'s\n4 pieces Wins!',instructionStyle);
        nameLabel.anchor.setTo(0.5);
        startLabel.anchor.setTo(0.5);
        instructionLabel.anchor.setTo(0.5);
        nameLabel.addColor('#00FF00',0);
        nameLabel.addColor('#707070',4);
        nameLabel.addColor('#FF0000',7);
        game.input.onTap.add(this.startGame,this);
    },

    startGame: function(){
        crossSound = game.add.audio('cross');
        crossSound.play();
        game.state.start('play');
    }
};