// VARIABILI GLOBALI
btnStart = document.getElementById("start");
mainWrap = document.querySelector(".main-wrapper");
const bombsNumb = 16;
const whereBombs = [];
let scores = 5;

btnStart.addEventListener ("click", function() {
  const elemPerRow = document.getElementById("level-game").value;
  reset();
  init(elemPerRow);
})

function init(elNumb) {
  container = document.createElement("div");
  container.className = "container";
  mainWrap.append(container);
  const totalBox = Math.pow(elNumb, 2);
  for (i = 0; i < totalBox; i++) {
    createBox(i, elNumb, container);
  }
  bombsGenerator(totalBox);
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
while (!(whereBombs.length === 16)){
  let randomNumb = Math.ceil(Math.random() * max);
  if (!whereBombs.includes(randomNumb)) {
      whereBombs.push(randomNumb);
    }
  }
  console.log(whereBombs);
}

function clickBox(event){
  console.log("Cella cliccata numero: " + this.idElement); 
  this.classList.add("change");
}

function reset() {
  scores = 0;
  document.querySelector(".welcome").innerText = "";
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

