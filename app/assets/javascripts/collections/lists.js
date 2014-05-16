Trellino.Collections.Lists = Backbone.Collection.extend({
  url: function() {
    '/api/boards/' + this.board.id + '/lists';
  },
  
  model: Trellino.Models.List,
  
  initialize: function(models, options) {
    this.board = options.board;
  },
  
  comparator: 'rank'
});