Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  render: function() {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    'submit #member-form' : "submit",
    'click .glyphicon-plus' : "newCardView",
  },
  submit: function(event) {
    var view = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var thisBoard = this.model;
    thisBoard.save(params, {
      success: function() {
        var renderedView = view.render();
        $('#content').html(renderedView.$el);
        view.delegateEvents();
      },
      error: function() {
        $('#errors').html("User not found").addClass('alert alert-danger');
      }
    })
  },
  newCardView: function(event) {
    event.preventDefault();
    var listID = $(event.currentTarget).attr("data-id");
    var list = this.model.lists().findWhere({id: parseInt(listID)});
    var view = new Trellino.Views.CardsNew({board: this.model, model: list});
    $('#content').html(view.render().$el);
  }
});
