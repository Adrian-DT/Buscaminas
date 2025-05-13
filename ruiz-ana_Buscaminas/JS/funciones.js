const buscaminas = {
    nMinasTot: 0,
    nMinasEncontradas: 0,
    nFilas: 0,
    nColumnas: 0,
    campoMinas: []
}

function pintarTablero(nFilas,nColumnas){
    const tablero = document.querySelector("#tablero");
    tablero.style.gridTemplateColumns = "repeat("+nColumnas+",25px)";
    tablero.style.gridTemplateRows = "repeat("+nFilas+",25px)";

    for(let i=0;i<nColumnas;i++){
        for(let j=0;j<nFilas;j++){
            const casilla = document.createElement('div');
            casilla.setAttribute("id","F" + i + "C" + j);
            casilla.addEventListener("contextmenu",marcar);
            casilla.addEventListener("click",destapar);
            tablero.appendChild(casilla);
        }
    }
}

function generarCampoMinas() {
    buscaminas.campoMinas = new Array(buscaminas.nFilas);

    for (let filas = 0; filas < buscaminas.nFilas; filas++) {
        buscaminas.campoMinas[filas] = new Array(buscaminas.nColumnas);
    }
}

function esparcirMinas(cantidadMinas) {
    let minas = 0;

    while (minas < buscaminas.nMinasTot) {
        let fila = Math.floor(Math.random() * buscaminas.nFilas);
        let columna = Math.floor(Math.random() * buscaminas.nColumnas);


        if (buscaminas.campoMinas[fila][columna] != "B") {
            buscaminas.campoMinas[fila][columna] = "B";
            minas++;
        }
    }
}

function minasAlrededor(fila, columna) {
    let nMinasAlrededor = 0;

    for (let i = fila - 1; i <= fila + 1; i++) {

        for (let j = columna - 1; j <= columna + 1; j++) {
            if (i >= 0 && j >= 0 && i < buscaminas.nFilas && j < buscaminas.nColumnas) {
                nMinasAlrededor++;

                if (buscaminas.campoMinas[i][j] == "B") {

                }
            }
        }
    }
    buscaminas.campoMinas[fila][columna] = nMinasAlrededor;
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

function destaparCasilla(fila, columna){
    if (fila >= 0 && fila < buscaminas.nFilas && columna >= 0 && columna < buscaminas.nColumnas){
        let casilla = document.getElementById("F" + fila + "C" + columna);
        if (!casilla.classList.contains("destapado")){
            if (!casilla.innerHTML.includes('<img class="bandera"')){
                casilla.classList.add("destapado");
            }
              casilla.innerHTML = buscaminas.campoMinas[fila][columna];
            casilla.classList.add("c" + buscaminas.campoMinas[fila][columna])

             if(buscaminas.campoMinas[fila][columna] !== "B"){
                if(buscaminas.campoMinas[fila][columna] == 0){
                    destaparCasilla(fila-1,columna-1);
                    destaparCasilla(fila-1,columna);
                    destaparCasilla(fila-1,columna+1);
                    destaparCasilla(fila,columna-1);
                    destaparCasilla(fila,columna);
                    destaparCasilla(fila+1,columna-1);
                    destaparCasilla(fila+1,columna);
                    destaparCasilla(fila+1,columna+1);
                    
                    casilla.innerHTML = "";
                }
            } else {
                casilla.innerHTML = '<img class="explosion" src="IMAGENES/icons/explosion.png">'
            }
        }
    }
}

function inicio() {
    let dificultad = 0;
    do{
        dificultad = prompt("Introduce la dificultad. 1:Fácil  2:Medio  3:Difícil");
        dificultad = Number(dificultad);
    } while(isNaN(dificultad) || !Number.isInteger(dificultad) || dificultad < 1 || dificultad > 3);
    
    switch (dificultad){
        case 1:
            buscaminas.nMinasTot = 10;
            buscaminas.nColumnas = 8;
            buscaminas.nFilas = 8;
        break;
        case 2:
            buscaminas.nMinasTot = 40;
            buscaminas.nColumnas = 16;
            buscaminas.nFilas = 16;
        break;
        case 3:
            buscaminas.nMinasTot = 99;
            buscaminas.nFilas = 16;
            buscaminas.nColumnas = 30;
        break;
    }
    pintarTablero(buscaminas.nFilas,buscaminas.nColumnas);
    generarCampoMinas();
    esparcirMinas();
    contarMinas();
}

function marcar(e){
    e.preventDefault();
    console.log("Has marcado la casilla " + e.target.id);
}

function destapar(e){
    console.log("Has destapado la casilla " + e.target.id);

    let casilla = e.currentTarget;
    let fila;
    let columna;
     if(casilla.id[2] == "C"){
        fila = casilla.id[1];
        columna = casilla.id.slice(3);
    } else {
        fila = casilla.id.slice(1,3);
        columna = casilla.id.slice(4);
    }
    fila = Number(fila);
    columna = Number(columna);

     destaparCasilla(fila, columna);
}

window.onload = inicio();
