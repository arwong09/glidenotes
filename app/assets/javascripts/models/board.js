Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',
  
  lists: function() {
    if (!this.get('lists')) {
      var boardLists = new Trellino.Collections.Lists([], {
        board: this
      });
    
      this.set({
        lists: boardLists
      });
    }
    return this.get('lists');
  },
  
  parse: function(response) {
    if (response["lists"]) {
      this.lists().set(response["lists"]);
      delete response["lists"];
    }
    return response;
  }
});