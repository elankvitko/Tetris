function Square( position, color ) {
  this.position = position;
  this.color = color;
};

var rotateCollections = [
                          [ [ 0,1 ], [ -1,0 ], [ 0,-1 ], [ 1,0 ] ],
                          [ [ 0,2 ], [ -2,0 ], [ 0,-2 ], [ 2,0 ] ],
                          [ [ 1,1 ], [ -1,1 ], [ -1,-1 ], [ 1,-1 ] ],
                          [ [ 0,0 ] ]
                        ];

function sameCollection( firstCollection, secondCollection ) = function() {
  if ( firstCollection.length !== secondCollection.length ) {
    return false;
  };

  for ( var idx = firstCollection.length; idx-- ) {
    if ( firstCollection[ idx ] !== secondCollection[ idx ] ) {
      return false;
    };
  };

  return true
};

Square.prototype.nextPosition = function() {
  for ( var idx = 0; idx < rotateCollections.length; idx++ ) {
    for ( var idx2 = 0; idx2 < rotateCollections[ idx ].length; idx2++ ) {
      if ( sameCollection( rotateCollections[ idx ][ idx2 ], this.position ) ) {
        return rotateCollections[ idx ][ ( idx2 + 1 ) ] || rotateCollections[ idx2 ][ 0 ];
      };
    };
  };
};

Square.prototype.rotate = function() {
  this.position = this.nextPosition( this.position );
};

Square.prototype.boardPosition = function( coordinates ) {
  return [ this.position[ 0 ] + coordinates[ 0 ], this.position[ 1 ] + coordinates[ 1 ] ];
};

Square.prototype.nextBoardPosition = function( coordinates ) {
  return [ ( this.nextPosition()[ 0 ] + coordinates[ 0 ] ), ( this.nextPosition()[ 1 ], coordinates[ 1 ] ) ];
};
