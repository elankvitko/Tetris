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

  var types = [ "L", "J", "T", "LINE", "Z", "S", "BOX" ];

  Game.prototype.newPiece = function() {
    return new Piece( types[ Math.floor( Math.random() * types.length ) ], "red" );
  };

  var game = new Game();
});
