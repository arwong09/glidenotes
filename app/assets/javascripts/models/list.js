Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function() {
    return '/api/boards/' + this.board_id + '/lists'
  },
  initialize: function(options) {
   this.board_id = options.board_id; 
  }
});