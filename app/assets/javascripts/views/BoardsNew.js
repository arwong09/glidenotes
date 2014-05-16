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
    debugger
    event.preventDefault();
    var boardTitle = $(event.currentTarget).serializeJSON().board;
    var newModel = new Trellino.Models.Board();
    newModel.save(boardTitle);
    this.collection.add(newModel);
  },
  addBoard: function() {
    debugger
    var view = new Trellino.Views.BoardsIndex({collection: this.collection});
    var renderedView = view.render();
    $('#content').html(renderedView.$el);
  }
});