const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letters = ["H", "G", "F", "E", "D", "C", "B", "A"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const startingIDs = ["A1","C1","B2","A3","C3","B4","A5","C5","B6","A7","C7","B8","F1","H1","G2","F3","H3","G4","F5","H5","G6","F7","H7","G8"];
const squares = document.querySelectorAll(".squares");
const pieceID=""; //todas las piezas tienen un idpieza que es su id. total 24 idpiezas posibles
const boardID=""; //todas las casillas tienen un idtablero que es su id.total 64 idtableros posibles
let state=""; //estado de la casilla: vacia, con_pieza_blanca, con_pieza_negra, reina_blanca, reina_negra


// Function for create 8x8 grid
const createGrid = () => {
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
const createBoard = () => {
  createGrid();
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      const square = document.createElement("div");
      const boardID = `${letters[i]}${numbers[j]}`;
      square.setAttribute("boardID",boardID);
      square.setAttribute("state", "empty");
      square.classList.add("squares");
      gridcontainer.appendChild(square);
      squareStyle(square);    
    }
  }
};
// Función para dar estilos a las casillas
const squareStyle = (square) => {
  square.style.width = "50px";
  square.style.height = "50px";
  square.style.fontSize = "1rem";
  square.style.textAlign = "center";
  square.style.lineHeight = "50px"; //
};
// Función para dar estilos a las casillas, uno blanco y uno negro
function paintBoard() {
  const squares = document.querySelectorAll(".squares");
  squares.forEach((square, index) => {
    const row = Math.floor(index / 8);
    if ((row % 2 === 0 && index % 2 === 0) || (row % 2 === 1 && index % 2 === 1)) {
      square.style.backgroundColor = "white";  
    } else {    
      square.style.backgroundColor = "black";
    }
  });
}
// Función para colocar las piezas en las casillas iniciales
function placeInitialPieces() {
  startingIDs.forEach((id) => {
    placePiece(id);
  });
}

function placePiece(boardID) { //
  // Encuentra la casilla con el atributo "idtablero" igual al valor de idtablero
  const square = document.querySelector(`[boardID="${boardID}"]`);
  if (square) {
    // Crea y agrega la ficha a la casilla con el idtablero especificado
    const piece = document.createElement("img");
    
    //si el idtablero tiene de letra A B o C
    if (["A","B","C"].includes(boardID.charAt(0))){
    piece.classList.add("whitepieces");
    //cambio estado de casilla
    square.setAttribute("state", "whitepiece");
    } else {
    piece.classList.add("blackpieces"); 
    //cambio estado de casilla
    square.setAttribute("state", "blackpiece");
    }
    piece.src = "./assets/images/piece.png"; // La imagen de la pieza
    square.appendChild(piece); // Agrega la pieza a la casilla 
  }
}
// Función para verificar el estado de las piezas
function statePiece(piece) {
  square.forEach(square => {
    //si la casilla tiene una pieza
    if (square.hasChildNodes()) {
      //si la pieza es blanca
      if (piece.classList.contains("whitepieces")) {
        square.setAttribute("state", "whitepiece");
      } else {
        square.setAttribute("state", "blackpiece");
      }
    } else {
      square.setAttribute("state", "empty");
    }
});
}

// Función para verificar el estado de las casillas y muestre cual tiene una pieza y cual no
function infoBoard() {
  const squares = document.querySelectorAll(".squares");
  squares.forEach(square => {
    const state = square.getAttribute("state");
    console.log(`The square ${square.getAttribute("boardID")} has the state: ${state}`);
  });
}


//----------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  paintBoard();
  placeInitialPieces();
  //infoBoard(); 
});

// si dentro de mi gridcontainer hago click en una casilla o su children (img) mostrar estado de la casilla
gridcontainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("squares")) {   
    console.log("The ID " + e.target.getAttribute("boardID") + " has " + e.target.getAttribute("state"));
  }
  //si tiene cualquier etiqueta img  dentro  de la casilla
  if (e.target.tagName === "IMG") {
    //muestra el estado de la casilla usando parentNode que es el nodo padre
    console.log("The ID " + e.target.parentNode.getAttribute("boardID") + " has " + e.target.parentNode.getAttribute("state"));
    //llamo a la funcion selectPiece y le pasa la pieza ha sido seleccionada
    let piece = e.target.parentNode;
    selectPiece(piece);
  }
});







