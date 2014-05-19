Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function() {
    return '/api/boards/' + this.board_id + '/lists'
  },
  initialize: function(options) {
   this.board_id = options.board_id; 
  },
  cards: function(){
    if (!this.get('cards')) {
      var listCards = new Trellino.Collections.Cards([], {
        list: this
      });
      
      this.set({
        cards: listCards
      })
    }
    return this.get('cards');
  },
  parse: function(response) {
    if(response['cards']) {
      this.cards().set(response["cards"]);
      delete response["cards"];
    }
    return response;
  }
});