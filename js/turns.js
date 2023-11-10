import { movePiece } from "./logicMovement.js";


/* ------------------ TURNS ------------------------------- */
let turn = 1; // 1 = white, 2 = black
let whitePieces = []; // Array para almacenar las piezas blancas
let blackPieces = []; // Array para almacenar las piezas negras
let selectedPieceArray = []; // Array para almacenar el boardID y el estado de la pieza seleccionada
let whitePiecesCaptured = []; // Array para almacenar las piezas blancas capturadas
let blackPiecesCaptured = []; // Array para almacenar las piezas negras capturadas
let whitePiecesCapturedCounter = 0; // Contador para almacenar el número de piezas blancas capturadas
let blackPiecesCapturedCounter = 0; // Contador para almacenar el número de piezas negras capturadas
const aside_white = document.getElementById("aside_white");
const aside_black = document.getElementById("aside_black");
const black_turn = document.getElementById("black_turn");
const white_turn = document.getElementById("white_turn");
const visorInfo = document.querySelector(".visor_info");
const info_player = document.getElementById("info_player");

/*--------ACTUALIZO INFO DEL ASIDE-----------------*/
export function updateInfoPiece(selectedPiece) {
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

 export function startGame() {
    // Iniciar el juego y configurar el turno inicial
    turn = 1; // Comienzan las piezas blancas
    updateInfoPiece(null); // Actualizar la información del aside
    showTurn();

 
  }
  /*-----------------PAINT---------------------------------------------------------------------------*/
// Función para pintar las casillas con el array de movimientos válidos
export function paintValidMoves(validMoves) {
 //si tengo colores verdes los borro
  const squares = document.querySelectorAll(".squares");
  squares.forEach((square) => {
    if (square.style.backgroundColor === "green") {
      square.style.backgroundColor = "black";
    }
  });
  validMoves.forEach(squareID => {
    const square = document.querySelector(`[boardID="${squareID}"]`);
    square.style.backgroundColor = "green";
  });
}



// /*-----------------END PAINT---------------------------------------------------------------------------*/


  
  export function isPieceOfCurrentPlayer(seleccion) {
    // Verificar si la casilla es de la pieza del jugador actual
    const square = seleccion.parentNode

    if (turn === 1 && square.classList.contains("whitepieces")) {
      return true; // Turno de las piezas blancas y se hizo clic en una pieza blanca
    } else if (turn === 2 && square.classList.contains("blackpieces")) {
      return true; // Turno de las piezas negras y se hizo clic en una pieza negra
    } else {
      return false; // Caso contrario
    }
    console.log("isPieceOfCurrentPlayer", isPieceOfCurrentPlayer);
  }
  

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

