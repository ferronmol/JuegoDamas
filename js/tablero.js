const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Función para crear el grid
const crearGrid = () => {
  gridcontainer.style.display = "grid";
  gridcontainer.style.gridTemplateColumns = "repeat(10, 1fr)";
  gridcontainer.style.gridTemplateRows = "repeat(10, 1fr)";
  gridcontainer.style.backgroundColor = "grey";
  gridcontainer.style.width = "580px";
  gridcontainer.style.height = "580px";
  gridcontainer.style.margin = "2rem auto";
  gridcontainer.style.padding = "auto";
  gridcontainer.style.border = "4px solid white";
};

// Función para crear el tablero de 10x10 dentro del div con ID "gridcontainer"
const crearTablero = () => {
  crearGrid();
  for (let i = 0; i < letras.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
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
  casilla.style.width = "50px";
  casilla.style.height = "50px";
  casilla.style.border = "1px solid black";
  casilla.style.fontSize = "1.5rem";
  casilla.style.textAlign = "center";
  casilla.style.lineHeight = "50px";
  casilla.style.color = "blue";
};
// Función para dar estilos a las casillas, uno blanco y uno negro
function pintarTablero() {
  const casillas = document.querySelectorAll(".casilla");
  casillas.forEach((casilla, index) => {
    const fila = Math.floor(index / 10);
    if (fila % 2 === 0) {
      if (index % 2 === 0) {
        casilla.style.backgroundColor = "white";
      } else {
        casilla.style.backgroundColor = "black";
      }
    } else {
      if (index % 2 === 0) {
        casilla.style.backgroundColor = "black";
      } else {
        casilla.style.backgroundColor = "white";
      }
    }
  });
}

window.onload = () => {
  crearTablero();
  pintarTablero();
};
