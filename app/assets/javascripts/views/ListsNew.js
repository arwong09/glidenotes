Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST['lists/new'];
  render: function() {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});