Trellino.Models.Card = Backbone.Model.extend({
  initialize: function(options) {
    this.list_id = options.list_id
  },
  urlRoot: function() {
    return '/api/lists/' + this.list_id + '/cards'
  },
});