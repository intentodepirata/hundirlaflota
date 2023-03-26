const prompt = require("prompt-sync")({ sigint: true });
const tableroSize = 9;
const barcoSize = 3;
const barco2Size = 4;
const barco3Size = 5;

let barco = [];
let barco2 = [];
let barco3 = [];
let barcoIA = [];
let barco2IA = [];
let barco3IA = [];


let vertical = false;
let posicionBarcoX = 0;
let posicionBarcoY = 0;
let horizontal = false;


crearBarco(randomPosicion(tableroSize, barcoSize), barcoSize, barcoIA);
crearBarco(randomPosicion(tableroSize, barco2Size), barco2Size, barco2IA);
crearBarco(randomPosicion(tableroSize, barco3Size), barco3Size, barco3IA);

checkPosicion(barcoIA, barco2IA, barco3IA);

//Si algun barco se toca la funcion chekPosition sera true y entonces entrara el bucle en accion para resetear los barcos y volver a crearlos
//los comprobara en cada iteracion hasta que esten bien situados

while (checkPosicion(barcoIA, barco2IA, barco3IA)) {
  barcoIA = [];
  barco2IA = [];
  barco3IA = [];
  crearBarco(randomPosicion(tableroSize, barcoSize), barcoSize, barcoIA);
  crearBarco(randomPosicion(tableroSize, barco2Size), barco2Size, barco2IA);
  crearBarco(randomPosicion(tableroSize, barco3Size), barco3Size, barco3IA);
  checkPosicion(barcoIA, barco2IA, barco3IA);
}
console.log("La posicion del barco enemigo es:");
console.log(barcoIA);
console.log(barco2IA);
console.log(barco3IA);

// Se le pide al jugador unas coordenadas para situar la proa del barco

console.log("Ahora le toca situar sus barcos");
console.log("PRIMER BARCO(3 SLOTS)");
crearBarco(jugadorPosicion(tableroSize, barcoSize), barcoSize, barco);
console.log("SEGUNDO BARCO(4 SLOTS)");
crearBarco(jugadorPosicion(tableroSize, barco2Size), barco2Size, barco2);
console.log("TERCER BARCO(5 SLOTS)");
crearBarco(jugadorPosicion(tableroSize, barco3Size), barco3Size, barco3);

checkPosicion(barco, barco2, barco3);

// Si el Jugador ha situado los barcos de forma que alguno se toca, el bucle entrara en accion para resetear los barcos y volver a crearlos
//los comprobara en cada iteracion hasta que el jugador los situe correctamente

while (checkPosicion(barco, barco2, barco3)) {
  console.log(
    "ERRORRR!!! LOS BARCOS SE ESTAN TOCANDO-- REPITA OPERACION PORFAVOR"
  );
  barco = [];
  barco2 = [];
  barco3 = [];
  crearBarco(jugadorPosicion(tableroSize, barcoSize), barcoSize, barco);
  crearBarco(jugadorPosicion(tableroSize, barco2Size), barco2Size, barco2);
  crearBarco(jugadorPosicion(tableroSize, barco3Size), barco3Size, barco3);
  checkPosicion(barco, barco2, barco3);
}


//                 **** LOOP GAME ****

// TURNO DEL JUGADOR1
// 1-Jugador introduce una columna y una fila y se convierten a coordenandas
// 2-Si las coordenadas se encuentran en algun array de barcos se llama a la funcion de isTocado y esta se encarga de sustituir la coordenada por una 'X'
// 3-Se llama a la funcion isHundido, esta funcion recorre los barco en busca de las 'X'

// TURNO DE LA IA
// 4-Se simula una tirada random y se convierten a coordenadas
// 5-Si las coordenadas se encuentran en algun array de barcos se llama a la funcion de isTocado y esta se encarga de sustituir la coordenada por una 'X'
// 6-Se llama a la funcion isHundido, esta funcion recorre los barco en busca de las 'X'

console.log("BARCOS CORRECTAMENTE COLOCADOS!!");
console.log(barco);
console.log(barco2);
console.log(barco3);
console.clear();

