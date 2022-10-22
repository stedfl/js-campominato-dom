btnStart = document.getElementById("start");
gameWrap = document.querySelector(".game-wrapper");
const bombsNumb = 16;
let whereBombs = [];
let score = 0;

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
  let result;
  let end = false;
  const allCell = document.getElementsByClassName("box");
  if (!whereBombs.includes(this.idElement)) {
    this.classList.add("change");
    if (score === (allCell.length - bombsNumb)) {
      end = true;
      result = `
      Hai vinto totalizzando ${score} punti su ${allCell.length - bombsNumb}
      `;
    }
  } else {
    this.classList.add("bomb")
    score = score - 1;
    end = true;
    result = `
    Hai perso totalizzando ${score} punti su ${allCell.length - bombsNumb}
    `;
  }
  if (end) {
    endGame(result);
  }
}

function endGame(result) {
  const output = document.querySelector(".output");
  output.innerText = result;
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
  score = 0;
  whereBombs = [];
  document.querySelector(".output").innerText = "";
  gameWrap.innerText = "";
}