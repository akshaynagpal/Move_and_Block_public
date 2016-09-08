var width = window.screen.width;
var availwidth = window.screen.availWidth;
var height = window.screen.height;
var availheight = window.screen.availHeight;
var gameHeight = 0.9 * availheight; //-75;
var gameWidth =  availwidth; //-30;
var gameArray = [
                    [0, 0, 2, 0, 0, 2, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 2, 2, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0]
                ];
var gameOver = false;
var box_width = (gameWidth/8);
var box_height = (gameHeight/8);
// var displayTouchText,downText;
var downCount=0;
var touchX,touchY;
var moveFromX,moveFromY,moveToX,moveToY;
var moveFromArrayX,moveFromArrayY;
//var boxX,boxY;

var introTextStyle = { font: "Bold "+Math.abs(box_width/2.5)+"px Arial", fill: "#000000", backgroundColor: '#FFFFFF'};
var graphics;
var introText;
var touchCount=0;

var chooseSound,keepSound,crossSound,errorSound,gameoverSound;

function updateIntroText(touchCount){
    if(touchCount==0){
        introText.setText("Player 1's turn!\nSelect a RED piece by touching it!");
    }
    else if (touchCount==1){
        introText.setText("Now, touch a blank box to move\nthe selected RED piece!");
    }
    else if(touchCount==2){
        introText.setText("Now, touch a blank box\nnear any of your opponent's GREEN pieces\nto BLOCK it's movement!");
    }
    else if(touchCount==3){
        introText.setText("GREAT! Now Player 2's turn!\nMove a GREEN piece,\nthen Block a RED box!");
    }
    else {
        introText.destroy();
    }
}

function coordinatesToArray(xCoordinate,yCoordinate){
    var arrayY = Math.floor(xCoordinate/box_width);
    var  arrayX = Math.floor(yCoordinate/box_height);
    return [arrayX,arrayY];
}

function arrayToCoordinates(arrayX,arrayY){
    var xCoordinate = arrayY*box_width;
    var yCoordinate = arrayX*box_height;
    return [xCoordinate,yCoordinate];
}

function fill_cell(X,Y,fillColor,borderColor="0xffffff",borderthickness=2){
    graphics.lineStyle(borderthickness, borderColor, 1);
    graphics.beginFill(fillColor);
    graphics.drawRect(X,Y,box_width,box_height);
    graphics.endFill();
}

function isMovable(x,y){

    if(x==0){ // first row
        if(y==0){ // top left corner
            if(gameArray[x][y+1]==0 || gameArray[x+1][y+1]==0 || gameArray[x+1][y]==0)
                return true;
            else
                return false;
        }
        else if(y==7){ // top right corner
            if(gameArray[x][y-1]==0 || gameArray[x+1][y-1]==0 || gameArray[x+1][y]==0)
                return true;
            else
                return false;   
        }
        else{
            if(gameArray[x][y+1]==0 || gameArray[x+1][y+1]==0 || gameArray[x+1][y]==0 || gameArray[x][y-1]==0 || gameArray[x+1][y-1]==0)
                return true;
            else
                return false;
        }
    }

    else if(x==7){ // last row
        if(y==0){ // bottom left corner
            if(gameArray[x][y+1]==0 || gameArray[x-1][y+1]==0 || gameArray[x-1][y]==0)
                return true;
            else
                return false;
        }
        else if(y==7){ // bottom right corner
            if(gameArray[x][y-1]==0 || gameArray[x-1][y-1]==0 || gameArray[x-1][y]==0)
                return true;
            else
                return false;
        }
        else{
            if(gameArray[x][y+1]==0 || gameArray[x-1][y+1]==0 || gameArray[x-1][y]==0 || gameArray[x][y-1]==0 || gameArray[x-1][y-1]==0)
                return true;
            else
                return false;
        }
    }
    else{
        if(y==0){ // first column
            if(gameArray[x-1][y]==0 || gameArray[x-1][y+1]==0 || gameArray[x][y+1]==0 || gameArray[x+1][y+1]==0 || gameArray[x+1][y]==0)
                return true;
            else
                return false;
        }
        else if(y==7){ // last column
            if(gameArray[x-1][y]==0 || gameArray[x-1][y-1]==0 || gameArray[x][y-1]==0 || gameArray[x+1][y-1]==0 || gameArray[x+1][y]==0)
                return true;
            else
                return false;
        }
        else{ //middle cells where all 9 adjacent cells are present
            if(gameArray[x-1][y-1]==0 ||gameArray[x-1][y]==0 || gameArray[x-1][y+1]==0 || gameArray[x][y+1]==0 || gameArray[x+1][y+1]==0 ||gameArray[x+1][y]==0 ||gameArray[x+1][y-1]==0 ||gameArray[x][y-1]==0 )
                return true;
            else
                return false;
        }
    }
}

function is_game_over(playerNumber){
    for(var row=0;row<8;row++){
        for(var col=0;col<8;col++){
            if(gameArray[row][col]==playerNumber){
                if(isMovable(row,col)){
                    return false
                }
            }
        }
    }
    //touchCount=0;
    //downCount=0;
    return true;
}


