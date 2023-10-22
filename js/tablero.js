const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numero = [1, 2, 3, 4, 5, 6, 7, 8];

// Función para crear el grid
const crearGrid = () => {
  gridcontainer.style.display = "grid";
  gridcontainer.style.gridTemplateColumns = "repeat(8, 1fr)";
  gridcontainer.style.gridTemplateRows = "repeat(8, 1fr)";
  gridcontainer.style.backgroundColor = "grey";
  gridcontainer.style.width = "464px";
  gridcontainer.style.height = "464px";
  gridcontainer.style.margin = "2rem auto";
  gridcontainer.style.padding = "auto";
  gridcontainer.style.border = "4px solid white";
};

// Función para crear el tablero dentro del div con ID "gridcontainer" de 8 por 8
const crearTablero = () => {
  crearGrid();
  // Como ya tengo creado un grid de 8 por 8, creo 64 casillas y las meto en su gridtemplate
  for (let i = 0; i < letras.length; i++) {
    for (let j = 0; j < numero.length; j++) {
      const casilla = document.createElement("div");
      const id = `${letras[i]}${numero[j]}`;
      casilla.setAttribute("id", id);
      casilla.innerHTML = id;
      gridcontainer.appendChild(casilla);
      // Le doy estilos a las casillas
      estiloCasilla(casilla);
      // Agrega un eventListener para mostrar el ID en la consola al hacer clic
      casilla.addEventListener("click", () => {
        console.log(`ID de la casilla: ${id}`);
      });
    }
  }
};

// Función para dar estilos a las casillas, uno blanco uno negro
const estiloCasilla = (casilla) => {
  casilla.style.border = "1px solid black";
  casilla.style.width = "auto";
  casilla.style.height = "56px";
  casilla.style.textAlign = "center";
  casilla.style.fontSize = "30px";
  casilla.style.fontWeight = "bold";
  casilla.style.color = "blue";
  casilla.style.display = "flex";
  casilla.style.justifyContent = "center";
  casilla.style.alignItems = "center";
};

// Cargar el tablero al cargar la página
window.onload = () => {
  crearTablero();
};
