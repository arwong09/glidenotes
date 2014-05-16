Trellino.Models.Board = Backbone.Model.extend({
  url: '/api/boards',
  
  // addBoard: function(attr) {
  //   var indexView = new Trellino.Views.BoardsIndex({collection: this.collection});
  //   var renderedView = indexView.render();
  //   $('#content').html(renderedView.$el);
  // }
});