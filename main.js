

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
//numero massimo di celle
let totalCells_Number
//contatore click sulle celle
let cellClickcounter = 0
//punteggio massimo(vittoria) result of click button;
let maxScore
//elemento contenitore della griglia e dello score
//punteggio utente  result of click cell;
let userScore
console.log(userScore);
//elemento contenente la griglia
let container_El
//elemento contenitore del punteggio finale
let scoreContainer_El

//2 array
let allCells = [];

let allBombCells = [];


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
        /* invoco la funzione genera griglia */
        generateGrid(userLevelChoice, ".col-10");


        /* QUESTO VALORE ESCE DALLA FUNZIONE */
        maxScore = totalCells_Number - bombsNumber;
        //max score globale viene così aggiornata, e verrà utilizzata nel clickcell per stabilire il punteggio
        return maxScore
    }
});

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

    const grid_El = createElement("div", grid_ElName, "my_b-inset");
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


    //finchè i non è uguale al numero di celle totali da creare
    i = 0
    while (i < totalCells_Number) {
        //create piuttosto di innerHTML perchè così posso aggiungere degli eventi relativi all'elemento creato
        //creo la singola cella

        /* invoco funzione crea elemento per generare la cella*/
        //l'ultimo argomento è obbligatorio ma inutile visto che aggiungo il data set
        const cell_El = createElement("div", "cell", i + 1);
        cell_El.dataset.cell = i + 1



        //le proprietà in js sono tradotte da kebab-case a camel-case
        cell_El.style.flexBasis = `calc(100% / ${rowCells_Number}`;

        /******* AGGIUNGO L'EVENTO CHECK****************************************************************************/

        /* INVOCARE UNA FUNZIONE CHE DICHIARO ALL'ESTERNO ALLEGGERISCE IL CODICE (LE FUNZIONI VENGONO RACCOLTE E ANALIZZATE PRIMA DAL SISTEMA, ASSIEME ALLE VARIABILI*/

        cell_El.addEventListener("click", checkBomb);


        /* duplico l'elemento cell_element in modo da poterne inserire una copia identica in ciascuno dei seguenti array */
        cell_El_clone = cell_El.cloneNode()
        //array di tutte le celle
        allCells.push(cell_El_clone);

        if (bombs.includes(+cell_El.dataset.cell)) {

            //array delle celle con bomba

            allBombCells.push(cell_El);
            // console.log(allBombCells, "all bombs");
        }

        grid_El.append(cell_El);
        //solo alla fine la griglia così completata diventa visibile
        grid_El.classList.remove("d-none");

        i++
    }
}

