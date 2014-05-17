Trellino.Views.ListsNew = Backbone.View.extend({
  template: JST['lists/new'],
  render: function() {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    "submit #new-submit": "submit"
  },
  submit: function(event) {
    var view = this;
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newList = new Trellino.Models.List(params["list"]);
    newList.save({}, {
      success: function() {
        view.model.lists().add(newList);
        var id = view.model.id;
        var url = "/board/" + id;
        Trellino.router.navigate(url, {trigger: true});
      }
    });
  }
});