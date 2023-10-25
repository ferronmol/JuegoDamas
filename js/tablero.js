const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letras = ["H", "G", "F", "E", "D", "C", "B", "A"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];

// Función para crear el grid
const crearGrid = () => {
  gridcontainer.style.display = "grid";
  gridcontainer.style.gridTemplateColumns = "repeat(8, 1fr)";
  gridcontainer.style.gridTemplateRows = "repeat(8, 1fr)";
  gridcontainer.style.backgroundColor = "grey";
  gridcontainer.style.width = "600px";
  gridcontainer.style.height = "600px";
  gridcontainer.style.margin = "2rem auto";
  gridcontainer.style.padding = "auto";
  gridcontainer.style.border = "10px solid maroon";
};

// Función para crear el tablero de 10x10 dentro del div con ID "gridcontainer"
const crearTablero = () => {
  crearGrid();
  for (let i = 0; i < numeros.length; i++) {
    for (let j = 0; j < letras.length; j++) {
      const casilla = document.createElement("div");
      const id = `${letras[i]}${numeros[j]}`;
      casilla.setAttribute("id", id);
      casilla.innerHTML = id;
      casilla.classList.add("casilla");
      gridcontainer.appendChild(casilla);
      estiloCasilla(casilla);
      casilla.addEventListener("click", () => {
        console.log(`ID de la casilla: ${id}`);
      });
    }
  }
};

// Función para dar estilos a las casillas
const estiloCasilla = (casilla) => {
  casilla.style.width = "75px";
  casilla.style.height = "75px";
  casilla.style.fontSize = "1.5rem";
  casilla.style.textAlign = "center";
  casilla.style.lineHeight = "50px"; //
  casilla.style.color = "blue";
};
// Función para dar estilos a las casillas, uno blanco y uno negro
function pintarTablero() {
  const casillas = document.querySelectorAll(".casilla");
  casillas.forEach((casilla, index) => {
    const fila = Math.floor(index / 8);
    if ((fila % 2 === 0 && index % 2 === 0) || (fila % 2 === 1 && index % 2 === 1)) {
      casilla.style.backgroundColor = "white";
    } else {
      casilla.style.backgroundColor = "black";
    }
  });
}
//funcion para colocar las fichas
//primero creo las fichas

const ficha= ""

window.onload = () => {
  crearTablero();
  pintarTablero();
  colocarFichas();
};
