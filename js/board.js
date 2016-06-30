var Board = function() {
  this.grid = [
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1,1,1,1,1 ]
  ];

  this.nextPreview = [
    [ 1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1 ],
    [ 1,1,1,1,1,1 ]
  ];
};

Board.prototype.clearCurrentPiece = function() {
  for ( var row = 0; row < this.grid.length; row++ ) {
    for ( var column = 0; column < 10; column++ ) {
      if ( this.grid[ row ][ column ] === "X" ) {
        this.grid[ row ][ column ] = 1
      };
    };
  };
};

Board.prototype.addNewPiece = function( newPiece ) {
  for ( var idx = 0; idx < newPiece.trace.length; idx++ ) {
    this.grid[ newPiece.trace[ idx ][ 0 ] ][newPiece.trace[ idx ][ 1 ]] = "X";
  };
};

Board.prototype.clearNextPiece = function() {
  for ( var row = 0; row < this.nextPreview.length; row++ ) {
    for ( var column = 0; column < 10; column++ ) {
      if ( this.nextPreview[ row ][ column ] === "C") {
        this.nextPreview[ row ][ column ] = 1;
      };
    };
  };
};

Board.prototype.addNextPiece = function( nextPiece ) {
  for ( var idx = 0; idx < nextPiece.previewTrace.length; idx++ ) {
    this.nextPreview[ nextPiece.previewTrace[ idx ][ 0 ] ][ nextPiece.previewTrace[ idx ][ 1 ] ] = "C";
  };
};

Board.prototype.freeze = function( currentPiece ) {
  for ( var row = 0; row < this.grid.length; row++ ) {
    for ( var column = 0; column < 10; column++ ) {
      if ( this.grid[ row ][ column ] === "X" ) {
        this.grid[ row ][ column ] = "C"
      };
    };
  };
};

Board.prototype.canGoDown = function( currentPiece ) {
  for ( var idx = 0; idx < currentPiece.trace.length; idx++ ) {
    if ( !this.grid[ currentPiece.trace[ idx ][ 0 ] + 1 ] || this.grid[ currentPiece.trace[ idx ][ 0 ] + 1 ][ currentPiece.trace[ idx ][ 1 ] ] === "C" ) {
      return false;
    };
  };
  return true;
};

Board.prototype.canGoLeft = function( currentPiece ) {
  for ( var idx = 0; idx < currentPiece.trace.length; idx++ ) {
    if ( !this.grid[ currentPiece.trace[ idx ][ 0 ] ][ currentPiece.trace[ idx ][ 1 ] - 1 ] || this.grid[ currentPiece.trace[ idx ][ 0 ] ][ currentPiece.trace[ idx ][ 1 ] - 1 ] === "C" ) {
      return false;
    };
  };
  return true;
};

Board.prototype.canGoRight = function( currentPiece ) {
  for ( var idx = 0; idx < currentPiece.trace.length; idx++ ) {
    if ( !this.grid[ currentPiece.trace[ idx ][ 0 ] ][ currentPiece.trace[ idx ][ 1 ] + 1] || this.grid[ currentPiece.trace[ idx ][ 0 ] ][ currentPiece.trace[ idx ][ 1 ] + 1 ] === "C" ) {
      return false;
    };
  };
  return true;
};

Board.prototype.canRotate = function( currentPiece ) {
  for ( var idx = 0; idx < currentPiece.trace.length; idx++ ) {
    if ( !this.grid[ currentPiece.possibleTrace()[ idx ][ 0 ] ][ currentPiece.possibleTrace()[ idx ][ 1 ] ] || this.grid[ currentPiece.possibleTrace()[ idx ][ 0 ] ][ currentPiece.possibleTrace()[ idx ][ 1 ] ] === "C" ) {
      return false;
    };
  };
  return true;
};

Board.prototype.checkTop = function( board ) {
  for ( var row = 0; row < 4; row++ ) {
    for ( var column = 0; column < 10; column++ ) {
      if ( this.grid[ row ][ column ] === "C" ) {
        return true
      };
    };
  };
  return false
};

Board.prototype.fullRows = function () {
  var fullRows = [];

  for ( var row = 4; row< 24; row++ ) {
    var full = true
    for ( var column = 0; column < 10; column++ ) {
      if ( this.grid[ row ][ column ] != "C" ) {
        full = false;
      };
    };
    if ( full === true ) {
      fullRows.push( row )
    };
  };
  return fullRows;
};

Board.prototype.breakFullRows = function() {
  for ( var idx = 0; idx < this.fullRows().length; idx++ ) {
    for ( var row = this.fullRows()[ idx ]; row > 1; row-- ) {
      for ( var column = 0; column < 10; column++ ) {
        this.grid[ row ][ column ] = this.grid[ row - 1 ][ column ]
      };
    };
  };
};
