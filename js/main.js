

/************* ELEMENTI *****************/
//bottone da cui genero la griglia
const play_Btn = document.getElementById("play-btn");
console.log(play_Btn);

//select da cui recupero i valori della funzione generateGrid al play btn click
const level_input = document.querySelector("select");
console.log(level_input);


/************* VARIABILI ****************/


//const level_input.value________in play btn click f

/************* FUNZIONE GENERA GRIGLIA *****************/

/**
 * funzione che utilizza il numero inserito come primo argomento per costuire una griglia quadrata
 * (RowCols_Number^seconda) .
 * essa viene creata all'interno dell'elemento che ha per selettore il valore specificato nel secondo argomento
 * @param {number} rowCells_Number numero di colonne per riga
 * @param {*} container_SelectorCSS selettore CSS del contenitore in cui generare la griglia
 */
function generateGrid(rowCells_Number, container_SelectorCSS) {

    /* prima di tutto  */
    //recupero gli elementi che mi servono


    /*Dove:*/
    //Rilevazione contenitore 
    //creo una variabile che ha al suo interno l'elemento che ha per selettore css il valore espresso nel secondo argomento della funzione
    const container_El = document.querySelector(container_SelectorCSS);
    console.log("container_El", container_El);

    //______________________________________________________controllo sulla validità dell'elemento

    /* reset iniziale */
    container_El.innerHTML = ""


    /* Cosa: */
    //creo la griglia in cui inserirò le celle
    const grid_El = document.createElement("div");
    //console.log(grid_El);

    /* reset */
    grid_El.classList.add("d-none");

    //classe nominale parlante: ti dice già quante celle porta per riga (come bootstrap row-cols-x)
    const grid_ElName = `grid-cells-${rowCells_Number}`;

    grid_El.classList.add(grid_ElName);

    //aggiungo la classe d-flex perchè funzioni correttamente il flexbasis degli elementi figli

    //in questo modo ho pieno controllo sul corretto funzionamento della struttura che andrò a creare, perchè noin dipende da elementi esterni

    //perchè funzioni correttamente il flexbasis delle celle occorre che l'elemento genitore in cui andrò ad inserire le celle abbia il display flex, ma lo faccio fuori dal ciclo ;
    grid_El.style.display = "flex"
    grid_El.style.flexWrap = "wrap"
    grid_El.classList.add("my_b-inset")

    //stampo la grid nell'elemento conenitori di cui abbiamo fornito il selettore css nell'argomento della funzione
    container_El.append(grid_El);

    //recupero i valori che mi servono

    /* come */
    //______________________________________________________controllo sulla validità del numero inserito
    //numero totale delle celle che mi servono
    const totalCells_Number = Math.pow(rowCells_Number, 2);
    console.log("totalCells_Number", totalCells_Number);

    //ciclo di creazione (perchè non while?)
    //finchè i non è uguale al numero di celle totali da creare
    i = 0
    while (i < totalCells_Number) {
        console.log(i)

        //create piuttosto di innerHTML perchè così posso aggiungere degli eventi relativi all'elemento creato
        //creo la singola cella
        const cell_El = document.createElement("div");
        console.log(cell_El);

        //creo classe nominale per cel el
        const cell_ElName = `cell`
        //ggiungo la classe cell-ElName all'elemento creato sopra cell_El
        cell_El.classList.add(cell_ElName);


        //la prossima volta utilizzo il dataset per avere un riferimento numerico privato degli elementi creati
        cell_El.dataset.Cell = i + 1
        //ora determino le dimensioni dell'elemento grazie ad un calcolo basato sul primo argomento fornito alla funzione. poi lo assegno dando uno style inlinea ad ogni elemento:
        //calc = 100% (larghezza container) / (diviso) rowCells_Number (numero di celle volute per riga)

        //le proprietà in js sono tradotte da kebab-case a camel-case
        cell_El.style.flexBasis = `calc(100% / ${rowCells_Number}`;


        /*rimozxione dal progetto
                //Ogni cella  contiene ha un numero progressivo, da 1 a totalCells_Number
             cell_El.append(i + 1); */

        /* devo aggiungere l'evento */
        cell_El.addEventListener("click", function () {

            //con this, faccio riferimento all'elemento scatenante della funzione in cui è locato(this)
            //uin questo caso si riferisce a cell_El.
            //per mezzo di ciò sarà possibile  attribuire a tutte le cell del ciclo delle proprietà dinamiche 

            //ora per tutte le mie celle, se clicco diventano azzurre________________________________anche classe personalizzata
            this.classList.add("active");

        });

        //adesso stampo la cel sull'html. 
        //ad ogni ciclo ne innesto una nella grid che abbiamo innestato nel container 
        grid_El.append(cell_El);

        //solo alla fine la griglia così completata diventa visibile
        grid_El.classList.remove("d-none");

        i++
    }
    console.log(this, "this in generateGrid");
}


