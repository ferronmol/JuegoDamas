const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letras = ["H", "G", "F", "E", "D", "C", "B", "A"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];
const IDs_inicio = ["A1","C1","B2","A3","C3","B4","A5","C5","B6","A7","C7","B8","F1","H1","G2","F3","H3","G4","F5","H5","G6","F7","H7","G8"];
const casillas = document.querySelectorAll(".casilla");

// Función para crear el grid del tablero de 8x8
const crearGrid = () => {
  gridcontainer.style.display = "grid";
  gridcontainer.style.gridTemplateColumns = "repeat(8, 1fr)";
  gridcontainer.style.gridTemplateRows = "repeat(8, 1fr)";
  gridcontainer.style.backgroundColor = "grey";
  gridcontainer.style.width = "400px";
  gridcontainer.style.maxHeight = "400px";
  gridcontainer.style.margin = "2rem auto";
  gridcontainer.style.padding = "auto";
  gridcontainer.style.border = "10px solid maroon";
};

// Función para crear el tablero de 8x8 dentro del div con ID "gridcontainer"
const crearTablero = () => {
  crearGrid();
  for (let i = 0; i < numeros.length; i++) {
    for (let j = 0; j < letras.length; j++) {
      const casilla = document.createElement("div");
      const id = `${letras[i]}${numeros[j]}`;
      casilla.setAttribute("idtablero", id);
      // casilla.innerHTML = id;
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
function colocarPieza(idtablero) {
  // Encuentra la casilla con el atributo "idtablero" igual al valor de idtablero
  const casilla = document.querySelector(`[idtablero="${idtablero}"]`);

  if (casilla) {
    // Crea y agrega la ficha a la casilla con el idtablero especificado
    const pieza = document.createElement("img");
    pieza.setAttribute("id", idtablero);
    //si el idtablero tiene de letra A B o C
    if (["A","B","C"].includes(idtablero.charAt(0))){
    pieza.classList.add("piezablanca"); 
    } else {
    pieza.classList.add("piezanegra"); 
    }
    pieza.src = "./assets/imagenes/pieza.png"; // La imagen de la pieza
    casilla.appendChild(pieza);
  }
}
// Función para colocar las piezas en las casillas iniciales
function colocarPiezasIniciales() {
  IDs_inicio.forEach(id => {
    colocarPieza(id);
  });
}











window.onload = () => {
  crearTablero();
  pintarTablero();
  colocarPiezasIniciales();
};
