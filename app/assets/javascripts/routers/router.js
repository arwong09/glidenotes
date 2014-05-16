Trellino.Routers.BoardRouter = Backbone.Router.extend({
  routes: {
    '': 'indexView',
    'board/new': 'newView',
    'board/:id': 'showView'
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
  },
  
  showView: function(id) {
    var thisCollection = Trellino.Collections.boards;
    thisCollection.fetch({
      success: function() {
        var thisModel = thisCollection.findWhere({ 'id': parseInt(id) });
        var view = new Trellino.Views.BoardShow({model: thisModel});
        var renderedView = view.render();
        $('#content').html(renderedView.$el);
      }
    }); 
  }
});