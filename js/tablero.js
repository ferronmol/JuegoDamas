const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letras = ["H", "G", "F", "E", "D", "C", "B", "A"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8];
const IDs_inicio = ["A1","C1","B2","A3","C3","B4","A5","C5","B6","A7","C7","B8","F1","H1","G2","F3","H3","G4","F5","H5","G6","F7","H7","G8"];
const casillas = document.querySelectorAll(".casilla");
const idpieza=""; //todas las piezas tienen un idpieza que es su id. total 24 idpiezas posibles
const idtablero=""; //todas las casillas tienen un idtablero que es su id.total 64 idtableros posibles
let estado=""; //estado de la casilla: vacia, con_pieza_blanca, con_pieza_negra, reina_blanca, reina_negra



// Función para crear el grid del tablero de 8x8
const crearGrid = () => {
  gridcontainer.style.display = "grid";
  gridcontainer.style.gridTemplateColumns = "repeat(8, 1fr)";
  gridcontainer.style.gridTemplateRows = "repeat(8, 1fr)";
  gridcontainer.style.backgroundColor = "grey";
  gridcontainer.style.width = "400px";
  gridcontainer.style.maxHeight = "400px";
  gridcontainer.style.margin = "0 auto";
  gridcontainer.style.padding = "auto";
  gridcontainer.style.border = "10px solid maroon";
};

// Función para crear el tablero de 8x8 dentro del div con ID "gridcontainer"
const crearTablero = () => {
  crearGrid();
  for (let i = 0; i < numeros.length; i++) {
    for (let j = 0; j < letras.length; j++) {
      const casilla = document.createElement("div");
      const idtablero = `${letras[i]}${numeros[j]}`;
      casilla.setAttribute("idtablero", idtablero);
      casilla.setAttribute("estado", "vacia");
      // casilla.innerHTML = id; ya no necesito mostrar el id de la casilla
      casilla.classList.add("casilla");
      gridcontainer.appendChild(casilla);
      estiloCasilla(casilla);    
    }
  }
};
// Función para dar estilos a las casillas
const estiloCasilla = (casilla) => {
  casilla.style.width = "50px";
  casilla.style.height = "50px";
  casilla.style.fontSize = "1rem";
  casilla.style.textAlign = "center";
  casilla.style.lineHeight = "50px"; //
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
// Función para colocar las piezas en las casillas iniciales
function colocarPiezasIniciales() {
  IDs_inicio.forEach((id) => {
    colocarPieza(id);
  });
}

function colocarPieza(idtablero) { //
  // Encuentra la casilla con el atributo "idtablero" igual al valor de idtablero
  const casilla = document.querySelector(`[idtablero="${idtablero}"]`);
  if (casilla) {
    // Crea y agrega la ficha a la casilla con el idtablero especificado
    const pieza = document.createElement("img");
    
    //si el idtablero tiene de letra A B o C
    if (["A","B","C"].includes(idtablero.charAt(0))){
    pieza.classList.add("piezablanca");
    //cambio estado de casilla
    casilla.setAttribute("estado", "con_pieza_blanca");
    } else {
    pieza.classList.add("piezanegra"); 
    //cambio estado de casilla
    casilla.setAttribute("estado", "con_pieza_negra");
    }
    pieza.src = "./assets/imagenes/pieza.png"; // La imagen de la pieza
    casilla.appendChild(pieza); // Agrega la pieza a la casilla 
  }
}
// Función para verificar el estado de las piezas
function estadoPieza(pieza) {
  casillas.forEach(casilla => {
    //si la casilla tiene una pieza
    if (casilla.hasChildNodes()) {
      //si la pieza es blanca
      if (pieza.classList.contains("piezablanca")) {
        casilla.setAttribute("estado", "con_pieza_blanca");
      } else {
        casilla.setAttribute("estado", "con_pieza_negra");
      }
    } else {
      casilla.setAttribute("estado", "vacia");
    }
});
}

// Función para verificar el estado de las casillas y muestre cual tiene una pieza y cual no
function infoTablero() {
  const casillas = document.querySelectorAll(".casilla");
  casillas.forEach(casilla => {
    const estado = casilla.getAttribute("estado");
    console.log(`La casilla ${casilla.getAttribute("idtablero")} tiene el estado: ${estado}`);
  });
}







//----------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  crearTablero();
  pintarTablero();
  colocarPiezasIniciales();
  
  // // Para verificar el estado de las casillas y las piezas:
  // infoTablero(); 
  // const piezas = document.querySelectorAll(".ficha");
  // piezas.forEach(pieza => {
  //   estadoPieza(pieza); // Muestra el estado de cada pieza
  //   // Muestra el estado de las casillas
  // });
});

// si dentro de mi gridcontainer hago click en una casilla me muestra su id
gridcontainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("casilla")) {
    console.log(e.target.getAttribute("idtablero") + " " + e.target.getAttribute("estado"));
  }
});
