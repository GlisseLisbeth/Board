/*
  Clase Column
  params:
    - name: Column's name
*/
function Column(name) {
  this.name = name;
  this.cards = [];

  this.createCard = function(title,description) {
    var card = new Card(title,description);
    this.cards.push(card);
  }

  this.findCard = function(title) {
    var cards = this.cards.filter(function (c) {
      return c.title = title;
    });
    return cards.length != 0 ? cards.shift() : null;
  }

  this.toString = function() {
    //Imprimir datos de la columna
    var toString = "<p>" +
                   "Nombre columna: " + this.name + "<br>"+
                   "</p>";
    //Imprime los datos de las tarjetas de la columna
    this.cards.forEach(function (card) {
      toString += card.toString();
    });
    return toString;
  }
}
