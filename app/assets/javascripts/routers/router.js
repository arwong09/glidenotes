Trellino.Routers.BoardRouter = Backbone.Router.extend({
  routes: {
    '': 'indexView',
    'board/new': 'newView'
  },
  
  indexView: function() {
    Trellino.Collections.boards.fetch();
    var view = new Trellino.Views.BoardsIndex({collection: Trellino.Collections.boards});
    var renderedView = view.render();
    $('#content').html(renderedView.$el);
  },
  
  newView: function() {
    var view = new Trellino.Views.BoardsNew({collection: Trellino.Collections.boards});
    var renderedView = view.render();
    $('#content').html(renderedView.$el);
  }
});