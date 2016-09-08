var playState ={
    
    
         create: function() {

            graphics = game.add.graphics(0,0);
            game.stage.backgroundColor = "000000";
            graphics.lineStyle(2,0xffffff,1);


            last_start = box_width*8;
            last_end = box_height*8;
            //draw vertical lines

            for(var i=0;i<=last_start;i+=box_width){
                graphics.moveTo(i,0);
                graphics.lineTo(i,last_end);
            }

            //draw horizontal lines

            for(var j=0;j<=last_end;j+=box_height){
                graphics.moveTo(0,j);
                graphics.lineTo(last_start,j);
            }    

            var redOneInit = [
                                [5,3],[5,4],[7,2],[7,5]
                                
                             ];
            var greenTwoInit = [
                                [0,2],[0,5],[2,3],[2,4]
                               ];

            //place pawns at initial positions for player 1 (Red)
            for(var i=0;i<=3;i++){
                var a2c = arrayToCoordinates(redOneInit[i][0],redOneInit[i][1]);
                fill_cell(a2c[0],a2c[1],"0xff0000");
            }

            //place pawns at initial positions for player 2 (Green)
            for(var i=0;i<=3;i++){
                var a2c = arrayToCoordinates(greenTwoInit[i][0],greenTwoInit[i][1]);
                fill_cell(a2c[0],a2c[1],"0x00ff00");
            }
            
            introText = game.add.text(game.world.centerX,game.world.centerY-(box_height/2),"Player 1's turn!\nSelect a RED piece by touching it!",introTextStyle);
            introText.anchor.setTo(0.5,0.5);

            chooseSound = game.add.audio('choose'); 
            keepSound = game.add.audio('keep'); 
            //crossSound = game.add.audio('cross'); 
            errorSound = game.add.audio('error');
        },
    

        update: function(){
            touchX = game.input.x;
            touchY = game.input.y;

            //displayTouchText.setText("X : "+touchX+"\n Y:"+touchY);
                     
            game.input.onTap.add(count_touch,this);

            if(gameOver){
                downCount=0;
                touchCount=0;
                console.log("game over! "+"downCount:"+downCount+", touchCount:"+touchCount);
                gameArray = [
                    [0, 0, 2, 0, 0, 2, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 2, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0]
                ];
                gameOver = false;
            }    
        }   
};