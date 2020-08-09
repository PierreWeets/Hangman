function IsLetterFound(chosenLetter, hiddenWord){
    
    console.log("hiddenWord = " + hiddenWord);
    console.log("chosenLetter = "  + chosenLetter);
    //let array = Array.from(hiddenWord);//transform the hiddenWord into an array of letters
    return Array.from(hiddenWord).includes(chosenLetter);//test if the letter is present , at least once, in the array of letters
} ;

function displayLetter(letter = ""){
    // test each character, in the array, if == the letter to display, then add the index of the character, into the foundIndexesArray; and finally, remove the null indexes
    let foundIndexesArray = Array.from(hiddenWord).map((character, index) => character === letter ? index : null).filter(index => index !== null);
    console.log("foundIndexesArray = " + foundIndexesArray);
    //replace the original "_" by the letter to display
    foundIndexesArray.forEach( index => lettersToDisplayArray[index]=letter );
    console.log("lettersToDisplayArray = " + lettersToDisplayArray);
    
    let string = "";
    //create a string with each letter of the array , separated with a space
    lettersToDisplayArray.forEach(letter => string += " " + letter);
    //display the string
    document.getElementById("hiddenWord").innerHTML = "word to find : " + string;
}

function displayFaultLetter(letter = ""){
    if(letter !== ""){
        faultLettersArray.push(letter);//add the wrong letter to the list of the wrong letters
    }
    document.getElementById("faultLetters").innerHTML = "uncorrect letters : " +  faultLettersArray;
}

function isHiddenWordFound(){
    //console.log("isHiddenWordFound() : lettersToDisplayArray.indexOf('_') = " + lettersToDisplayArray.indexOf("_"));
    //test if no more "_" found, then word is found
    if(lettersToDisplayArray.indexOf("_") == -1){
        return true;
    } else {
        return false;
    }
}

function clear() {// clear the content of the whole canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function displayHungMan(){
    clear();
    //the base of the gibbet
    let baseWidth = canvas.height/4;
    let baseHeight = baseWidth/4;
    let basePosX = canvas.width/2-baseWidth*2;
    let basePosY = canvas.height - baseHeight;
    let baseColor = "black";

    // the trunk
    let trunkHeight = canvas.height-baseHeight;
    let trunkWidth = baseWidth/5;
    let trunkPosX = basePosX + baseWidth/2 - trunkWidth/2;
    let trunkPosY = basePosY - trunkHeight;
    let trunkColor = "brown";

    // the horizontal Bar
    let horizontalBarPosX = trunkPosX;
    let horizontalBarPosY = trunkPosY;
    let horizontalBarWidth = trunkHeight/2.5 ;
    let horizontalBarHeight = trunkWidth/2;
    let horizontalColor = trunkColor;

    // the oblic bar
    let oblicBarWidth = horizontalBarHeight;
    let oblicBarLeftCapPosX = horizontalBarPosX+oblicBarWidth/2;
    let oblicBarLeftCapPosY = horizontalBarPosY+horizontalBarWidth/2;
    let oblicBarRightCapPosX = horizontalBarPosX + horizontalBarWidth/2;
    let oblicBarRightCapPosY = horizontalBarPosY+oblicBarWidth/2;
    let oblicBarColor = trunkColor;

    //the vertical Bar
    let verticalBarWidth = horizontalBarHeight;
    let verticalBarHeight = horizontalBarHeight *4;
    let verticalBarPosX = horizontalBarPosX + horizontalBarWidth - verticalBarWidth;
    let verticalBarPosY = horizontalBarPosY;
    let verticalColor = trunkColor;  
    
    //the head
    let headRadius = trunkHeight/15;
    let headCenterPosX = verticalBarPosX + verticalBarWidth/2;
    let headCenterPosY = verticalBarPosY + verticalBarHeight + headRadius - 5;
    let headColor = "yellow";

    //the body trunk
    let bodyTrunkHeight = canvas.height/4 ;
    let bodyTrunkWidth = bodyTrunkHeight*0.4;    
    let bodyTrunkPosX = headCenterPosX - bodyTrunkWidth/2;
    let bodyTrunkPosY = headCenterPosY + headRadius;
    let bodyTrunkColor = "brown";

    // left arm
    let leftArmWidth = bodyTrunkWidth/4;
    let leftArmHeight = bodyTrunkHeight * 1.2;
    let leftArmPosX = bodyTrunkPosX - leftArmWidth - 1;
    let leftArmPosY = bodyTrunkPosY;
    let leftArmColor = bodyTrunkColor;

    // right arm
    let rightArmWidth = leftArmWidth;
    let rightArmHeight = leftArmHeight;
    let rightArmPosX = bodyTrunkPosX + bodyTrunkWidth + 1;
    let rightArmPosY = leftArmPosY;
    let rightArmColor = leftArmColor;

    // left leg
    let leftLegWidth = bodyTrunkWidth/2 - 1;
    let leftLegHeight = bodyTrunkHeight * 1.3;
    let leftLegPosX = bodyTrunkPosX;
    let leftLegPosY = bodyTrunkPosY + bodyTrunkHeight + 1;
    let leftLegColor = "blue";

    // right leg
    let rightLegWidth = leftLegWidth;
    let rightLegHeight = leftLegHeight;
    let rightLegPosX = bodyTrunkPosX + bodyTrunkWidth/2 + 1;
    let rightLegPosY = leftLegPosY;
    let rightLegColor = leftLegColor;

    //display the base
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.fillRect(basePosX, basePosY, baseWidth, baseHeight);
    ctx.closePath();
    ctx.fill();
    ///display the vertical trunk
    ctx.fillStyle = trunkColor;
    ctx.beginPath();
    ctx.fillRect(trunkPosX, trunkPosY, trunkWidth, trunkHeight);
    ctx.closePath();
    ctx.fill();
    ///display the horizontal Bar
    ctx.fillStyle = horizontalColor;
    ctx.beginPath();
    ctx.fillRect(horizontalBarPosX, horizontalBarPosY, horizontalBarWidth, horizontalBarHeight);
    ctx.closePath();
    ctx.fill();

    // display the oblic bar
    ctx.lineWidth = oblicBarWidth;
    ctx.strokeStyle=oblicBarColor;
    ctx.beginPath();
    ctx.moveTo(oblicBarLeftCapPosX, oblicBarLeftCapPosY);
    ctx.lineTo(oblicBarRightCapPosX, oblicBarRightCapPosY);
    ctx.closePath();
    ctx.stroke();

    ///display the vertical Bar
    ctx.fillStyle = verticalColor;
    ctx.beginPath();
    ctx.fillRect(verticalBarPosX, verticalBarPosY, verticalBarWidth, verticalBarHeight);
    ctx.closePath();
    ctx.fill();

    switch(faultLettersArray.length){//following the number of wrong letters display the limbs on the gibbet
        case 6 : 
            ctx.fillStyle = rightLegColor;
            ctx.beginPath();
            ctx.fillRect(rightLegPosX, rightLegPosY, rightLegWidth, rightLegHeight);
            ctx.closePath();
            ctx.fill();  
        case 5 :
            ctx.fillStyle = leftLegColor;
            ctx.beginPath();
            ctx.fillRect(leftLegPosX, leftLegPosY, leftLegWidth, leftLegHeight);
            ctx.closePath();
            ctx.fill();  
        case 4 : 
            ctx.fillStyle = rightArmColor;
            ctx.beginPath();
            ctx.fillRect(rightArmPosX, rightArmPosY, rightArmWidth, rightArmHeight);
            ctx.closePath();
            ctx.fill();
        case 3 :   
            ctx.fillStyle = leftArmColor;
            ctx.beginPath();
            ctx.fillRect(leftArmPosX, leftArmPosY, leftArmWidth, leftArmHeight);
            ctx.closePath();
            ctx.fill();  
        case 2 : 
            ctx.fillStyle = bodyTrunkColor;
            ctx.beginPath();
            ctx.fillRect(bodyTrunkPosX, bodyTrunkPosY, bodyTrunkWidth, bodyTrunkHeight);
            ctx.closePath();
            ctx.fill();
        case 1 : 
            ctx.fillStyle = headColor;
            ctx.beginPath();
            ctx.arc(headCenterPosX, headCenterPosY, headRadius, 0, Math.PI*2);
            ctx.closePath();
            ctx.fill();
    }
}

