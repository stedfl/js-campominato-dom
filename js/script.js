btnStart = document.getElementById("start");
gameWrap = document.querySelector(".game-wrapper");
const bombsNumb = 16;
const whereBombs = [];
let score = 0;

btnStart.addEventListener ("click", function() {
  const elemPerRow = document.getElementById("level-game").value;
  reset();
  init(elemPerRow);
  return 
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
while (!(whereBombs.length === bombsNumb)){
  let randomNumb = Math.ceil(Math.random() * max);
  if (!whereBombs.includes(randomNumb)) {
      whereBombs.push(randomNumb);
    }
  }
}

function clickBox(){
  console.log(document.querySelector(".container"));
  score++;
  let result;
  let end = false;
  const allCell = document.getElementsByClassName("box");
  if (!whereBombs.includes(this.idElement)) {
    this.classList.add("change");
    if (score === (allCell.length - bombsNumb)) {
      end = true;
      result = `
      Hai vinto con ${score} punti su ${allCell.length}
      `;
    }
  } else {
    this.classList.add("bomb")
    score = score - 1;
    end = true;
    result = `
    Hai perso con ${score} punti su ${allCell.length}
    `;
  }

  if (end === true) {
    endGame(result);
 }
}

function endGame(result) {
  const output = document.querySelector(".output");
  output.innerText = result;
  freezeGrid();
  // showerBomb();
}

// FUNZIONE PER CONGELARE
// 1 crea un elemento div
// 2 all'elemento div dò classe .freeze (nel CSS questa ha position absolute, top 0 left 0, colore grigino trasparente e width ed height 100%)
// 3 inserisco il div nel main wrapper a cui nel CSS ho dato position absolute
function freezeGrid() {
  const freezeLayer = document.createElement("div");
  freezeLayer.className = "freeze-layer";
  gameWrap.append(freezeLayer);
}

function reset() {
  score = 0;
  document.querySelector(".output").innerText = "";
  gameWrap.innerText = "";
  console.log(gameWrap);
}

/*

VARIABILI GLOBALI
1 dichiarazione array bombe vuoto
2 dichiarazione numero bombe
3 dichiarazione punteggio che inizialmente è zero

WORKFLOW
1)Pagina iniziale: h2 centrale con scritta "scegli il livello di difficoltà e premi Start"
 1.Al clicK di start, cancellare il contenuto di h2
 2. Azzerare il punteggio
 3. Pulire il campo con il punteggio finale
 2.Avviare la funzione INIT

 FUNZIONE INIT
 1. Genera un array con le bombe: l'array è lungo quanto il numero delle bombe scelto che dichiariamo come una costante globale. L'array lo dichiariamo fuori inizialmente vuoto.
 Chiamiamo la funzione per generare le bombe.
 1. Generare le celle

FUNZIONE GENERA BOMBE
1. estraggo un numero da 1 al numero totale delle celle fino a che il mio array è lungo quanto il numero delle bombe dichiarato globalmente.
  Se il numero non è contenuto nell'array bombe, lo pusho dentro altrimenti ne estraggo un altro.
  la funzione ritorna l'array bombe

FUNZIONE CLICKBOX
1 aumento il numero dello score (variabile globale)
3 Se ho cliccato sulla cella con un id NON incluso nell'array bombe:
  1 aggiungo alla cella  la classe .change che la colora.
  2 Controllo il valore dello score;
    se lo score è uguale (numero totali celle - numero bombe) allora:
    1. isWinner = true; 
    2. chiamo funzione FINE GIOCO

Altrimenti (se ho cliccato su una cella con l'id incluso nell'array bombe):
  score = score -1;
  isWinner = false;
  1 Chiamo funzione FINE GIOCO

 if is Winner = true; 
  const result = "hai vinto con "score" tentativi su totalBomb"
if is Winner = false
  const result = "hai perso con "score" tentativi su totalBomb"


FUNZIONE FINE GIOCO ha bisogno dell'attribuito result
1 Mostra tutte le bombe chiamando la funzione ShowBombs
1 Congela griglia: chiamo funzione per congelare
2 Scrivo dentro h2 il result risultato.

FUNZIONE PER CONGELARE
1 crea un elemento div
2 all'elemento div dò classe .freeze (nel CSS questa ha position absolute, top 0 left 0, colore grigino trasparente e width ed height 100%)
3 inserisco il div nel main wrapper a cui nel CSS ho dato position absolute

FUNZIONE SHOWBOMBS
1. ciclo ogni elemento della griglia da 0 al totalecelle
  1. se this.idElement è incluso nell'array bombe:
      aggiungo classe .bomb(classe che ho messo nel css e colora il div di rosso)

FUNZIONE RESET
1. Azzerare il punteggio
2. Pulire il campo con il punteggio finale H2

*/

