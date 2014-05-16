Trellino.Collections.Lists = Backbone.Collection.extend({
  url: '/api/boards/:board_id/lists',
  model: Trellino.Models.List
});