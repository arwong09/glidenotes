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

    var boardTitle = $(event.currentTarget).serializeJSON().board;
    var newModel = new Trellino.Models.Board();
    newModel.save(boardTitle);
    this.collection.add(newModel);
  },
  addBoard: function() {
    var view = new Trellino.Views.BoardsIndex({collection: this.collection});
    if(this.collection.length === 1) {
      this.collection.fetch();
    } else {
      var renderedView = view.render();
      $('#content').html(renderedView.$el);
    }
  }
});