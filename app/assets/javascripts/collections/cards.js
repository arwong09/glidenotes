Trellino.Collections.Cards = Backbone.Collection.extend({
  url: function() {
    return '/api/lists/' + this.list.id + '/cards';
  },
  model: Trellino.Models.Card,
  
  initialize: function(models, options) {
    this.list = options.list;
  }

})