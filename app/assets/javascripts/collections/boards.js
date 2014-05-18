Trellino.Collections.Boards = Backbone.Collection.extend({
  url: '/api/boards',
  model: Trellino.Models.Board,
  // ownedBy: function(userID) {
 //    var filtered = this.filter(function(board){
 //      return board.get("id") === userID;
 //    });
 //    return new Trellino.Collections.Boards(filtered)
 //  }
});

