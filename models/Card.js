/*
  Clase Card
  params:
    - title: Titulo de la tarjeta
    - description: Descripcion de la tarjeta
*/
function Card(title,description) {
    this.title = title;
    this.description = description;

    this.toString = function() {
      return  "<p>" +
              "Titulo: " + this.title + "<br>" +
              "Descripcion: " + this.description + "<br>" +
              "</p>";
    }
}
