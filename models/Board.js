/*
  Clase Board
  parametros:
    - name: Nombre del Board
    - isPrivate: Si el board es privado (true o false)
    - starred: Si el board es favorito (true o false)
*/
function Board(name, isPrivate, starred) {
  this.name = name;
  this.isPrivate = isPrivate;
  this.starred = starred;
  this.columns = [];

  this.createColumn = function(name) {
    var column = new Column(name);
    this.columns.push(column);
  };

  this.findColumn = function(name) {
    var columns = this.columns.filter(function (c) {
      return c.name = name;
    });
    return columns.length != 0 ? columns.shift() : null;
  }

  /*
    Convierte todo los datos de la clase en un string que se pueda imprimir en
    pantalla
  */
  this.toString = function() {
    //Imprimir datos del board
    var toString = "<p>" +
                   "Name: "     + this.name + "<br>"+
                   "Privado: "  + (this.isPrivate ? "Si" : "No") + "<br>" +
                   "Favorito: " + (this.starred ? "Si" : "No") +
                   "</p>";

    //Imprimir datos de las columnas
    this.columns.forEach(function (column) {
      toString += column.toString();
    });

    return toString;
  }
}