/* FUNZIONE SUPREMA CONTROLLO PUNTEGGIO */
function checkBomb() {
    

    //variabile che racchiude il valore del dataset della cella cliccata
    nCell = +this.dataset.cell;
    /*     // FUNZIONE CHECK ELEMENT mette in correlazione bombs e dataset cella e ritorna un v booleano
        let isBomb = (checkElement(bombs, nCell));
        console.log(nCell, isBomb);
        console.log(maxScore)
     */
    if (bombs.includes(nCell)) {

        console.log("è una bomba HAI PERSO");
        //creo un immagine che inserisco nella cella esplosa
        const bomb_El = document.createElement("img");//___________________________________devo farmi un create img
        //con una gif anuimata di una bomba che esplode come src
        bomb_El.src = "img/bomb.gif";
        bomb_El.alt = "bomb";

        //azioni sulla cella:
        this.append(bomb_El);
        this.classList.add("active");
        //ma aggiungo la classe bomb come disclaimer.
        this.classList.add("bomb");
        //let score = cellClickcounter
        userScore = cellClickcounter
        console.log("HAI perso! bomba!! userscore= ", userScore, "cellclickcounter=", cellClickcounter);
        // return userScore

    } else {
        console.log("NON è una bomba");
        //se non è una bomba il contatore delle celle viene decrementato
        cellClickcounter++

        console.log(cellClickcounter);
        this.classList.add("active");

        if (cellClickcounter === maxScore) {

            userScore = cellClickcounter
            console.log("HAI VINTO! userscore=max score= ", userScore, "cellclickcounter=", cellClickcounter);
            //return userScore
        }
    }

    /***** FINE PARTITA ***************************/
    //se il valore di userscore viene aggiornato in funzione e non è più undefined
    if (userScore !== undefined) {
        alert("PARTITA FINITA");

        /* WHILE IN FOR (un ciclo, mille magie) */
        for (ii = 0; ii < totalCells_Number; ii++) {    
            
           // allCells.removeEventListner("click", checkBomb, false);
            //dovrebbe rimuovere la funzione click checkbomb ma non funzione_____________

                  while (ii < allBombCells.length) {
                //creo un immagine bomba di bomba inesplosa  ad ogni ciclo e la inserisco delle cell che sono bombe
                const hiddenBomb_Img = createImage("img/bomb-hidden.gif", "hidden-bomb", "hidden-bomb");
                console.log(hiddenBomb_Img);
                

                //azioni sulla cella:
                allBombCells[ii].append(hiddenBomb_Img);
                allBombCells[ii].classList.add("active");
                //ma aggiungo la classe bomb come disclaimer.
                allBombCells[ii].classList.add("bomb");
                console.log(allBombCells[ii]);
                ii++
           
            }


        }
        //DEVO DISABILITARE LE CELLE_______________________________________________________________________  */

        //funzione che crea il contenitore che mostra il punteggio personalizzato nelle if:
        generateScoreContainer();
        //se <del massimo punteggio ha perso
        if (userScore < maxScore) {
            scoreTitle_El.innerText = "BOMBA!!!"
            scoreValue_El.prepend("Hai perso!");
            //se === al massimo punteggio ha vinto
        } else if (userScore = maxScore) {
            scoreTitle_El.innerText = "COMPLETATO!!!"
            scoreValue_El.prepend("Hai VINTO!");
        }
    } 

} 
/* dove caspita me lo devo mettere il return per bloccare le celle?????! */

/****  FUNZIONE SHOW RESULT **********************************************************/


function generateScoreContainer() {
    console.log(container_El);
    scoreContainer_El = createElement("div", "score-container", "my_b-outset");
    console.log(scoreContainer_El);
    scoreTitle_El = createElement("h2", "title", "result");
    console.log(scoreTitle_El);
    scoreValue_El = createElement("p", "score-subtitle", "fw-bold");
    console.log(scoreValue_El);

    scoreValue_El.append(`punteggio: ${cellClickcounter} / ${maxScore}`);
    scoreContainer_El.append(scoreTitle_El);
    scoreContainer_El.append(scoreValue_El);
    container_El.append(scoreContainer_El);

}


/* FUNZIONE CREA IMMAGINI */



/**FUNZIONE RINTRACCIA ELEMENTO
* questa funzione controlla se all'interno di un array è presente il valore n ricercato (correlazione di inclusione) e ritorna vero o falso
* @param {array} array 
* @param {number || string} n utile con this.dataset.x!
* @returns true o false
*/
function checkElement(array, n) {
    if (array.includes(n)) {
        return true
    } else {
        return false
    }
}

/* creo una variabile e le assegno il valore di una funzione che crea un elemento html (punteggio) */
//  scoreContainer_El = generateScoreContainer(); __________________________________________*/
/* la tampo sull'html */
// container_El.append(scoreContainer_El);___________________________________________
//console.log(container_El);
//console.log(generateScoreContainer());
//}____________________________________________

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

/****  FUNZIONE CREA IMMAGINI *************************************/
/**crea un elemento di tipo Img per cui bisogna specificare src alt e classe Css
 * 
 * @param {string} srcURL dovrebbe essere l'indirizzo URL assoluto o relativo dell'immagine
 * @param {string} altDescription dovrebbe essere la descrizione dell'immagine (disabilità-- SEO++)
 * @param {string} class1 una classe CSS
 *@returns <img src=srcURL alt=altDescription class=class1>
 */
function createImage(srcURL, altDescription, class1) {

    const created_Img = document.createElement("img");
    created_Img.src = srcURL;
    created_Img.alt = altDescription;
    created_Img.classList.add(class1);
    return created_Img
}






//__________________
//disattivare il click sulle altre celle se se ne becca una con la bomba (return? si ma dove?!) oppure rimozione di add event listner da tutte le cell(non funziona?!))

//TO FIX_______________________________________le celle già cliccate non devono poter essere cliccate 2 volte