function displayNumberOfAttempts(number = 0){
    document.getElementById("attempt").innerHTML="number of attempts : " + number;
}

function isGameOver(){
    if (faultLettersArray.length >= 6){
        return true;
    } else {
        return false;
    }
}

function isChosenLetterAlreadyUsed(letter=""){
    return chosenLettersArray.includes(letter);
}
// -----  Main code --------------
document.addEventListener("keydown", event =>{
    console.log("event.key = " + event.key);
    console.log("event.keyCode = " + event.keyCode);
    if( event.keyCode >= 65 && event.keyCode <= 90){//test if a letter key has been pressed
        let letter = event.key;
        letter = letter.toLowerCase();//transform into a lower case letter
        
        if(! isChosenLetterAlreadyUsed(letter)){//test if the chosen letter was not already used before.
            chosenLettersArray.push(letter);//add the chosen letter to the list of already chosen letters
            attemptsCounter++; //increment the attempts counter
            
            displayNumberOfAttempts(attemptsCounter);
            //console.log("letter = " + event.key);
            if(IsLetterFound(letter, hiddenWord)){//if chosen letter found in the hidden word
                //console.log("letter = " + event.key + " found in hidden word " + hiddenWord);
                displayLetter(letter);//display the found letter
                if (isHiddenWordFound()){//if the whole hidden word has been found
                    alert(`You find the hidden word "${hiddenWord}" in ${attemptsCounter} attempts.`)
                }
            }else {
                displayFaultLetter(event.key);//display the wrong letter
                displayHungMan(); //display the hangman with new limb
                if(isGameOver()){
                    alert(`GAME OVER \n\nYou did no find the hidden word "${hiddenWord}", in ${attemptsCounter} attempts.`)
                }
            }
        }
    }
});

//---------------------------------------------------
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var hiddenWord= "woord";
hiddenWord = hiddenWord.toLowerCase();
var attemptsCounter = 0;
var faultLettersArray=[];
var lettersToDisplayArray = [];
for(i=0; i<hiddenWord.length;i++ ){
    lettersToDisplayArray.push("_");
}
var chosenLettersArray = [];

//console.log("lettersToDisplayArray = " + lettersToDisplayArray);
displayHungMan();
displayNumberOfAttempts();
displayLetter();
displayFaultLetter();
