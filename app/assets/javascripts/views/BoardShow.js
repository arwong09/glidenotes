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
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    var thisBoard = this.model;
    thisBoard.save(params, {
      success: function() {
        var renderedView = this.render();
        $('#content').html(renderedView.$el);
      }
    })
 //    var thisBoard = Trellino.Models.Board
 //    //find this board
 //    //call save on the board passing in the new parameters
 //    
 //    
 //    
 //    
 //    var params = $(event.currentTarget).serializeJSON();
 //    var newList = new Trellino.Models.List(params["list"]);
 //    newList.save({}, {
 //      success: function() {
 //        view.model.lists().add(newList);
 //        var id = view.model.id;
 //        var url = "/board/" + id;
 //        Trellino.router.navigate(url, {trigger: true});
  },
});
