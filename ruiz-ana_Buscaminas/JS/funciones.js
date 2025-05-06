/* objeto buscaminas con atributos */
const buscaminas = {
    nMinasTot: 6,
    nMinasEncontradas: 0,
    nFilas: 5,
    nColumnas: 5,
    campoMinas: []
}

/* funcion para generar la matriz del campo de minas */
function generarCampoMinas() {
    buscaminas.campoMinas = new Array(buscaminas.nFilas);

    for (let filas = 0; filas < buscaminas.nFilas; filas++) {
        buscaminas.campoMinas[filas] = new Array(buscaminas.nColumnas);
    }
}

function esparcirMinas(cantidadMinas) {
    let minasEsparcidas = 0;

    while (minasEsparcidas < buscaminas.nMinasTot) {
        let fila = Math.floor(Math.random() * buscaminas.nFilas);
        let columna = Math.floor(Math.random() * buscaminas.nColumnas);


        if (buscaminas.campoMinas[fila][columna] != "B") {
            buscaminas.campoMinas[fila][columna] = "B";
            minasEsparcidas++;
        }
    }
}


function minasAlrededor(fila, columna) {
    let minasAlrededor = 0;

    for (let i = fila - 1; i <= fila + 1; i++) {

        for (let j = columna - 1; j <= columna + 1; j++) {
            if (i >= 0 && j >= 0 && i < buscaminas.nFilas && j < buscaminas.nColumnas) {
                minasAlrededor++;

                if (buscaminas.campoMinas[i][j] == "B") {

                }
            }
        }
    }
    buscaminas.campoMinas[fila][columna] = minasAlrededor;
}


function contarMinas() {
    for (let i = 0; buscaminas.nFilas > i; i++) {
        for (let j = 0; buscaminas.nColumnas > j; i++){
            if (buscaminas.campoMinas[i][j] != "B"){
                minasAlrededor(i, j)
            }
        }
    }
}


function inicio() {
    
}
/* con esta funcion creamos las filas y columnas del tablero, con el estilo grid tocando el CSS con
querySelector */
function pintarTablero(nFilas, nColumnas) {
    document.querySelector('#tablero').style.gridTemplateColumns = "repeat(" + nColumnas + ", 25px)";
    document.querySelector('#tablero').style.gridTemplateRows = "repeat(" + nFilas + ", 25px)";
    const tablero = document.getElementById('tablero');

    for (let filas = 0; filas < nFilas; filas++) {
        for (let columnas = 0; columnas < nColumnas; columnas++) {
            const casilla = document.createElement('div');
            tablero.appendChild(casilla);
        }
    }
}






generarCampoMinas(16, 20);
pintarTablero(16, 20);
esparcirMinas();
