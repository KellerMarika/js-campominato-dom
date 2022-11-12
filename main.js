

/************* ELEMENTI *****************/
//bottone da cui genero la griglia
const play_Btn = document.getElementById("play-btn");

//select da cui recupero i valori della funzione generateGrid al play btn click
const level_input = document.querySelector("select");


/************* VARIABILI GLOBALI ****************/
//Array delle bombe
//il suo valore lo recuper dalla funzione generateArrayOfRandomNumbers
let bombs
//numero di bombe necessarie per giocare
const bombsNumber = 16
//contatore click sulle celle
let cellClickcounter = 0
//numero massimo di celle
let totalCells_Number
//punteggio massimo(vittoria);
let maxScore
//elemento contenitore della griglia e dello score
let container_El
//elemento contenitore del punteggio finale
let scoreContainer_El

/************* FUNZIONE GENERA GRIGLIA *****************/
/**
 * funzione che utilizza il numero inserito come primo argomento per costuire una griglia quadrata
 * (RowCols_Number^seconda) .
 * essa viene creata all'interno dell'elemento che ha per selettore il valore specificato nel secondo argomento
 * @param {number} rowCells_Number numero di colonne per riga
 * @param {*} container_SelectorCSS selettore CSS del contenitore in cui generare la griglia
 */
function generateGrid(rowCells_Number, container_SelectorCSS) {

    /*Dove:*/
    //Rilevazione contenitore 
    container_El = document.querySelector(container_SelectorCSS);
    /* reset iniziale */
    container_El.innerHTML = ""
    /* Cosa: */
    //creo la griglia in cui inserirò le celle


    
  
    //classe nominale parlante: ti dice già quante celle porta per riga (come bootstrap row-cols-x)
    const grid_ElName = `grid-cells-${rowCells_Number}`;

/* invoco funzione crea elemento per generare la griglia*/

    const grid_El = createElement("div",grid_ElName, "my_b-inset");
    //aggiungo la classe d-flex perchè funzioni correttamente il flexbasis degli elementi figli
    grid_El.style.display = "flex"
    grid_El.style.flexWrap = "wrap"
  /* reset */
  grid_El.classList.add("d-none");

    //stampo la grid nell'elemento conenitore
    container_El.append(grid_El);
    //numero totale delle celle che mi servono
    totalCells_Number = Math.pow(rowCells_Number, 2);
    // console.log("totalCells_Number", totalCells_Number);


    //numero di celle che l'utente deve cliccare per vincere il gioco____________________________________________
    let winScore = totalCells_Number - bombsNumber

    //finchè i non è uguale al numero di celle totali da creare
    i = 0
    while (i < totalCells_Number) {
        //create piuttosto di innerHTML perchè così posso aggiungere degli eventi relativi all'elemento creato
        //creo la singola cella

/* invoco funzione crea elemento per generare la cella*/
//l'ultimo argomento è obbligatorio ma inutile visto che aggiungo il data set
        const cell_El = createElement("div","cell", i+1);
        cell_El.dataset.cell = i + 1
        //ora determino le dimensioni dell'elemento grazie ad un calcolo basato sul primo argomento fornito alla funzione. poi lo assegno dando uno style inlinea ad ogni elemento:
        //calc = 100% (larghezza container) / (diviso) rowCells_Number (numero di celle volute per riga)

        //le proprietà in js sono tradotte da kebab-case a camel-case
        cell_El.style.flexBasis = `calc(100% / ${rowCells_Number}`;


        /******* AGGIUNGO L'EVENTO CHECK****************************************************************************/

        /* INVOCARE UNA FUNZIONE CHE DICHIARO ALL'ESTERNO ALLEGGERISCE IL CODICE (LE FUNZIONI VENGONO RACCOLTE E ANALIZZATE PRIMA DAL SISTEMA, ASSIEME ALLE VARIABILI*/

        cell_El.addEventListener("click", checkElement);
        //adesso stampo la cel sull'html. 
        grid_El.append(cell_El);
        //solo alla fine la griglia così completata diventa visibile
        grid_El.classList.remove("d-none");

        i++
    }
}

/*** PLAY BTN *******************************/

play_Btn.addEventListener("click", function () {

    //recupero valore dall'input
    //+  converte in numero un valore (si usa al posto di parseInt)
    const userLevelChoice = +level_input.value

    //verifico il valore
    if (isNaN(userLevelChoice)) {
        alert("Effettua una scelta!");
    } else {

        //ogni volta che clicco il bottone, la posizione delle bombe deve cambiare e deve essere assegnata dinamicamente in base al numero di caselle scelto dall'utente, per questo lo facciamo dentro al play-button

        //assegno alla variabile indefinita bomb il valore della funzione generatearrayofrandomNumber , che è appunto un array di numeri casuali con lenght=16(bombsNumber)

        const totalCells_Number = Math.pow(+userLevelChoice, 2);

        /* invoco la funzione genera un array random di bombe */
        bombs = generateArrayOfRandomNumber(1, totalCells_Number, bombsNumber);
        console.log("bombs", bombs);
        let maxScore = totalCells_Number - bombs.length;

        /* invoco la funzione genera griglia */
        generateGrid(userLevelChoice, ".col-10");
        return bombs
    }
});

