const visor = document.getElementById("visor");
const gridcontainer = document.getElementById("gridcontainer");
const letters = ["H", "G", "F", "E", "D", "C", "B", "A"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const startingIDs = [
  "A1",
  "C1",
  "B2",
  "A3",
  "C3",
  "B4",
  "A5",
  "C5",
  "B6",
  "A7",
  "C7",
  "B8",
  "G1",
  "F2",
  "H2",
  "G3",
  "F4",
  "H4",
  "G5",
  "F6",
  "H6",
  "G7",
  "F8",
  "H8",
];
const squares = document.querySelectorAll(".squares");
const pieceID = ""; //todas las piezas tienen un idpieza que es su id. total 24 idpiezas posibles
const boardID = ""; //todas las casillas tienen un idtablero que es su id.total 64 idtableros posibles
let state = ""; //estado de la casilla: vacia, con_pieza_blanca, con_pieza_negra, reina_blanca, reina_negra
const validBoard = []; //array que contiene todas las casillas del tablero
const validMovesBoard = []; //array con las casillas negras, unicas donde se pueden mover las piezas
const emptyBoard = []; //array con las casillas vacias

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
      square.setAttribute("boardID", boardID);
      square.setAttribute("state", "empty");
      square.setAttribute("color", "black");
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
    if (
      (row % 2 === 0 && index % 2 === 0) ||
      (row % 2 === 1 && index % 2 === 1)
    ) {
      square.style.backgroundColor = "white";
      square.setAttribute("color", "white");
    } else {
      square.style.backgroundColor = "black";
      square.setAttribute("color", "black");
    }
  });
}
// Función para colocar las piezas en las casillas iniciales
function placeInitialPieces() {
  startingIDs.forEach((id) => {
    placePiece(id);
  });
}

function placePiece(boardID) {
  //
  // Encuentra la casilla con el atributo "idtablero" igual al valor de idtablero
  const square = document.querySelector(`[boardID="${boardID}"]`);
  if (square) {
    // Crea y agrega la ficha a la casilla con el idtablero especificado
    const piece = document.createElement("img");

    //si el idtablero tiene de letra A B o C
    if (["A", "B", "C"].includes(boardID.charAt(0))) {
      piece.classList.add("whitepieces"); //añado  a la pieza la clase css whitepieces

      //cambio estado de casilla
      square.setAttribute("state", "whitepiece"); //añado a la casilla el estado whitepiece
    } else {
      piece.classList.add("blackpieces");
      //cambio estado de casilla
      square.setAttribute("state", "blackpiece");
    }
    piece.src = "./assets/images/piece.png"; // La imagen de la pieza
    piece.setAttribute("pieceID", boardID); // Asigno el idpieza a la pieza que sera igual al idtablero
    square.appendChild(piece); // Agrega la pieza a la casilla
  }
}

// Función para verificar el estado de las casillas y devuelve un array que  muestre cual tiene una pieza y cual no
function infoBoard() {
  const squares = document.querySelectorAll(".squares");
  squares.forEach((square) => {
    const state = square.getAttribute("state");
    const color = square.getAttribute("color")
    // console.log(`The square ${square.getAttribute("boardID")} has the state: ${state}`);
   
    //las casillas con el estado vacia en el array emptyBoard
    if (state == "empty") {
      emptyBoard.push(square.getAttribute("boardID"));
    } 
    if (color == "black") {
      validMovesBoard.push(square.getAttribute("boardID")); //las casillas negro  en validMovesBoard
    }
    validBoard.push(square.getAttribute("boardID"));
  });
}

//----------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  paintBoard();
  placeInitialPieces();
  infoBoard();
});

// si dentro de mi gridcontainer hago click en una casilla o su children (img) mostrar estado de la casilla
gridcontainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("squares")) {
    console.log(
      "The boardID: " +
        e.target.getAttribute("boardID") +
        " has state: " +
        e.target.getAttribute("state")
    );
    
  }
  //si tiene cualquier etiqueta img  dentro  de la casilla
  if (e.target.tagName === "IMG") {
    //muestra el estado de la casilla usando parentNode que es el nodo padre
    //console.log("The boardID: " + e.target.parentNode.getAttribute("boardID") + " has state: " + e.target.parentNode.getAttribute("state"));
    //quiero pasar a la funcion selectPieces la imagen  pieza seleccionada
    let seleccion = e.target; //seleccion es la imagen de la pieza seleccionada
    //console.log(seleccion);
    selectPieces(seleccion);
  }
});