let posicionX;
let posicionY;
let posicionXIA;
let posicionYIA;
let tirada = {};
let tiradaIA = {};

console.log("Ahora le toca probar suerte con un disparo");

let ronda = 1
do {
  console.log(`RONDA ${ronda}`)
 
  posicionX = Number(prompt('introduzca columna(0-9)')) //Math.floor(Math.random() * 10); //
  posicionY = Number(prompt('introduzca fila(0-9)')) // Math.floor(Math.random() * 10); //  

  tirada = { x: posicionX, y: posicionY };
  console.log("Tirada J1");
  console.log(tirada);
  if (
    isTocado(barcoIA, tirada) ||
    isTocado(barco2IA, tirada) ||
    isTocado(barco3IA, tirada)
  ) {
    console.log("Tocado");
  } else {
    console.log("Agua");
  }

 
  switch (true) {
    case isHundido(barcoIA) && isHundido(barco2IA) && isHundido(barco3IA):
      console.log("Barco 1 hundido, Barco 2 hundido, Barco 3 hundido");
      break;
    case isHundido(barcoIA) && isHundido(barco2IA):
      console.log("Barco 1 hundido, Barco 2 hundido");
      break;
    case isHundido(barcoIA) && isHundido(barco3IA):
      console.log("Barco 1 hundido, Barco 3 hundido");
      break;
    case isHundido(barco2IA) && isHundido(barco3IA):
      console.log("Barco 2 hundido, Barco 3 hundido");
      break;
    case isHundido(barcoIA):
      console.log("Barco 1 hundido");
      break;
    case isHundido(barco2IA):
      console.log("Barco 2 hundido");
      break;
    case isHundido(barco3IA):
      console.log("Barco 3 hundido");
      break;
    default:
      console.log("Ningún barco ha sido hundido");
      break;
  }
  

  console.log("Barcos IA");
  console.log(barcoIA);
  console.log(barco2IA);
  console.log(barco3IA);

  posicionXIA = Math.floor(Math.random() * 10);
  posicionYIA = Math.floor(Math.random() * 10);
  tiradaIA = { x: posicionXIA, y: posicionYIA };
  console.log("Tirada IA");
  console.log(tiradaIA);

  if (
    isTocado(barco, tiradaIA) ||
    isTocado(barco2, tiradaIA) ||
    isTocado(barco3, tiradaIA)
  ) {
    console.log("Tocado");
  } else {
    console.log("Agua");
  }


  switch (true) {
    case isHundido(barco) && isHundido(barco2) && isHundido(barco3):
      console.log("Barco 1 hundido, Barco 2 hundido, Barco 3 hundido");
      break;
    case isHundido(barco) && isHundido(barco2):
      console.log("Barco 1 hundido, Barco 2 hundido");
      break;
    case isHundido(barco) && isHundido(barco3):
      console.log("Barco 1 hundido, Barco 3 hundido");
      break;
    case isHundido(barco2) && isHundido(barco3):
      console.log("Barco 2 hundido, Barco 3 hundido");
      break;
    case isHundido(barco):
      console.log("Barco 1 hundido");
      break;
    case isHundido(barco2):
      console.log("Barco 2 hundido");
      break;
    case isHundido(barco3):
      console.log("Barco 3 hundido");
      break;
    default:
      console.log("Ningún barco ha sido hundido");
      break;
  }
  

 

  console.log("Barcos J1");
  console.log(barco);
  console.log(barco2);
  console.log(barco3);
  console.log('*****************************************')
  ronda++
} while (
  !(isHundido(barco) && isHundido(barco2) && isHundido(barco3)) &
  !(isHundido(barcoIA) && isHundido(barco2IA) && isHundido(barco3IA))
);

if (isHundido(barco) && isHundido(barco2) && isHundido(barco3)) {
  console.log("Has perdido Jugador 1");
} else if (isHundido(barcoIA) && isHundido(barco2IA) && isHundido(barco3IA)) {
  console.log("Has ganado Jugador 1 !!");
}


//        *** FUNCIONES ***

