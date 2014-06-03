Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function() {
    return '/api/boards/' + this.board_id + '/lists'
  },
  
  initialize: function(options) {
   this.board_id = options.board_id; 
  },
  
  cards: function(){
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards(this.get('cards'), {
        list: this
      });
    }
  return this._cards;
  },
  
  parse: function(response) {
    if(response.cards) {
      this.cards().set(response.cards);
      delete response.cards;
    }
    
    return response;
  }
});