function checkElement() {
    if (bombs.includes(+this.dataset.cell)) {

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
        let score = cellClickcounter

        scoreTitle_El.innerText = "BOMBA!!!"
        scoreValue_El = `Hai perso, punteggio: ${cellClickcounter} / ${totalCells_Number - bombsNumber}`

        scoreContainer_El.classList.remove("d-none");
        //return score

    } else {
        console.log("NON è una bomba");
        //se non è una bomba il contatore delle celle viene decrementato
        cellClickcounter++

        console.log(cellClickcounter);
        this.classList.add("active");

        if (cellClickcounter === maxScore) {
            let score = cellClickcounter

            scoreTitle_El.innerText = "COMPLETATO!!"
            scoreValue_El = `Hai VINTO! punteggio: ${cellClickcounter} / ${totalCells_Number - bombsNumber}`

            scoreContainer_El.classList.remove("d-none");
            //return score
        }
    }

    scoreContainer_El = createElement("div", "score-container", "d-none");
    console.log(scoreContainer_El);
    scoreTitle_El = createElement("h2", "score-title", "result");
    console.log(scoreTitle_El);
    scoreValue_El = createElement("p", "score-subtitle", "percentage-value");
    console.log(scoreValue_El);


    /* creo una variabile e le assegno il valore di una funzione che crea un elemento html (punteggio) */
    //  scoreContainer_El = generateScoreContainer(); __________________________________________*/
    /* la tampo sull'html */
    // container_El.append(scoreContainer_El);___________________________________________
    //console.log(container_El);
    //console.log(generateScoreContainer());
}

/************* FUNZIONE GENERA NUMERI RANDOM *****************/
/**
 * esegue un'estrazione casuale di un numero intero compreso fra i valori passati per argomenti(compresi anchessi)
 * 
 * @param {number} minNumber è il valore minimo del range entro il quale si desidera estrarre il numero dalla funzione
 * @param {number} maxNumber è il valore massimo del range entro il quale si desidera estrarre il numero dalla funzione
 * @returns il valore di returns è compreso fra i valori minNumber e maxNumber  minNumber <=returns <=maxNumber
 */
function randomNumberOfRange(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
}

/************* FUNZIONE GENERA array di numeri random *****************/
/**
 * 
 * @param {number} minNumber valore numerico più basso che si accetta nell'array 
 * @param {number} maxNumber valore numerico più alto che si accetta nell'array 
 * @param {number} arrayLenghtNumber numero di elementi di cui si desidera comporre l'array
 * @return 
 */
function generateArrayOfRandomNumber(minNumber, maxNumber, arrayLenghtNumber) {

    //console.log(minNumber, maxNumber, arrayLenghtNumber);

    //creo un array indefinito
    const array = []
    //console.log(array);
    //comincio un ciclo while che si arresta solo quando avrà finito di reare un array di lunghezza ="arrayLenghtNumber" composto da numeri unici

    while (array.length < arrayLenghtNumber) {
        //richiamo la funzione random number che dovrebbe prendere i valori dagli argomenti
        const randomNumber = randomNumberOfRange(minNumber, maxNumber);
        //console.log(randomNumber);

        //perchè venga inserito nell'array devo controllare di non aver già inserito un numero identico nei cicli precedenti

        //se non è incluso nell'array includilo
        if (!array.includes(randomNumber)) {
            array.push(randomNumber);
        }
    }
    return array;
}

/**** FUNZIONE GENERICA CREAZIONE ELEMENTO  *************************************/
/**createElement
 * 
 * @param {string} tagEl deve contenere un tag html valido, es:"div","span","hn","p","section" ecc..
 * @param {string} class1 deve essere una stringa con "" che racchiude una classe priva di spazi
 * @param {string} class2 deve essere una stringa con "" che racchiude una classe priva di spazi
 * @returns crea un elemento di tipo tagEl con due classi. è imperativo che le classi da aggiungere all'elemento siano 2
 */
function createElement(tagEl, class1, class2) {

    const created_El = document.createElement(tagEl);
    created_El.classList.add(class1);
    created_El.classList.add(class2);
    return created_El
}








//__________________
//disattivare il click sulle altre celle se se ne becca una con la bomba (return? oppure rimozione di add event listner da tutte le altre(comprese quelle già fatte))
//scopire tutte le bombe nascoste se perdi


//TO FIX_______________________________________le celle già cliccate non devono poter essere cliccate 2 volte