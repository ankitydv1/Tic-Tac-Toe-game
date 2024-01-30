let boxes = document.querySelectorAll(".box");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#winMsg");
let resetBtn = document.querySelector("#reset");
let audioTurn = new Audio("./images/bloop-1-184019.mp3");
let audioTurn2 = new Audio("./images/audio2.mp3");
let audioWin = new Audio("./images/winner.mp3");
let audioDraw = new Audio(".images/marimba-bloop-1-188150.mp3");

let turnO = true; //playerO, playerX
let count = 0;
const winPatterns = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

const resetGame = () =>{
    turnO = true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("button was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
            audioTurn.play();

        }else{
            box.innerText = "X";
            turnO = true;
            audioTurn2.play();
        }
        box.disabled = true;
        count++;
       let isWinner = checkWinner();
       
    if (count === 9 && !isWinner) {
        gameDraw();
        audioDraw.play();
      }
    });  
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) =>{
    msg.innerText = `Congratulation winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner" ,pos1Val); 
               
                showWinner(pos1Val);
                audioWin.play();
                return true;
            }
        }
    }
};
resetBtn.addEventListener("click",resetGame);