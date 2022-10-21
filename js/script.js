btnStart = document.getElementById("start");
container = document.querySelector(".container");
btnStart.addEventListener ("click", function() {
  const elemPerRow = document.getElementById("level-game").value;
  container.innerHTML = "";
  init(elemPerRow);
})

function init(elNumb) {
  const totalBox = Math.pow(elNumb, 2);
  for (i = 0; i < totalBox; i++) {
    createBox(i, elNumb)
  }
}

function createBox(indexLoop, elNumb) {
  elBox = document.createElement("div");
  elBox.className = "box";
  elBox.style.width = dimensionCalc(elNumb);
  elBox.style.height = dimensionCalc(elNumb);
  elBox.idElement = indexLoop + 1;
  elBox.innerText = elBox.idElement;
  container.append(elBox);
  elBox.addEventListener("click", clickBox);
}

function dimensionCalc(elNumb) {
  return `calc(100% / ${elNumb})`;
}

function clickBox(event){
  console.log("Cella cliccata numero: " + this.idElement); 
  this.classList.add("change");
}