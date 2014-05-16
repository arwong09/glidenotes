Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST['boards/index'],
  render: function() {
    var renderedContent = this.template({ collection: this.collection });
    this.$el.html(renderedContent);
    return this;
  },
  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  }
});