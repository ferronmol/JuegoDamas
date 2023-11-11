import { updateInfoPiece, paintValidMoves, changeTurn, clearPaint, isPieceOfCurrentPlayer } from "./turns.js";

window.isPieceMoved = false; 
let validMoves = [];
let selectedPiece = null; // Variable global para almacenar la pieza seleccionada
let selectedPieceArray = []; // Array para almacenar el boardID y el estado de la pieza seleccionada
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
  //si tiene cualquier etiqueta img  dentro  de la casilla y es
  if (e.target.tagName === "IMG") {
    //muestra el estado de la casilla usando parentNode que es el nodo padre
    //console.log("The boardID: " + e.target.parentNode.getAttribute("boardID") + " has state: " + e.target.parentNode.getAttribute("state"));
    //quiero pasar a la funcion selectPieces la imagen  pieza seleccionada
    let seleccion = e.target; //seleccion es la imagen de la pieza seleccionada
    //console.log(seleccion);
    selectPieces(seleccion);
  }
});
/* ---------------------------------- MOVEMENT FUNCTIONS-------------------------------- */

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
//no se puede mover en casillas blancas por lo que  validBoardMove son posiciones de color negro

/* ---- SACAR EL INDICE DE LAS LETRAS CORRECTO-----*/

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
    // console.log("Valid square:", squareID);
    return true;
  } else {
    // console.log("Invalid square:", squareID);
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
    //console.log("Is Empty Square:", isEmpty);
    return isEmpty;
  } else {
    // console.log("Square does not exist");
    return false;
  }
}

/*-------------------- VALID MOVEMENTS----------------------------------------*/

export function getValidMoves(selectedPieceArray, validMovesBoard) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  //selectedPieceArray = [boardID, state]
  const boardID = selectedPieceArray[0]; //la casilla donde esta la pieza
  const state = selectedPieceArray[1]; //el estado de la pieza (whitepiece o blackpiece)
  const [letter, number] = getLetterAndNumber(selectedPieceArray[0]);
  const adjustedIndex = getAdjustedIndex(letter);
  // console.log("adjustedIndex", adjustedIndex); //OK
  const validMoves = [];
  let direccion = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  //console.log("Letter:", letter);
  //console.log("Number:", number);
  //console.log("indice", adjustedIndex);

  for (let i = 0; i < direccion.length; i++) {
    const [x, y] = direccion[i];

    const newLetterIndex = adjustedIndex + x;
    const newNumber = number + y;
    //console.log("New Letter Index:", newLetterIndex);
    //console.log("New Number", newNumber);

    if (
      newLetterIndex >= 0 &&
      newLetterIndex < letters.length &&
      newNumber >= 1 &&
      newNumber <= 8
    ) {
      const newLetter = letters[newLetterIndex];
      const newSquareID = `${newLetter}${newNumber}`;
      if (
        isValidSquare(newLetterIndex, newNumber) &&
        isEmptySquare(newLetterIndex, newNumber)
      ) {
        validMoves.push(newSquareID);
      }
    }
  }
  return validMoves; //devuelvo el array de movimientos validos
}
//fin de la funcion getValidMoves
// Función que recibe la  img  pieza seleccionada y la guarda en la variable global selectedPiece

export function selectPieces(seleccion) {
  // le paso la img de la pieza seleccionada
  
  // Si existe una pieza seleccionada (¡selectedPiece!!) elimino la clase selected
  if (selectedPiece !== null && selectedPiece.classList.contains("selected") && isPieceOfCurrentPlayer(seleccion)) {
    selectedPiece.classList.remove("selected");
    // restauro el tamaño original
    selectedPiece.style.width = "30px";
    selectedPiece.style.height = "30px";
  }
  // le pongo a la imagen la clase selected
  seleccion.classList.add("selected");
  // cambio el tamaño de la imagen de la pieza seleccionada
  seleccion.style.width = "50px";
  seleccion.style.height = "50px";
  // Actualizo el array selectedPieceArray
  selectedPieceArray = [
    seleccion.parentNode.getAttribute("boardID"),
    seleccion.parentNode.getAttribute("state"),
  ];
  // Obtengo los movimientos válidos y los almaceno en el array validMoves
  validMoves.length = 0; // Vacío el array
  validMoves.push(...getValidMoves(selectedPieceArray));
  console.log("validMoves", validMoves);
  paintValidMoves(validMoves);
  //actualizo la variable global selectedPiece
  selectedPiece = seleccion;
  movePiece(selectedPiece, validMoves);
  //actualizo la info del aside
  updateInfoPiece(selectedPiece);
}
// Función para verificar si una casilla tiene una pieza enemiga
// function isEnemyPiece(letter, number, state) { //letter y number son  la fila y columna de la casilla
//   //si el state de la casilla es diferente al state de la pieza seleccionada devuelve true
//   return document.querySelector(`[boardID="${getSquareID(letter, number)}"]`).getAttribute("state") !== state;
// }

/*---------------- END  movimientos válidos-------------------------------*/
/*--------------------------------   MOVER--------------------------------*/
// Función para mover la pieza seleccionada a la casilla de destino
//debe recibir el boardID de la casilla inicial  que esta selecionada y el boardID de la casilla de destino la que hago clik
export function movePiece(selectedPiece, validMoves) {
  let isPieceMoved = false; // Variable para controlar si la pieza se ha movido 
  //pongo un listener en las casillas negras
  gridcontainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("squares") && e.target.style.backgroundColor === "green" && !isPieceMoved) {
      console.log(selectedPiece);
      let destino = e.target;
      //let origin = selectedPiece.parentNode; //origin no se usa
      //ya se que la casilla verde es valida y vacia
      if (isPieceOfCurrentPlayer(selectedPiece)){ //si la pieza seleccionada es del jugador actual
        //cambio el estado de la casilla de origen a state empty
        selectedPiece.parentNode.setAttribute("state", "empty");
        //cambio el estado de la casilla de destino a state whitepiece
        console.log(destino);
        //muevo la pieza a la casilla de destino
        destino.appendChild(selectedPiece); 
        //cambio el estado de la casilla destino a state whitepiece
        destino.setAttribute("state", "whitepiece");
        console.log(selectedPiece.parentNode);
        selectedPiece.parentNode.setAttribute("state", "whitepiece");

        //cambio el background-color  de las casillas verdes a black
        destino.style.backgroundColor = "black";
        //quito el selected de la img
        selectedPiece.classList.remove("selected");
        // restauro el tamaño original
        selectedPiece.style.width = "30px";
        selectedPiece.style.height = "30px";
        clearPaint();
        //actualizo la info del aside 
        updateInfoPiece(selectedPiece);
        isPieceMoved = true;
        //cambio el turno
        changeTurn();
      } else {
        console.log("No es tu turno");
      }
    }
  });
}

/*---------------- END MOVER--------------------------------*/