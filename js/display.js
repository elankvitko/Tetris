var BoardContainer = function() {
  for ( var idx = 0; idx < 24; idx++ ) {
    $( '#board-container' ).append( '<tr id="row-' + idx + '"></tr>' );
  };

  for ( var idx = 0; idx < 24; idx++ ) {
    for ( var idx2 = 0; idx2 < 10; idx2++ ) {
      $( '#row-' + idx ).append( '<td class="col-' + idx2 + '">[]</td>' );
    };
  };
};

var Preview = function() {
  for ( var idx = 0; idx < 6; idx++ ) {
    $( '#next-piece-preview' ).append( '<tr id="row-' + idx + '"></tr>' );
  };
  for ( var idx = 0; idx < 6; idx++ ) {
    for ( var idx2; idx2 < 6; idx2++ ) {
      $( '#row-' + idx ).append( '<td class="col-' + idx2 + '">[]</td>' );
    };
  };
};

BoardContainer.prototype.emptyBoard = function( board ) {
  for ( var row = 0; row < board.length; row++ ) {
    for ( var column = 0; column < board[ row ].length; column++ ) {
      $( '#board-container #row-' + row + ' .col-' + column ).css( "color", "white" );
      $( '#board-container #row-' + row + ' .col-' + column ).css( "background-color", "white" );
    };
  };
};

BoardContainer.prototype.render = function( board, currentPiece ) {
  for ( var row = 0; row < board.length; row++ ) {
    for ( var column = 0; column < board[ row ].length; column++ ) {
      if ( board[ row ][ column ] === "C" ) {
        $( '#board-container #row-' + row + ' .col-' + column ).css( "color", "black" );
        $( '#board-container #row-' + row + ' .col-' + column ).css( "background-color", "black" );
      };
      if ( board[ row ][ column ] === "X" ) {
        $( '#board-container #row-' + row + ' .col-' + column ).css( "color", currentPiece.color );
        $( '#board-container #row-' + row + ' .col-' + column ).css( "background-color", currentPiece.color );
      };
    };
  };
};

Preview.prototype.render = function( preview, nextPiece ) {
  for ( var row = 0; row < preview.length; row++ ) {
    for ( var column = 0; column < preview[ row ].length; column++ ) {
      if ( preview[ row ][ column ] === "C" ) {
        $( '#next-piece-preview #row-' + row + ' .col-' + column ).css( "color", nextPiece.color );
        $( '#next-piece-preview #row-' + row + ' .col-' + column ).css( "background-color", nextPiece.color );
      };
    };
  };
};

Preview.prototype.empty = function( preview ) {
  for ( var row = 0; row < preview.length; row++ ) {
    for ( var column = 0; column < preview[ row ].length; column++ ) {
      $( '#next-piece-preview #row-' + row + ' .col-' + column ).css( "color", "white" );
      $( '#next-piece-preview #row-' + row + ' .col-' + column ).css( "background-color", "white" );
    };
  };
};
