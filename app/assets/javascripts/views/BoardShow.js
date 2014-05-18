Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  render: function() {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    'submit #member-form' : "submit"
  },
  submit: function(event) {
    debugger
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
});
