Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  render: function() {
    var renderedContent = this.template({ collection: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  initialize: function() {
    this.listenTo(this.collection, "sync remove", this.render);
  },
  events: {
    "click .board-remove": "destroyBoard"
  },
  destroyBoard: function(event) {
    event.preventDefault();
    var id = $(event.target).attr("data-id");
    var model = Trellino.Collections.boards.findWhere({id: parseInt(id)});
    model.destroy();
  }
});