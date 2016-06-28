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
  this.trace = this.trace();
  this.previewTrace = this.previewTrace();
};

Piece.prototype.buildSquares = function() {
  var color = this.color;
  this.squares = this.typeCoordinates.map( function( position ) {
    return new Square( position, color );
  });
};

Piece.prototype.trace = function() {
  return [ this.currentCoordinates, this.squares[ 1 ].boardPosition( this.currentCoordinates ), this.squares[ 2 ].boardPosition( this.currentCoordinates ), this.squares[ 3 ].boardPosition( this.currentCoordinates ) ];
};

Piece.prototype.previewTrace = function() {
  return [ this.previewCoordinates, this.squares[ 1 ].boardPosition( this.previewCoordinates ), this.squares[ 2 ].boardPosition( this.previewCoordinates ), this.squares[ 3 ].boardPosition( this.previewCoordinates ) ];
};

Piece.prototype.goLeft = function() {
  this.currentCoordinates[ 1 ]--;
  this.trace = this.trace();
};

Piece.prototype.goRight = function() {
  this.currentCoordinates[ 1 ]++;
  this.trace = this.trace();
};

Piece.prototype.goDown = function() {
  this.currentCoordinates[ 0 ]++;
  this.trace = this.trace();
};

Piece.prototype.rotate = function() {
  this.squares.forEach( function( square ) {
    square.rotate();
  });
  this.trace = this.trace();
};

Piece.prototype.possibleTrace = function() {
  return [ this.currentCoordinates, this.squares[ 1 ].nextBoardPosition( this.currentCoordinates ), this.squares[ 2 ].nextBoardPosition( this.currentCoordinates ), this.squares[ 3 ].nextBoardPosition( this.currentCoordinates ) ];
};
