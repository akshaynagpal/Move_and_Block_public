var loadState={
    preload: function() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;

            game.load.audio('choose','asset/pickup.mp3');
            game.load.audio('keep','asset/jump.mp3');
            game.load.audio('cross','asset/correct.mp3');
            game.load.audio('error','asset/error.mp3');
            game.load.audio('gameover','asset/gameover.mp3');
        },
    create: function(){
        game.state.start('menu');
    }
    
};