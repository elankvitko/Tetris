$( document ).ready( function() {
  function Game() {
    this.board = new Board();
    this.boardDisplay = new BoardContainer();
    this.boardPreview = new Preview();
    this.frameRate = 25;
    this.timer = 0;
    this.runningTime = 0;
    this.score = 0;
    this.difficulty = 0;
    this.currentPiece = this.newPiece();
    this.nextPiece = this.newPiece();
    this.interval = null;
  };

  var types = [ "L", "J", "T", "LINE", "Z", "S", "SQUARE" ];

  Game.prototype.newPiece = function() {
    return new Piece( types[ Math.floor( Math.random() * types.length ) ], "red" );
  };

  Game.prototype.refreshBoard = function() {
    this.board.clearCurrentPiece();
    this.board.addNewPiece( this.currentPiece );
    this.boardDisplay.emptyBoard( this.board.grid );
    this.boardDisplay.render( this.board.grid, this.currentPiece );
    this.scorePoints();
    this.updateScore();
    this.board.breakFullRows( this.board );
  }

  Game.prototype.refreshBoardPreview = function() {
    this.board.clearNextPiece();
    this.board.addNextPiece( this.nextPiece );
    this.boardPreview.empty( this.board.nextPreview );
    this.boardPreview.render( this.board.nextPreview, this.nextPiece );
  };

  Game.prototype.scorePoints = function() {
    this.score += ( 10 * this.board.fullRows().length * this.board.fullRows().length );
  };

  Game.prototype.updateScore = function() {
    $( '#score' ).html( this.score );
  }

  Game.prototype.secondsRunning = function() {
    return Math.floor( this.timer / this.frameRate );
  };

  Game.prototype.updateTime = function() {
    $( '#timer' ).html( this.secondsRunning() );
  };

  Game.prototype.loop = function() {
    if ( !this.board.checkTop( this.board ) ) {
      this.timer++;

      if ( this.timer % 10 === 0 ) {
        this.updateTime();
      };

      if ( this.timer % ( 15 - this.difficulty ) === 0 ) {
        if ( this.board.canGoDown( this.currentPiece ) ) {
          this.currentPiece.goDown();
        } else {
          this.board.freeze( this.currentPiece );
          this.currentPiece = this.nextPiece;
          this.nextPiece = this.newPiece();
          this.refreshBoardPreview();
        };
      };
    };
  };

  Game.prototype.startGame = function() {
    this.refreshBoardPreview();
    this.interval = setInterval( this.loop.bind( this ), 1000 / this.frameRate );
  };

  var game = new Game();

  $( document ).on( 'keyup', function( event ) {
    event.preventDefault();

    if ( event.keyCode == 37 && game.board.canGoLeft( game.currentPiece ) ) {
      game.currentPiece.goLeft();
    };

    if ( event.keyCode == 38 && game.board.canRotate( game.currentPiece ) ) {
      game.currentPiece.rotate();
    };
    if ( event.keyCode == 39 && game.board.canGoRight( game.currentPiece ) ) {
      game.currentPiece.goRight();
    };
    if ( event.keyCode == 40 && game.board.canGoDown( game.currentPiece ) ) {
      game.currentPiece.goDown();
    };
    if ( event.keyCode == 32 && game.board.canGoDown( game.currentPiece ) ) {
      while( game.board.canGoDown( game.currentPiece ) ) {
        game.currentPiece.goDown();
      };
    };
    game.refreshBoard();
  });

  $( '#begin' ).on( 'click', function( event ) {
    game.startGame();
  });
});
