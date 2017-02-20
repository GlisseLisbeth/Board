/*
  Esta clase agrupa todas las funciones de mi programa, me sirve para no tener
  funciones por todos lados sino un punto único de acceso.
*/
function App() {
  this.boards = [];

  /*
    Permite crear un nuevo objeto Board y agregarlo a la lista de boards
    disponibles.
    Retorna el board creado.
  */
  this.newBoard = function() {

    //Solicita información
    var name = prompt("Ingrese el nombre del Board");
    var isPrivate = confirm("Es privado?");
    var starred = confirm("Es favorito?");

    //Crea el board y lo agregar a la colección de boards
    var board = new Board(name,isPrivate,starred);
    this.boards.push(board);

    return board;
  }

  /*
    Obtiene el primer board con el nombre pasado por parametro
    parametros:
      - Nombre del board
  */
  this.findBoardByName = function(name) {
    //Busco el board en la lista de boards (notar el uso de this)
    //Filter devuelve un [] vacio en caso no encuentre nada
    var boards = this.boards.filter(function(b) {
      return b.name == name;
    });
    //Si el arreglo tiene un board devuelvo el primer elemento, este metodo
    //no considera el hecho de poder encontrar mas de una ocurrencia
    return boards.length != 0 ? boards.shift() : null;
  }

  /*
    Actualiza el nombre del board
  */
  this.updateBoardName = function() {
    //Pido el nombre y busco el board usando nuestra funcion (no repetirnos)
    var name = prompt("Ingrese el nombre del Board a cambiar");
    var board = this.findBoardByName(name);
    //Sino es nulo entonces proceso
    if (board != null) {
      var newName = prompt("Ingresa el nuevo nombre");
      board.name = newName;
      return board; //Regreso el board actualizado
    }
    //Si el board no existe devuelvo nulo para
    //que quien lo llamó sepa que pude actualizar
    return null;
  }

  /*
    Crea una columna nueva en un board especifico
  */
  this.createColumn = function() {
    var boardName = prompt("En que board agrego la columna?");
    var board = this.findBoardByName(boardName);
    if (board != null) {
      var columnName = prompt("Ingrese el nombre de la columna");
      board.createColumn(columnName);
      return board; //Retorna el board con la columna nueva
    }
    //Retorna null en caso no pudo crear la columna
    return null;
  }

  /*
    Actualiza el nombre de una columna
  */
  this.updateColumnName = function() {
    var boardName = prompt("En que board cambio la columna");
    var board = this.findBoardByName(boardName);
    if (board != null) {
      var columnName = prompt("Que columna cambio?");
      var column = board.findColumn(columnName);
      if (column != null) {
        var newColumnName = prompt("Ingrese el nuevo nombre de la columna");
        column.name = newColumnName;
        return board;
      }
    }
    return null;
  }

  /*
    Crea un nueva tarjeta
  */
  this.createCard = function() {
    var boardName = prompt("En que board agrego la tarjeta?");
    var board = this.findBoardByName(boardName);
    if (board != null) {
      var columnName = prompt("En que columna del board " + board.name + " coloco la card?");
      var column = board.findColumn(columnName);
      if (column != null) {
        var cardTitle = prompt("Ingrese el nombre del card");
        var cardDescription = prompt("Ingrese la descripción del card");
        column.createCard(cardTitle,cardDescription);
        return board;
      }
    }
    return null;
  }

  /*
    Actualiza el titulo de la tarjeta
  */
  this.updateCardTitle = function() {
    var boardName = prompt("Ingresa el board name");
    var board = this.findBoardByName(boardName);
    if (board != null) {
      var columnName = prompt("Ingresa el nombre de la columna");
      var column = board.findColumn(columnName);
      if (column != null) {
        var cardTitle = prompt("Ingresa el titulo de la tarjeta");
        var card = column.findCard(cardTitle);
        if (card != null) {
          var newCardTitle = prompt("Ingrese el nuevo titulo de la tarjeta");
          card.title = newCardTitle;
          return board;
        }
      }
    }
    return null;
  }
}

/*
  Crea un objeto de tipo APP que va a contener
  todas las funciones de la applicación
*/
var app = new App();

/*
  Obtengo el elemento DIV con id myapp
  (Usaremos este elemento para mostrar información)
*/
var appContent = document.getElementById('myapp');

/*
  Obtiene el botón create-board y registra un listener en el evento click
  Esta es la forma más moderna de hacer eventos.

  Documentación:
    - Lista de eventos (https://developer.mozilla.org/en-US/docs/Web/Events)
    - Evento click (https://developer.mozilla.org/es/docs/Web/Reference/Events/click) - revisar ejemplo
*/
var createBoardButton = document.getElementById("create-board");
createBoardButton.addEventListener('click',function () {
  var board = app.newBoard(); //Creo el nuevo board usando la función del app
  //Nota: Uso una funcion para ocultar como imprimir en pantalla
  printToElement(appContent,board.toString());
});

var createColumnButton = document.getElementById("create-column");
createColumnButton.addEventListener('click',function() {
  var board = app.createColumn();
  //Notar el uso de una condicional ternaria para evitar el uso de un if mas largo
  //Se puede leer como: Si board no es nulo entonces llamo a board.toString() sino al texto
  printToElement(appContent, board != null ? board.toString() : "No se pudo crear la columna");
});

var createCardButton = document.getElementById("create-card");
createCardButton.addEventListener('click',function() {
  var board = app.createCard();
  printToElement(appContent, board != null ? board.toString() : "No se pudo crear una tarjeta");
});

var updateBoardButton = document.getElementById("update-board");
updateBoardButton.addEventListener('click',function() {
  var board = app.updateBoardName();
  printToElement(appContent,board != null ? board.toString() : "No se pudo actualizar el board");
});

var updateColumnButton = document.getElementById("update-column");
updateColumnButton.addEventListener('click',function() {
  var board = app.updateColumnName();
  printToElement(appContent,board != null ? board.toString() : "No se pudo actualizar la columna");
});

var updateCardButton = document.getElementById("update-card");
updateCardButton.addEventListener('click',function() {
  var board = app.updateCardTitle();
  printToElement(appContent,board != null ? board.toString() : "No se pudo actualizar la tarjeta");
})

function printToElement(element,text) {
  element.innerHTML = "<p>" + text + "</p>";
}
