const boxes=document.querySelectorAll('.box');
const Header=document.querySelector('.game-info');
const Btn=document.querySelector('.button-85')



let currentPlayer;//xor0
let gameGrid;
let headerPlayer;//nishkarsh or utkarsh


const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6]
];


// now we are creating a function for initialize a game


function initGame(){
    currentPlayer="X";
    headerPlayer="Nishkarsh"
    
   
    gameGrid=["","","","","","","","",""];
    // ui par bhi empty karo
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList.remove("win");
    })
    
    
    Header.innerText=`Current Player - ${headerPlayer}`
    Btn.classList.remove("active");
}

initGame();

function swapTurn()
{
    
    if(currentPlayer==="X")
    {

        currentPlayer="O"
        headerPlayer="Utkarsh"
    }
    else{
        currentPlayer="X"
        headerPlayer="Nishkarsh"
    }
  
    Header.innerText=`Current Player - ${headerPlayer}`

}

function checkGameOver(){

    let answer=""
    winningPosition.forEach((position)=>{
        // all three positions shoud be non-empty ans exactly same value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        && (gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]==="X")
            {
                answer="Nishkarsh";
            }
            else{
                answer="Utkarsh";
            }
            
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            // now we know x/0 winners
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }  
    })
    if(answer!=="")
    {
        Header.innerText=`Winner is - ${answer}`
        Btn.classList.add("active");
        // agar koi jeet gaya hai to return kar do
        return;
    }
    else{
        Btn.classList.add("active");
    }
    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        {
            fillcount+=1;
        }
    })
    if(fillcount===9)
    {
        Header.innerText=`Game is Tied`
        Btn.classList.add("active");
    }

}

function handleClick(index){

   
    if(gameGrid[index]==="")
    {
        
        boxes[index].innerText= currentPlayer;//UI par show ho rha
       
        gameGrid[index]=currentPlayer;//logic mai show ho rha

        boxes[index].style.pointerEvents="none";
        swapTurn();
        // check gameover;
        checkGameOver();

    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

Btn.addEventListener('click',initGame);







