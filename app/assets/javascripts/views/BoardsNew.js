Trellino.Views.BoardsNew = Backbone.View.extend({
  template: JST['boards/new'],
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    "submit #new-submit" : "submit"
  },
  initialize: function() {
    this.listenTo(this.collection, "add", this.addBoard);
  },
  submit: function(event) {
    event.preventDefault();
    var titleAttr = $(event.currentTarget).serializeJSON().board;
    this.collection.create(titleAttr, {wait: true});
  },
  addBoard: function() {
    var id = this.collection.last().id;
    var url = "/board/" + id;
    Trellino.router.navigate(url, {trigger: true});
  }
});