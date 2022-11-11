function checkElement() {

    //se il valore convertito in numero (+) del dataset.Cell assegnato all'elemento cliccato è incluso nell'elenco delle bombe
    if (bombs.includes(+this.dataset.Cell)) {
        console.log("è una bomba");

        //creo un'immagine
        const bomb_El = document.createElement("img");
        //con una gif anuimata di una bomba che esplode come src
        bomb_El.src = "/img/bomb.gif";
        bomb_El.alt = "bomb";
        //la inserisco all'interno della cella esplosa
        this.append(bomb_El);
        //diventa active perchè voglio che cambi background come le altre
        this.classList.add("active");
        //ma aggiungo la classe bomb come disclaimer.
        this.classList.add("bomb");

        alert("è una bomba!!");
        console.log("score", score);

  
    } else {
        console.log("NON è una bomba");
        //se non è una bomba il contatore delle celle viene decrementato
        this.classList.add("active");  
    }
}


const cell_El = document.createElement("div");
console.log(cell_El);

//creo classe nominale per cel el
const cell_ElName = "cell"

//ggiungo la classe cell-ElName all'elemento creato sopra cell_El
cell_El.classList.add(cell_ElName);

cell_El.dataset.cell=1;
cell_El.addEventListener("click", checkElement);

const contenitore=document.getElementById("main-container");
console.log(contenitore);
contenitore.append(cell_El); 

const bombs=[5,4,3,1,7];






/* 
function checkElement() {

    //se il valore convertito in numero (+) del dataset.Cell assegnato all'elemento cliccato è incluso nell'elenco delle bombe
    if (bombs.includes(+this.dataset.Cell)) {
        console.log(bombs);
        console.log(this.dataset.Cell, "this.dataset");

        console.log("è una bomba");
        //creo un'immagine
        const bomb_El = document.createElement("img");
        //con una gif anuimata di una bomba che esplode come src
        bomb_El.src = "/img/bomb.gif";
        bomb_El.alt = "bomb";
        //la inserisco all'interno della cella esplosa
        this.append(bomb_El);
        //diventa active perchè voglio che cambi background come le altre
        this.classList.add("active");
        //ma aggiungo la classe bomb come disclaimer.
        this.classList.add("bomb");

        // let score = cellClickcounter 

        scoreTitle_El.innerText = "BOMBA!!!"
        scorePoint_El.innerHTML = `Hai perso, punteggio: ${cellClickcounter} / ${totalCells_Number - bombsNumber}`

        scoreContainer_El.classList.remove("d-none");
        //return score

    } else {
        console.log("NON è una bomba");
        //se non è una bomba il contatore delle celle viene decrementato
        cellClickcounter++

        console.log(cellClickcounter, "counter");
        this.classList.add("active");

        if (cellClickcounter === maxScore) {
            let score = cellClickcounter

            scoreTitle_El.innerText = "COMPLETATO!!"
            scorePoint_El.innerHTML = `Hai VINTO! punteggio: ${cellClickcounter} / ${totalCells_Number - bombsNumber}`

            scoreContainer_El.classList.remove("d-none");
            //return score
        }
    }
}