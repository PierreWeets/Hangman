function displayHungMan(){
    canvas.style.backgroundSize = `${canvas.width}px ${canvas.height}px`;
    //canvas.style.filter = "opacity(30%)";

    ctx.clearRect(0,0, canvas.width, canvas.height);
    //the base of the gibbet
    let baseWidth = canvas.height/3;
    let baseHeight = baseWidth/4;
    let basePosX = canvas.width/2-baseWidth;
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

function IsLetterFoundInHiddenWord(chosenLetter, hiddenWord){
    return Array.from(hiddenWord).includes(chosenLetter);//test if the letter is present , at least once, in the array of letters
} ;

function displayCorrectLetter(letter = ""){
    // test each character, in the array, if character == letter to display, then add the index of the character, into the foundIndexesArray; and finally, remove the null indexes
    let foundIndexesArray = Array.from(hiddenWord).map((character, index) => character === letter ? index : null).filter(index => index !== null);
    //replace the original "_" by the letter to display
    foundIndexesArray.forEach( index => lettersToDisplayArray[index]=letter );
    
    let string = "";
    //create a string with each letter of the array , separated with a space
    lettersToDisplayArray.forEach(letter => string += " " + letter);
    //display the string
    document.getElementById("hiddenWord").innerHTML = "word to find : " + string;
}

function displayWrongtLetter(letter = ""){
    if(letter !== ""){
        faultLettersArray.push(letter);//add the wrong letter to the list of the wrong letters
    }
    document.getElementById("faultLetters").innerHTML = "uncorrect letters : " +  faultLettersArray;
}

function isHiddenWordFound(){
    //test if no more "_" found, then word is found
    if(lettersToDisplayArray.indexOf("_") == -1){
        return true;
    } else {
        return false;
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

// function displayKeyboardCanvas(letter){
//     let keybordPosX = canvas.width/2;
//     let keybordPosY = 0;

//     let keyPosX = keybordPosX;
//     let keyPosY = keybordPosY;
//     let keyWidth = canvas.width/10;
//     let keyHeight =keyWidth;

//     ctx.fillStyle = "red";
//     ctx.fillRect(keyPosX,keyPosY,keyWidth,keyHeight);
    
//     ctx.fillStyle = "blue";
//     ctx.font = "40px serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = 'middle';
//     ctx.fillText("<p>" + letter.toUpperCase() + "</p>", keyPosX + keyWidth/2 , keyPosY + keyHeight/2);
// }

function createKeyboard(){
    //get the reference of the container object
    let containerRef = document.getElementById("container");

    //modify the container size following the canvas size
    let containerWidth = canvas.width;
    let containerHeight = containerWidth/5;
    
    // let containerWidth = canvas.width;
    // let containerHeight = 100;

    containerRef.style.height = `${containerHeight}px`;
    containerRef.style.width = `${containerWidth}px`;

    console.log("containerRef.style.height :" + containerRef.style.height);
    console.log("containerRef.style.width :" + containerRef.style.width);

    for(i=65, string =""; i<=90 ; i++){//generate the 26 boxes containing the 26 letters
        let letterUppercase = String.fromCharCode(i).toUpperCase();
        string += `<div id="${letterUppercase}" class="letter" 
                    style="height: ${(containerHeight-4)/2}px ; width :${(containerWidth-36)/13}px;" 
                    onclick="treatLetter('${letterUppercase}')">${letterUppercase}</div><br>`;
    }
    containerRef.innerHTML = string;
}

document.addEventListener("keydown", event =>{
    console.log("event.key = " + event.key);
    console.log("event.keyCode = " + event.keyCode);
    if( event.keyCode >= 65 && event.keyCode <= 90){//test if a letter key has been pressed
        treatLetter(event.key.toUpperCase());
    }
});
// -----  Main code --------------
function treatLetter(letter){   
    //change the color and backgrounb color of the letter
    //document.getElementById(letter.toUpperCase()).setAttribute("style", "background-color:red; color:white") ;
    document.getElementById(letter.toUpperCase()).style.backgroundColor = "red";
    document.getElementById(letter.toUpperCase()).style.color = "white";
    
    if(! isChosenLetterAlreadyUsed(letter)){//test if the chosen letter was not already used before.
            
        //displayChoosenLetter(letter);
        chosenLettersArray.push(letter);//add the chosen letter to the list of already chosen letters
        attemptsCounter++; //increment the attempts counter
        
        displayNumberOfAttempts(attemptsCounter);
        //console.log("letter = " + event.key);
        if(IsLetterFoundInHiddenWord(letter, hiddenWord)){//if chosen letter found in the hidden word
            //console.log("letter = " + event.key + " found in hidden word " + hiddenWord);
            displayCorrectLetter(letter);//display the found letter
            if (isHiddenWordFound()){//if the whole hidden word has been found
                alert(`You find the hidden word "${hiddenWord}" in ${attemptsCounter} attempts.`)
            }
        }else {
            displayWrongtLetter(letter);//display the wrong letter
            displayHungMan(); //display the hangman with new limb
            if(isGameOver()){
                alert(`GAME OVER \n\nYou did no find the hidden word "${hiddenWord}", in ${attemptsCounter} attempts.`)
            }
        }
    }
}


//---------------------------------------------------
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');  
var words = ["red","blue","green","yellow", "black", "purple", "orange", "violet", "white", "brown"];
var hiddenWord = words[Math.floor(Math.random() * words.length)];

hiddenWord = hiddenWord.toUpperCase();
var attemptsCounter = 0;    
var faultLettersArray=[];
var lettersToDisplayArray = [];
for(i=0; i<hiddenWord.length;i++ ){
    lettersToDisplayArray.push("_");
}
var chosenLettersArray = [];

//console.log("lettersToDisplayArray = " + lettersToDisplayArray);
displayHungMan();
createKeyboard();   
displayNumberOfAttempts();
displayCorrectLetter();
displayWrongtLetter();
