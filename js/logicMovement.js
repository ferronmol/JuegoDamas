const aside_white = document.getElementById("aside_white");
const aside_black = document.getElementById("aside_black");
const black_turn = document.getElementById("black_turn");
const white_turn = document.getElementById("white_turn");
const visorInfo = document.querySelector(".visor_info");
const info_player = document.getElementById("info_player");
let turn = 1; // 1 = white, 2 = black
let whitePieces = []; // Array para almacenar las piezas blancas
let blackPieces = []; // Array para almacenar las piezas negras
let selectedPiece = null; // Variable global para almacenar la pieza seleccionadaconst
let selectedPieceArray = []; // Array para almacenar el boardID y el estado de la pieza seleccionada
let whitePiecesCaptured = []; // Array para almacenar las piezas blancas capturadas
let blackPiecesCaptured = []; // Array para almacenar las piezas negras capturadas
let whitePiecesCapturedCounter = 0; // Contador para almacenar el número de piezas blancas capturadas
let blackPiecesCapturedCounter = 0; // Contador para almacenar el número de piezas negras capturadas

/* ------------------ TURNS ------------------------------- */
// Cambiar de turno (por ejemplo, de blanco a negro)
function changeTurn() {
  if (turn === 1) {
    turn = 2; // Cambia el turno a negro
  } else {
    turn = 1; // Cambia el turno a blanco
  }
  showTurn(); // Actualiza la visualización del turno en el tablero
}
function showTurn() {
  if (turn === 1) {
    black_turn.style.display = "none";
    white_turn.style.display = "block";
  } else {
    black_turn.style.display = "block";
    white_turn.style.display = "none";
  }
}
/* --------------END TURNS ------------------------------- */
/* -------------SELECT MOVEMENT -------------------------- */
//quiero ver lo qeu tengo
//console.log("Vacias ", emptyBoard); //mi array con todas las casillas vacias
//console.log("Cas Posibles validMovesBoard" , validMovesBoard); //mi array con las casillas negras (unicas casillas posibles)

// Función que recibe la  img  pieza seleccionada

function selectPieces(seleccion) {
  // le paso la img de la pieza seleccionada
  // Si existe una pieza seleccionada (¡selectedPiece!!) elimino la clase selected
  if (selectedPiece !== null) {
    selectedPiece.classList.remove("selected");
    // restauro el tamaño original
    selectedPiece.style.width = "30px";
    selectedPiece.style.height = "30px";
    //console.log("The piece " + selectedPiece.parentNode.getAttribute("boardID") + " has been deselected");
  }
  // le pongo a la imagen la clase selected
  seleccion.classList.add("selected");
  // cambio el tamaño de la imagen de la pieza seleccionada
  seleccion.style.width = "50px";
  seleccion.style.height = "50px";
  // muestro en consola la pieza seleccionada y su estado
  // console.log("The piece " + seleccion.parentNode.getAttribute("boardID") + " has been selected" + " and has the state " +
  //     seleccion.parentNode.getAttribute("state"));
  //actualizo el array selectedPieceArray
  selectedPieceArray = [];
  //meto el boardID y el state en un array
  selectedPieceArray.push(
    seleccion.parentNode.getAttribute("boardID"),
    seleccion.parentNode.getAttribute("state")
  );
  console.log(selectedPieceArray);
  const validMoves = getValidMoves(selectedPieceArray);
  console.log("movimientos validos ", validMoves);
  //actualizo la variable global selectedPiece
  selectedPiece = seleccion;
  //quiero que me muestre su letter y su number llamado a la funcion getLetterAndNumber
  //console.log("Fila y Columna: " + getLetterAndNumber(selectedPieceArray[0]));
  //actualizo la info del aside
  updateInfo(selectedPiece);
}
/*--------ACTUALIZO INFO DEL ASIDE-----------------*/
function updateInfo(selectedPiece) {
  const infoPlayer = document.getElementById("info_player1");
  if (selectedPiece) {
    const boardID = selectedPiece.parentNode.getAttribute("boardID");
    const state = selectedPiece.parentNode.getAttribute("state");
    infoPlayer.textContent =
      "Piece " + boardID + " Selected " + "State: " + state;
  } else {
    infoPlayer.textContent = "No piece selected.";
  }
}
/*--------END ACTUALIZO INFO DEL ASIDE-----------------*/