/*** PLAY BTN *******************************/

play_Btn.addEventListener("click", function () {


    const userLevelChoice = parseInt(level_input.value)
    console.log(userLevelChoice);

    if (isNaN(userLevelChoice)) {
        alert("Effettua una scelta!")
    } else {
        generateGrid(userLevelChoice, ".col-10");
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    PARTE 2                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/************* FUNZIONE GENERA NUMERI RANDOM *****************/
/**
 * esegue un'estrazione casuale di un numero intero compreso fra i valori passati per argomenti(compresi anchessi)
 * 
 * @param {number} minNumber è il valore minimo del range entro il quale si desidera estrarre il numero dalla funzione
 * @param {number} maxNumber è il valore massimo del range entro il quale si desidera estrarre il numero dalla funzione
 * @returns il valore di returns è compreso fra i valori minNumber e maxNumber  minNumber <=returns <=maxNumber
 */
function randomNumberOfRange(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
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

    //creo un array indefinito
    let array = []
    console.log(array)
    //comincio un ciclo while che si arresta solo quando avrà finito di reare un array di lunghezza ="arrayLenghtNumber" composto da numeri unici

    while (array.length === arrayLenghtNumber) {
        //richiamo la funzione random number che dovrebbe prendere i valori dagli argomenti
        const randomNumber = randomNumberOfRange(minNumber, maxNumber);

        //perchè venga inserito nell'array devo controllare di non aver già inserito un numero identico nei cicli precedenti

        if(!array.includes(randomNumber)){
            array.push(randomNumber);
        }

    }


}
let mammolo = generateArrayOfRandomNumber(1, 100, 16);
console.log(mammolo)
console.log(randomNumberOfRange);
/* cosa devo fare? */
//funzione generica genera tot numeri casuali e li racchiude in un array
//f generate random number array (minNumber, maxNumber, resultArray.lenghtNumber)
//dentro al play button che genera la griglia in base al valore della select raccolto:
///assegno il risultato della funzione all'array globale undefined bombe bombs_list = generate random number array (1, totalCells_Number, 16);
//funzione generica find element (array da controllare(bombs))
//che scateno al clic sulle singole celle cell.add event listner (click, find element) se si aggiungi classe magica bomba

//aggiungere un contatore esterno che si aggiorna nella funzine click cell solo se non è bomb e che a fine partita comunichi attraverso funzioni di calcolo il risultato al giocatore (in base a quante caselle fatte e quante mancanti valutazione soggettiva. se le ha fatte tutte mega premio);


//__________________
//disattivare il click sulle altre celle se se ne becca una con la bomba (return? oppure rimozione di add event listner da tutte le altre(comprese quelle già fatte))
//scopire tutte le bombe nascoste se perdi





/* correzioni */

//correzione allinterno della funzione genera griglia, cell.addevent listner scatena la funzione controllo se bomba