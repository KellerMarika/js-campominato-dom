

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
        const cell_ElName = `cell-${i + 1}`
        //ggiungo la classe cell-ElName all'elemento creato sopra cell_El
        cell_El.classList.add(cell_ElName);

        //ora determino le dimensioni dell'elemento grazie ad un calcolo basato sul primo argomento fornito alla funzione. poi lo assegno dando uno style inlinea ad ogni elemento:
        //calc = 100% (larghezza container) / (diviso) rowCells_Number (numero di celle volute per riga)

        //le proprietà in js sono tradotte da kebab-case a camel-case
        cell_El.style.flexBasis = `calc(100% / ${rowCells_Number}`;
        //Ogni cella  contiene ha un numero progressivo, da 1 a totalCells_Number
        cell_El.append(i + 1);

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