function is_valid_move(x,y,x1,y1){

    if(x == x1){ // row same
        if (y<y1){  // left to right move
            var lesser = y;
            var greater = y1;
        }
        else if(y1<y){ // right  to left move
            var lesser = y1;
            var greater = y;
        } 

        for(var i=lesser+1;i<greater;i++){
            if(gameArray[x][i]!=0){
                console.log("invalid move!");
                //errorSound.play();
                return false;
            }
        }
            return true;
    }

    else if(y == y1){ // column same
        if (x<x1){  // downwards move
            lesser = x;
            greater = x1;
        }
        else if(x1<x){ // upwards move
            lesser = x1;
            greater = x;
        }
        for(var i=lesser+1;i<greater;i++){
            if(gameArray[i][y]!=0){
                console.log("invalid move!");
                //errorSound.play();
                return false;
            }
        }
        return true;
    }

    else if((x+y)==(x1+y1)){ // Major diagonal

        var blank_count = Math.abs(x-x1)-1;

        if(x1<x){ //going NorthEast 
            var i = x;
            var j = y;
        }
        else if(x<x1){ //going South West
            var i = x1;
            var j = y1;
        }
        for(var k=0;k<blank_count;k++){
            if(gameArray[--i][++j]!=0){
                console.log("invalid move!");
                //errorSound.play();
                return false;
            }
        }
        return true;
    }

    else if(Math.abs(x-y)==Math.abs(x1-y1)){ // Minor diagonal
        var blank_count = Math.abs(x-x1)-1;
        if(x1<x){ //going North West
            var i = x1;
            var j = y1;
        }
        else if(x<x1){ //going South East
            var i = x;
            var j = y;
        }
        for(var k=0;k<blank_count;k++){
            if(gameArray[++i][++j]!=0){
                console.log("invalid move!");
                //errorSound.play();
                return false;
            }
        }
        return true;
    }
}

function count_touch(){
    var c2a = coordinatesToArray(touchX,touchY);
    var arrayX = c2a[0];
    var arrayY = c2a[1];
    var a2c = arrayToCoordinates(arrayX,arrayY);
    var coordinateX = a2c[0];
    var coordinateY = a2c[1];
    
    
    if(downCount==0){ // Player 1 choose from-box
        if(gameArray[arrayX][arrayY]==1){
            moveFromX = coordinateX;
            moveFromY = coordinateY;
            moveFromArrayX = arrayX;
            moveFromArrayY = arrayY;
            if(isMovable(moveFromArrayX,moveFromArrayY)){
                fill_cell(coordinateX,coordinateY,"0xff0000","0x0000ff");
                chooseSound.play();
                touchCount = touchCount + 1;
                downCount++;                
            }
            else{
                errorSound.play();
            }            
        }
        //downText.setText("P1 cross /"+downCount);
    }
    else if(downCount==1){ //Player 1 choose to-box
        if(gameArray[arrayX][arrayY]==0){
            moveToX = arrayX;
            moveToY = arrayY;
            if (is_valid_move(moveFromArrayX,moveFromArrayY,moveToX,moveToY)){
                gameArray[moveFromArrayX][moveFromArrayY]=0;
                gameArray[moveToX][moveToY] = 1;
                fill_cell(moveFromX,moveFromY,"0x000000","0xffffff");
                fill_cell(coordinateX,coordinateY,"0xff0000");
                keepSound.play();
                touchCount = touchCount + 1;
                downCount++;    
                if(is_game_over(2)){
                    // downCount = 0;
                    // touchCount=0;
                    game.state.start('p1wins');
                }
            }
            else{
                errorSound.play();
            }
        }
    }

    else if(downCount==2){  // Player 1 choose cross-box
        if(gameArray[arrayX][arrayY]==0){
            gameArray[arrayX][arrayY] = 3;
            fill_cell(coordinateX,coordinateY,"0x707070");
            crossSound.play();
            touchCount = touchCount + 1;
            downCount++;
            if(is_game_over(2)){
                // downCount = 0;
                // touchCount=0;
                game.state.start('p1wins');
            }
        }
        else{
            errorSound.play();
        }
    }

    else if(downCount==3){ // Player 2 choose from-box
        if(gameArray[arrayX][arrayY]==2){
            moveFromX = coordinateX;
            moveFromY = coordinateY;
            moveFromArrayX = arrayX;
            moveFromArrayY = arrayY;
            if(isMovable(moveFromArrayX,moveFromArrayY)){
                fill_cell(coordinateX,coordinateY,"0x00ff00","0x0000ff");
                chooseSound.play();
                touchCount = touchCount + 1;
                downCount++;    
            }  
            else{
                errorSound.play();
            }            
        }
    }

    else if(downCount==4){ // Player 2 choose to-box
        if(gameArray[arrayX][arrayY]==0){
            moveToX = arrayX;
            moveToY = arrayY;
            if (is_valid_move(moveFromArrayX,moveFromArrayY,moveToX,moveToY)){
                gameArray[moveFromArrayX][moveFromArrayY]=0;
                gameArray[moveToX][moveToY] = 2;
                fill_cell(moveFromX,moveFromY,"0x000000","0xffffff");
                fill_cell(coordinateX,coordinateY,"0x00ff00");
                keepSound.play();
                touchCount = touchCount + 1;
                downCount++;    
                if(is_game_over(1)){
                    // downCount = 0;
                    // touchCount=0;
                    game.state.start('p2wins');
                }
            }
            else{
                errorSound.play();
            }
        }
    }

    else { //player 2 choose cross-box
        if(gameArray[arrayX][arrayY]==0){
            gameArray[arrayX][arrayY] = 3;
            fill_cell(coordinateX,coordinateY,"0x707070");
            crossSound.play();
            touchCount = touchCount + 1;
            downCount = 0;
            if(is_game_over(1)){
                // downCount = 0;
                // touchCount=0;
                game.state.start('p2wins');
            }
        }
        else{
            errorSound.play();
        }
    }

    if(touchCount<5){
        updateIntroText(touchCount);
    }
    console.log("touchcount: "+touchCount);
    console.log("downcount: "+downCount);
}

var game = new Phaser.Game(gameWidth , gameHeight, Phaser.AUTO, 'gameDiv');

game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('p1wins',p1WinState);
game.state.add('p2wins',p2WinState);

game.state.start('load');