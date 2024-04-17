const cells = document.querySelectorAll(".cell");
const statustxt = document.querySelector("#status");
const restartbtn = document.querySelector("#restartbtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];

let currentplayer = "X";
let running = true;
intializeGame();

function intializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellclicked));
  restartbtn.addEventListener("click", restartGame);
  statustxt.textContent = `${currentplayer} it's your turn`;
  running = true;
}
function cellclicked() {
  const cellindex = this.getAttribute("cellindex");
  if (options[cellindex] != "" || !running) {
    return;
  }
  updateCell(this, cellindex);
  CheckWinnner();
}
function updateCell(cell, index) {
  options[index] = currentplayer;
  cell.textContent = currentplayer;
}
function changeplayer() {
  currentplayer = currentplayer == "X" ? "O" : "X";
  statustxt.textContent = `${currentplayer} itsur turn`;
}
function CheckWinnner() {
  let win = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];

    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if(cellA==cellB &&cellB==cellC){
        win=true;
        break;
    }
  }
  if(win){
    statustxt.textContent=`${currentplayer} wins`;
    running=false;
  }
  else if(!options.includes("")){
    statustxt.textContent=`${currentplayer} draw`;

  }
  else{
    changeplayer();
  }
}

function restartGame() {
  currentplayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statustxt.textContent = `${currentplayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