// Función para obtener la fila y columna a partir del ID de la casilla
function getLetterAndNumber(boardID) {
  // El primer caracter del ID de la casilla es la fila entre a y h
  //tengo que pasar la letra a numero
  const letter = boardID.charAt(0);
  // El segundo caracter del ID de la casilla es la columna
  const number = parseInt(boardID.charAt(1));

  return [letter, number];
}

/* ------------------------OPTIONS MOVEMENT ---------------------------------------------- */
//no se puede poner en casillas blancas por lo que creo un validBoardMove en elque le quito a validBoard las posiciones de color negro

/* ---- SACAR EL INDICE DE LAS LETRAS-----*/

function getAdjustedIndex(letter) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const index = letters.indexOf(letter);
  if (index !== -1) {
    return index;
  }
  return -1; // Letra no válida
}
/* ---- VER SI LAS CASILLAS POSIBLES SON VALIDAS-----*/

function isValidSquare(adjustedIndex, number) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const squareID = letters[adjustedIndex] + number;
  
  if (number >= 1 && number <= 8 && adjustedIndex >= 0 && adjustedIndex <= 7) {
    console.log("Valid square:", squareID);
    return true;
  } else {
    console.log("Invalid square:", squareID);
    return false;
  }
}
/* ---- FUNCION BOOLEANA SI ESTA LA CASILLA VACIA-----*/

function isEmptySquare(adjustedIndex, number) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const letter = letters[adjustedIndex];
  const square = document.querySelector(`[boardID="${letter}${number}"]`);
  if (square !== null) {
    const state = square.getAttribute("state");
    const isEmpty = state === "empty";
    console.log("Is Empty Square:", isEmpty);
    return isEmpty;
  } else {
    console.log("Square does not exist");
    return false;
  }
}

/*------- Función para obtener movimientos válidos para una pieza-----*/
function getValidMoves(selectedPieceArray, validMovesBoard) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  //selectedPieceArray = [boardID, state]
  const boardID = selectedPieceArray[0]; //la casilla donde esta la pieza
  const state = selectedPieceArray[1]; //el estado de la pieza (whitepiece o blackpiece)
  const [letter, number] = getLetterAndNumber(selectedPieceArray[0]);
  const adjustedIndex = getAdjustedIndex(letter);
  // console.log("adjustedIndex", adjustedIndex); //OK
  const validMoves = [];
  let direccion = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
   console.log("Letter:", letter); 
   console.log("Number:", number); 
   console.log("indice", adjustedIndex); 

  for (let i = 0; i < direccion.length; i++) {
    const [x, y] = direccion[i];
    
    const newLetterIndex = adjustedIndex + x;
    const newNumber = number + y;
     console.log("New Letter Index:", newLetterIndex);
     console.log("New Number", newNumber);

     if (
      newLetterIndex >= 0 && newLetterIndex < letters.length &&
      newNumber >= 1 && newNumber <= 8
    ) {
      const newLetter = letters[newLetterIndex];
      const newSquareID = `${newLetter}${newNumber}`;
      if (isValidSquare(newLetterIndex, newNumber) && isEmptySquare(newLetterIndex, newNumber)) {
        validMoves.push(newSquareID);
      }
    }
  }
  return validMoves; //devuelvo el array de movimientos validos
} 
//fin de la funcion getValidMoves




// Función para verificar si una casilla tiene una pieza enemiga
// function isEnemyPiece(letter, number, state) { //letter y number son  la fila y columna de la casilla
//   //si el state de la casilla es diferente al state de la pieza seleccionada devuelve true
//   return document.querySelector(`[boardID="${getSquareID(letter, number)}"]`).getAttribute("state") !== state;
// }

/*-------- END  movimientos válidos-----------------*/

// /*-----------------PAINT---------------------------------------------------------------------------*/
// //funcion que pinte en casillas con movimientos validos
// function paintValidMoves(validMoves){
//   const squares = document.querySelectorAll(".squares");
//   squares.forEach(square => {
//     square.style.backgroundColor = "";
//   }
//   );
//   // Aplica un estilo a las casillas válidas para resaltarlas
//   validMoves.forEach((squareID) => {
//     const square = document.querySelector(`[boardID="${squareID}"]`);
//     square.style.backgroundColor = "lightgreen"; // Cambia el color de fondo a verde claro
//   });
// }
// /*-----------------END PAINT---------------------------------------------------------------------------*/
