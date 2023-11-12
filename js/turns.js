import { movePiece, selectPieces } from "./logicMovement.js";

/* ------------------ TURNS ------------------------------- */
export let isWhiteTurn = true; // Variable para almacenar el turno actual
let turn = 1; // 1 = white, 2 = black
let whiteTurn = 0; //turnos de blancas jugados
let blackTurn = 0; //turnos de negras jugados
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
const info_player_white = document.getElementById("info_player_white");
const info_player_black = document.getElementById("info_player_black");

/*--------ACTUALIZO INFO DEL ASIDE-----------------*/
export function updateInfoPiece(selectedPiece, pieceColor) {
  const infoPlayerElement = document.getElementById(
    `info_player_${pieceColor}`
  );
  if (infoPlayerElement) {
    if (selectedPiece) {
      const boardID = selectedPiece.parentNode.getAttribute("boardID");
      const state = selectedPiece.parentNode.getAttribute("state");
      infoPlayerElement.textContent = `Piece ${boardID} Selected, State: ${state}`;
    } else {
      infoPlayerElement.textContent = "No piece selected.";
    }
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
export function paintValidMoves(validMoves, clearValidMoves = true) {
  // si clearValidMoves es true, se limpian las casillas pintadas de verde
  if (clearValidMoves) {
    clearPaint();
  }
  // Pintar las casillas con el array de movimientos válidos
  validMoves.forEach((squareID) => {
    const square = document.querySelector(`[boardID="${squareID}"]`);
    square.style.backgroundColor = "green";
  });
}
// Función para limpiar las casillas pintadas de verde
export function clearPaint() {
  const squares = document.querySelectorAll(".squares");
  squares.forEach((square) => {
    if (square.style.backgroundColor === "green") {
      square.style.backgroundColor = "black";
    }
  });
}
// /*-----------------END PAINT---------------------------------------------------------------------------*/

export function isPieceOfCurrentPlayer(seleccion) {
  // Verificar si la casilla es de la pieza del jugador actual
  const square = seleccion.parentNode;
  const state = square.getAttribute("state");
  const isWhitePiece = turn === 1 && state === "whitepiece";
  const isBlackPiece = turn === 2 && state === "blackpiece";

  if (isWhitePiece || isBlackPiece) {
    console.log(
      `Acaba de mover las ${
        isWhitePiece ? "blancas" : "negras" }`);
    return true;
  } else {
    console.log(
      "No es el turno correcto o no se seleccionó una pieza del color correcto."
    );
    return false;
  }
}

// Cambiar de turno (por ejemplo, de blanco a negro)
export function changeTurn() {
  isWhiteTurn = !isWhiteTurn;
  turn = isWhiteTurn ? 1 : 2;
  window.isPieceMoved = false;
  showTurn(); // Actualiza la visualización del turno en el tablero
}
function showTurn() {
  const black_turn = document.getElementById("black_turn");
  const white_turn = document.getElementById("white_turn");

  black_turn.style.display = turn === 1 ? "none" : "block";
  white_turn.style.display = turn === 1 ? "block" : "none";
}

/* --------------END TURNS ------------------------------- */
