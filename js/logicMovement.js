import {
  updateInfoPiece,
  paintValidMoves,
  changeTurn,
  clearPaint,
  isPieceOfCurrentPlayer,
  isWhiteTurn,
} from "./turns.js";

window.isPieceMoved = false;
let validMoves = [];
let selectedPiece = null; // Variable global para almacenar la pieza seleccionada
let selectedPieceArray = []; // Array para almacenar el boardID y el estado de la pieza seleccionada
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const row = letters.map((_, i) => i + 1);

// si dentro de mi gridcontainer hago click en una casilla o su children (img) mostrar estado de la casilla
gridcontainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("squares")) {
    console.log(
      "The boardID: " +
        e.target.getAttribute("boardID") +
        " has state: " +
        e.target.getAttribute("state") + " en la fila " + e.target.getAttribute("row") + 
        " y en la columna " + e.target.getAttribute("column")
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
// Añade otro evento click para mover la pieza cuando sea necesario
gridcontainer.addEventListener("click", (e) => {
  // Asegúrate de que haya una pieza seleccionada y que se haya hecho clic en una casilla válida
  if (
    selectedPiece !== null &&
    e.target.classList.contains("squares") &&
    e.target.style.backgroundColor === "green"
  ) {
    movePiece(selectedPiece, validMoves);
    selectedPiece = null; // Restablece la pieza seleccionada después de moverla
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

function isValidSquare(newLetterIndex, newNumber,adjustedIndex) {
  console.log(newLetterIndex,newNumber,adjustedIndex);
    //si es turno de blancas y el indice ajustado  aumenta es valido
    if (isWhiteTurn &&  adjustedIndex < newLetterIndex){
      console.log("La fila de mi pieza: " + adjustedIndex + " debe ser menor posibles filas: " + newLetterIndex );
      console.log("Valid square:" );
      return true;
    }
    // Si es turno de las negras y el número de fila disminuye, es válido
    else if (!isWhiteTurn && adjustedIndex > newLetterIndex) {
      console.log("Valid square:");
      return true;
    }
  
  console.log("Invalid square:");
  return false;
}

/* ---- FUNCION BOOLEANA SI ESTA LA CASILLA VACIA O TIENE UNA PIEZA ENEMIGA -----*/
function isEmptySquare(adjustedIndex, number) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const letter = letters[adjustedIndex];
  const square = document.querySelector(`[boardID="${letter}${number}"]`);
  const state = square.getAttribute("state");
  if (state === "empty") {
    return false; //la casilla esta vacia
  } else {
    return true; //la casilla tiene una pieza enemiga o propia
  }
}

/*-------------------- VALID MOVEMENTS----------------------------------------*/

export function getValidMoves(selectedPieceArray, validMovesBoard) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  //selectedPieceArray = [boardID, state]
  const boardID = selectedPieceArray[0]; //la casilla donde esta la pieza
  const state = selectedPieceArray[1]; //el estado de la pieza (whitepiece o blackpiece)
  const [letter, number] = getLetterAndNumber(selectedPieceArray[0]);
  console.log("el letter es " + letter); //ok
  //convertir ese letter a numero
  const letterOfSelectedPiece = letter;
  const adjustedIndex = getAdjustedIndex(letter);
  // console.log("adjustedIndex", adjustedIndex); //OK
  const validMoves = [];
  let direccion = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  console.log("ROW(letter):", letter); //ok!
  console.log("COLUMN(number):", number);
  console.log("EL INDICE_0-7(adjustedIndex)", adjustedIndex);

  for (let i = 0; i < direccion.length; i++) {
    const [x, y] = direccion[i];

    const newLetterIndex = adjustedIndex + x;
    const newNumber = number + y;
    console.log("New ROW Index:", newLetterIndex); //ok
    console.log("New column", newNumber);          //ok

    if ( // si la fila que esta valorando es valida 
      newLetterIndex >= 0 &&
      newLetterIndex < letters.length &&
      newNumber >= 1 &&
      newNumber <= 8
    ) {
      const newLetter = letters[newLetterIndex];
      const newSquareID = `${newLetter}${newNumber}`;
      if (
        isValidSquare(newLetterIndex, newNumber, adjustedIndex) &&
        !isEmptySquare(newLetterIndex, newNumber)
      ) {
        validMoves.push(newSquareID);
      } else {
        console.log("Enemy or allied piece found");
      }
    }
  }
  return validMoves; //devuelvo el array de movimientos validos
}
//fin de la funcion getValidMoves
// Función que recibe la  img  pieza seleccionada y la guarda en la variable global selectedPiece

export function selectPieces(seleccion) {
  isPieceMoved = false;
  // Obtengo el color de la pieza seleccionada
  const pieceColor = seleccion.classList.contains("whitepieces")
    ? "white"
    : "black";
  // Verifico si es el turno correcto para seleccionar piezas
  if (
    (pieceColor === "white" && isWhiteTurn) ||
    (pieceColor === "black" && !isWhiteTurn)
  ) {
    // Obtengo el boardID y el estado de la pieza seleccionada
    selectedPieceArray = [
      seleccion.parentNode.getAttribute("boardID"),
      seleccion.parentNode.getAttribute("state"),
    ];
    // Restablezco la clase "selected" y el tamaño original de las otras piezas
    const allPieces = document.querySelectorAll(".whitepieces, .blackpieces");
    allPieces.forEach((piece) => {
      if (piece !== seleccion) {
        piece.classList.remove("selected");
        piece.style.width = "30px";
        piece.style.height = "30px";
      }
    });
    // le pongo a la imagen la clase selected
    seleccion.classList.add("selected");
    // cambio el tamaño de la imagen de la pieza seleccionada
    seleccion.style.width = "50px";
    seleccion.style.height = "50px";
    //actualizo la variable global selectedPiece
    selectedPiece = seleccion;
    console.log("Intentando mover la pieza: ", selectedPiece); //ok
    //actualizo la info del aside
    updateInfoPiece(selectedPiece);

    // Obtengo los movimientos válidos y los almaceno en el array validMoves
    validMoves.length = 0; // Vacío el array validMoves
    // Obtengo los movimientos válidos y los almaceno en el array validMoves
    validMoves.push(...getValidMoves(selectedPieceArray));
     console.log("validMoves", validMoves);
    paintValidMoves(validMoves);
    isPieceMoved = false;
  } else {
    // Es el turno incorrecto, no hago nada
    console.log("No es tu turno para seleccionar piezas");
  }
}
export function isEnemyPiece(letter, number, state) {
  console.log("Estado de la casilla:", state);
}

/*---------------- END  movimientos válidos-------------------------------*/
/*--------------------------------   MOVER--------------------------------*/
// Función para mover la pieza seleccionada a la casilla de destino
//debe recibir el boardID de la casilla inicial  que esta selecionada y el boardID de la casilla de destino la que hago clik
export function movePiece(selectedPiece, validMoves) {
  let isPieceMoved = false;

  // Maneja el movimiento directamente sin añadir un nuevo oyente del evento
  gridcontainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("squares") &&
      e.target.style.backgroundColor === "green" &&
      validMoves.includes(e.target.getAttribute("boardID"))
    ) {
      let destino = e.target;
      if (isPieceOfCurrentPlayer(selectedPiece)) {
        const sourceSquare = selectedPiece.parentNode;
        destino.setAttribute("state", sourceSquare.getAttribute("state"));
        destino.appendChild(selectedPiece);
        sourceSquare.setAttribute("state", "empty");
        selectedPiece.classList.remove("selected");
        selectedPiece.style.width = "30px";
        selectedPiece.style.height = "30px";
        clearPaint();
        const pieceColor = selectedPiece.classList.contains("whitepieces")
          ? "white"
          : "black";

        updateInfoPiece(selectedPiece, pieceColor);
        isPieceMoved = true;
        changeTurn();
      } else {
        console.log("Es turno del otro jugador");
      }
    }
  });
}

/*---------------- END MOVER--------------------------------*/
/*----------------------------- CAPTURAR PIEZA-----------------*/
// Función para capturar una pieza
function capturePiece(selectedPiece, validMoves) {
  let isPieceMoved = false;
  // Maneja el quitando la pieza enemiga, quitando mi pieza y colocando mi pieza en la casilla de destino
  gridcontainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("squares") &&
      e.target.style.backgroundColor === "green" &&
      validMoves.includes(e.target.getAttribute("boardID"))
    ) {
      let destino = e.target;
      if (isPieceOfCurrentPlayer(selectedPiece)) {
        destino.setAttribute("state", "whitepiece");
        destino.appendChild(selectedPiece);
        selectedPiece.parentNode.setAttribute("state", "empty");
        destino.style.backgroundColor = "black";
        selectedPiece.classList.remove("selected");
        selectedPiece.style.width = "30px";
        selectedPiece.style.height = "30px";
        clearPaint();
        const pieceColor = selectedPiece.classList.contains("whitepieces")
          ? "white"
          : "black";

        updateInfoPiece(selectedPiece, pieceColor);
        isPieceMoved = true;
        changeTurn();
      } else {
        console.log("Es turno del otro jugador");
      }
    }
  });
}
