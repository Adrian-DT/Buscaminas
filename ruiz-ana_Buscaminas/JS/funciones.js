const buscaminas = {
    nMinasTot: 0,
    nMinasEncontradas: 0,
    nFilas: 0,
    nColumnas: 0,
    campoMinas: []
}

function pintarTablero(nFilas, nColumnas) {
    const tablero = document.querySelector("#tablero");
    tablero.style.gridTemplateColumns = "repeat(" + nColumnas + ",25px)";
    tablero.style.gridTemplateRows = "repeat(" + nFilas + ",25px)";

    for (let i = 0; i < nFilas; i++) {
        for (let j = 0; j < nColumnas; j++) {
            const casilla = document.createElement('div');
            casilla.setAttribute("id", "F" + i + "C" + j);
            casilla.addEventListener("contextmenu", marcar);
            casilla.addEventListener("click", destapar);
            tablero.appendChild(casilla);
        }
    }
}

function generarCampoMinas() {
    buscaminas.campoMinas = new Array(buscaminas.nFilas);

    for (let i = 0; i < buscaminas.nFilas; i++) {
        buscaminas.campoMinas[i] = new Array(buscaminas.nColumnas);
    }
}

function esparcirMinas() {
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
            if (i >= 0 && i < buscaminas.nFilas && j >= 0 && j < buscaminas.nColumnas) {
                if (buscaminas.campoMinas[i][j] == "B") {
                    nMinasAlrededor++;
                }
            }
        }
    }
    buscaminas.campoMinas[fila][columna] = nMinasAlrededor;
}

function contarMinas() {
    for (let i = 0; i < buscaminas.nFilas; i++) {
        for (let j = 0; j < buscaminas.nColumnas; j++) {
            if (buscaminas.campoMinas[i][j] != "B") {
                minasAlrededor(i, j);
            }
        }
    }
}

function destaparCasilla(fila, columna) {
    if (fila >= 0 && fila < buscaminas.nFilas && columna >= 0 && columna < buscaminas.nColumnas) {
        let casilla = document.getElementById("F" + fila + "C" + columna);
        if (!casilla.classList.contains("destapado")) {
            if (!casilla.innerHTML.includes('<img class="bandera"')) {
                casilla.classList.add("destapado");

            }
            casilla.innerHTML = buscaminas.campoMinas[fila][columna];

            casilla.classList.add("c" + buscaminas.campoMinas[fila][columna])

            if (buscaminas.campoMinas[fila][columna] !== "B") {
                if (buscaminas.campoMinas[fila][columna] == 0) {
                    destaparCasilla(fila - 1, columna - 1);
                    destaparCasilla(fila - 1, columna);
                    destaparCasilla(fila - 1, columna + 1);
                    destaparCasilla(fila, columna - 1);
                    // destaparCasilla(fila, columna);
                    destaparCasilla(fila + 1, columna - 1);
                    destaparCasilla(fila + 1, columna);
                    destaparCasilla(fila + 1, columna + 1);

                    casilla.innerHTML = "";
                }
            } else {
                casilla.innerHTML = '<img class="explosion" src="IMAGENES/icons/explosion.png">'

                resolverTablero(false);
            }

        }
    }
}

function inicio() {
    let dificultad = 0;
    let parrafo = document.querySelector('#parrafo')
    do {
        dificultad = prompt("Introduce la dificultad. 1:Fácil  2:Medio  3:Difícil");
        dificultad = Number(dificultad);
    } while (isNaN(dificultad) || !Number.isInteger(dificultad) || dificultad < 1 || dificultad > 3);

    switch (dificultad) {
        case 1:
            buscaminas.nMinasTot = 10;
            buscaminas.nColumnas = 8;
            buscaminas.nFilas = 8;
            parrafo.innerHTML += `Fácil<br>Número de minas: ${buscaminas.nMinasTot}`;
            break;
        case 2:
            buscaminas.nMinasTot = 40;
            buscaminas.nColumnas = 16;
            buscaminas.nFilas = 16;
            parrafo.innerHTML += `Media<br>Número de minas: ${buscaminas.nMinasTot}`;
            break;
        case 3:
            buscaminas.nMinasTot = 99;
            buscaminas.nFilas = 16;
            buscaminas.nColumnas = 30;
            parrafo.innerHTML += `Difícil<br>Número de minas: ${buscaminas.nMinasTot}`;
            break;
    }
    pintarTablero(buscaminas.nFilas, buscaminas.nColumnas);
    generarCampoMinas();
    esparcirMinas();
    contarMinas();
}

function resolverTablero(resultado) {
    let casillas = document.querySelector('#tablero').children;

    for (let i = 0; i < casillas.length; i++) {
        casillas[i].removeEventListener("click", destapar);
        casillas[i].removeEventListener("contextmenu", marcar);

        let fila;
        let columna;
        if (casillas[i].id[2] == "C") {
            fila = casillas[i].id[1];
            columna = casillas[i].id.slice(3);
        } else {
            fila = casillas[i].id.slice(1, 3);
            columna = casillas[i].id.slice(4);
        }

        fila = Number(fila);
        columna = Number(columna);

        if (casillas[i].innerHTML.includes('<img class="bandera"')) {
            casillas[i].classList.add("destapado");
            if (buscaminas.campoMinas[fila][columna] == "B") {
                casillas[i].innerHTML = '<img class="bomba" src="IMAGENES/icons/bomba.png">';
            } else {
                casillas[i].innerHTML = '<img class="banderaMal" src="IMAGENES/icons/banderaMal.png">';
                buscaminas.nMinasEncontradas++;
                resultado = false;
            }
        } else if (!casillas[i].classList.contains("destapado")) {
            if (buscaminas.campoMinas[fila][columna] == "B") {
                casillas[i].classList.add("destapado");
                casillas[i].innerHTML = '<img class="bomba" src="IMAGENES/icons/bomba.png">';
            }
        }
    }

    if (resultado) {
        document.querySelector('#resultado').innerHTML = `¡Felicidades, has ganado!`
        alert("¡FELICIDADES, HAS GANADO!")
    } else {
        document.querySelector('#resultado').innerHTML = `¡Has encontrado ${buscaminas.nMinasEncontradas} minas!`
    }
}


    function marcar(e) {
        e.preventDefault();
        console.log("Has marcado la casilla " + e.target.id);

        let casilla = e.currentTarget

        if (casilla.innerHTML.includes('<img class="bandera')) {
            casilla.innerHTML = '<img class="duda" src="IMAGENES/icons/interrogacion.png">'
            // buscaminas.nMinasEncontradas--;
        } else if (casilla.innerHTML.includes('<img class="duda')) {
            casilla.innerHTML = "";
        } else {
            casilla.innerHTML = '<img class="bandera" src="IMAGENES/icons/bandera.png">'
            // buscaminas.nMinasEncontradas++;
        }

        if (buscaminas.nMinasEncontradas == buscaminas.nMinasTot) {
            resolverTablero(true);
        }
    }

    function destapar(e) {
        console.log("Has destapado la casilla " + e.target.id);

        let casilla = e.currentTarget;

        let fila;
        let columna;
        if (casilla.id[2] == "C") {
            fila = casilla.id[1];
            columna = casilla.id.slice(3);
        } else {
            fila = casilla.id.slice(1, 3);
            columna = casilla.id.slice(4);
        }

        fila = Number(fila);
        columna = Number(columna);

        destaparCasilla(fila, columna);

        document.querySelector('#reiniciar').style.display = "block";
    }

document.querySelector('#reiniciar').addEventListener('click', () => {
    location.reload();
});

    window.onload = inicio();
