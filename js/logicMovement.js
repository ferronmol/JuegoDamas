const aside_white = document.getElementById("aside_white");
const aside_black = document.getElementById("aside_black");
const black_turn = document.getElementById("black_turn");
const white_turn = document.getElementById("white_turn"); const visorInfo = document.querySelector(".visor_info");
const info_player = document.getElementById("info_player");
let turn = 1; // 1 = white, 2 = black
let whitePieces = []; // Array para almacenar las piezas blancas
let blackPieces = []; // Array para almacenar las piezas negras

let selectedPiece= null; // Variable para almacenar la pieza seleccionada

/* ------------- TURNS -------------- */
function showTurn() {
  if (turn === 1) {
    black_turn.style.display = "none";
    white_turn.style.display = "block";
  } else {
    black_turn.style.display = "block";
    white_turn.style.display = "none";
  }
}

/* ------------- MOVEMENT -------------- */
// Función que recibe la pieza seleccionada e.target.parentNode
function selectPiece(piece) {
  // elimino primeramente la clase selected de la pieza anterior si existe
  if (selectedPiece !== null) {
    selectedPiece.classList.remove("selected");
    console.log("The piece " + selectedPiece.getAttribute("boardID") + " has been deselected");
    // restauro el tamaño original
    selectedPiece.firstChild.style.width = "28px";
    selectedPiece.firstChild.style.height = "28px";
  }
  // le pongo a la imagen la clase selected
  piece.classList.add("selected");
  // guardo la pieza seleccionada en la variable selectedPiece
  selectedPiece = piece;
  // muestro en consola la pieza seleccionada y su estado
  console.log("The piece " + selectedPiece.getAttribute("boardID")  + " has been selected" + " and has the state " + selectedPiece.getAttribute("state"));
  //llamo a la funcion de actualizar el visor de info
  //updateInfo();
  // cambio el tamaño de la imagen de la pieza seleccionada 
  selectedPiece.firstChild.style.width = "50px";
  selectedPiece.firstChild.style.height = "50px";
};