// Esta funcion recibe el tamaño del tablero y el tamaño del barco, y devuelve una coordenada valida para el siguiente paso

function jugadorPosicion(tableroSize, barcoSize) {
  let preguntaOrientacion = prompt(
    "Pulse 1 para colocar el barco1 en horizontal o 2 para vertical"
  );

  if (preguntaOrientacion == 1) {
    horizontal = true;
  } else if (preguntaOrientacion == 2) {
    vertical = true;
  }

  posicionBarcoX = Number(
    prompt("introduzca en que columna pondra la proa del barco(0-9)")
  );
  posicionBarcoY = Number(
    prompt("introduzca en que fila pondra la proa del barco(0-9)")
  );

  if (vertical) {
    while (posicionBarcoX > tableroSize - barcoSize) {
      posicionBarcoX = Number(
        prompt("introduzca en que columna pondra la proa del barco(0-9)")
      );
    }
  } else {
    while (posicionBarcoY > tableroSize - barcoSize) {
      posicionBarcoY = Number(
        prompt("introduzca en que fila pondra la proa del barco(0-9)")
      );
    }
  }
  return { x: posicionBarcoX, y: posicionBarcoY };
}

// Esta funcion es similar a la funcion jugadorPosicion pero con numeros Aleatorios
function randomPosicion(tableroSize, barcoSize) {
  horizontal = Math.random() < 0.5;
  if (horizontal) {
    vertical = false;
  } else vertical = true;

  if (vertical) {
    posicionBarcoX = Math.floor(Math.random() * tableroSize);
    posicionBarcoY = Math.floor(Math.random() * (tableroSize - barcoSize));
  } else {
    posicionBarcoX = Math.floor(Math.random() * (tableroSize - barcoSize));
    posicionBarcoY = Math.floor(Math.random() * tableroSize);
  }

  return { x: posicionBarcoX, y: posicionBarcoY };
}

//Esta funcion recibe las coordenadas de la proa del barco y en funcion de si es horizontal o no 
// y del tamaño del barco, agrega el resto de coordenadas al array de barco

function crearBarco(posicionBarco, barcoSize, barco) {
  if (horizontal) {
    for (i = 0; i < barcoSize; i++) {
      posicionBarco = { x: posicionBarcoX++, y: posicionBarco.y };
      barco.push(posicionBarco);
    }
    return barco;
  } else {
    for (i = 0; i < barcoSize; i++) {
      posicionBarco = { x: posicionBarco.x, y: posicionBarcoY++ };
      barco.push(posicionBarco);
    }

    return barco;
  }
}

//Esta funcion recibe los 3 barcos y los recorre en busca de si alguna coordenada se repite en algun barco

function checkPosicion(array1, array2, array3) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (JSON.stringify(array1[i]) === JSON.stringify(array2[j])) {
        return true;
      }
    }
    for (let k = 0; k < array3.length; k++) {
      if (JSON.stringify(array1[i]) === JSON.stringify(array3[k])) {
        return true;
      }
    }
  }
  for (let j = 0; j < array2.length; j++) {
    for (let k = 0; k < array3.length; k++) {
      if (JSON.stringify(array2[j]) === JSON.stringify(array3[k])) {
        return true;
      }
    }
  }
  return false;
}



// esta funcion comprueba si el jugador ha acertado o no y si ha acertado, sustituye las coordenadas del barco por 'X'

function isTocado(barcoIA, tirada) {
  for (let b of barcoIA) {
    if (JSON.stringify(b) === JSON.stringify(tirada)) {
      barcoIA[barcoIA.indexOf(b)] = "x";
      return true;
    }
  }
  return false;
}


//este codigo comprueba si esta hundido, devuelve true o false
function isHundido(barco) {
  return barco.every((element) => element === "x");

}

// este bucle crea el tablero

function crearTablero() {
  let tablero = [];
  for (let i = 0; i < 10; i++) {
    let fila = [];
    for (let j = 0; j < 10; j++) {
      fila.push({ x: i, y: j });
    }
    tablero.push(fila);
  }
  for (let i = 0; i < barco.length; i++) {
    barco.push();
  }
  return tablero;
}