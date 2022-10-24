const btnStart = document.getElementById("start");
const btnReset = document.getElementById("reset");
const gameWrap = document.querySelector(".game-wrapper");
const listHistory = document.querySelector(".storico");
const bombsNumb = 16;
let whereBombs = [];
let score = 0;
let matches = 0;
let result = "";

btnStart.addEventListener ("click", function() {
  const elemPerRow = document.getElementById("level-game").value;
  reset();
  init(elemPerRow);
})

function init(elNumb) {
  container = document.createElement("div");
  container.className = "container";
  gameWrap.append(container);
  const totalBox = getSquaredNumber(elNumb);
  for (i = 0; i < totalBox; i++) {
    createBox(i, elNumb);
  }
  bombsGenerator(totalBox);
}

function getSquaredNumber(numb) {
  return Math.pow(numb, 2);
}

function createBox(indexLoop, elNumb) {
  elBox = document.createElement("div");
  elBox.className = "box";
  elBox.style.width = dimensionCalc(elNumb);
  elBox.style.height = dimensionCalc(elNumb);
  elBox.idElement = indexLoop + 1;
  elBox.innerText = elBox.idElement;
  document.querySelector(".container").append(elBox);
  elBox.addEventListener("click", clickBox);
}

function dimensionCalc(elNumb) {
  return `calc(100% / ${elNumb})`;
}

function bombsGenerator(max) {
  while (!(whereBombs.length === bombsNumb)) {
    let randomNumb = Math.ceil(Math.random() * max);
    if (!whereBombs.includes(randomNumb)) {
      whereBombs.push(randomNumb);
    }
  }
}

function clickBox() {
  score++;
  let end = false;
  const allCell = document.getElementsByClassName("box");
  if (!whereBombs.includes(this.idElement)) {
    this.classList.add("change");
    if (score === (allCell.length - bombsNumb)) {
      end = true;
      result = "vinto";
    }
  } else {
    this.classList.add("bomb")
    score = score - 1;
    end = true;
    result = "perso";  
  }

  if (end) {
    let output = `
    Hai ${result} totalizzando ${score} punti su ${allCell.length - bombsNumb}
    `; 
    endGame(output);
  }
  this.removeEventListener("click", clickBox);
}

function endGame(output) {
  matches++;
  const outputMsg = document.querySelector(".output");
  outputMsg.innerText = output;
  freezeGrid();
  showBombs();
}

function freezeGrid() {
  const freezeLayer = document.createElement("div");
  freezeLayer.className = "freeze-layer";
  gameWrap.append(freezeLayer);
}

function showBombs() {
  const allCell = document.getElementsByClassName("box");
  for (i = 0; i < allCell.length; i++) {
    if(whereBombs.includes(allCell[i].idElement)) {
      allCell[i].classList.add("bomb");
    }
  }
}

function reset() {
  if (matches > 0) {
    listHistory.classList.add("d-block");
    li = document.createElement("li");
    li.matches = matches;
    li.innerText = `${matches}° partita: Hai ${result} con ${score} punti`;
    if (li.matches !== listHistory.lastChild.matches) {
      listHistory.append(li);
    }
  }
  score = 0;
  whereBombs = [];
  document.querySelector(".output").innerText = "";
  gameWrap.innerText = "";
}