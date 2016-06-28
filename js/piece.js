function Piece( type ) {
  this.type = type;
  switch( type ) {
    case "L":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 2,0 ], [ 0,1 ] ]
      this.color = "blue"
      break;
    case "J":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 2,0 ], [ 0,-1 ] ]
      this.color = "red"
      break;
    case "T":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 0,-1 ], [ 0,1 ] ]
      this.color = "green"
      break;
    case "LINE":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 2,0 ], [ -1,0 ] ]
      this.color = "orange"
      break;
    case "Z":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 1,-1 ], [ 0,1 ] ]
      this.color = "yellow"
      break;
    case "S":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 1,1 ], [ 0,-1 ] ]
      this.color = "purple"
      break;
    case "SQUARE":
      this.typeCoordinates = [ [ 0,0 ], [ 1,0 ], [ 0,1 ], [ 1,1 ] ]
      this.color = "brown"
      break;
  };

  this.isCurrent = true;
  this.currentCoordinates = [ 2,5 ];
  this.previewCoordinates = [ 2,2 ];
  this.buildSquares();
  this.trace = this.setTrace();
  this.previewTrace = this.setPreviewTrace();
}

Piece.prototype.buildSquares() = function() {
  var color = this.color;
  this.squares = this.typeCoordinates.mpa( function( coordinates ) {
    return new Square( coordinates, color );
  });
};
