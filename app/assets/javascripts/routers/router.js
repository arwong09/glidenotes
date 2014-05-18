Trellino.Routers.BoardRouter = Backbone.Router.extend({
  routes: {
    '': 'indexView',
    'board/new': 'newView',
    'board/:id': 'showView',
    'board/:id/lists': 'newList'
  },
  
  indexView: function() {
    Trellino.Collections.boards.fetch();
    var view = new Trellino.Views.BoardsIndex({collection: Trellino.Collections.boards});
    // var renderedView = view.render();
    $('#content').html(view.$el);
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
        var thisModel = thisCollection.findWhere({'id': parseInt(id)});
        var view = new Trellino.Views.BoardShow({model: thisModel});
        var renderedView = view.render();
        $('#content').html(renderedView.$el);
      }
    }); 
  },
  
  newList: function(id) {
    var thisCollection = Trellino.Collections.boards;
    thisCollection.fetch({
      success: function() {
        var thisBoard = thisCollection.findWhere({'id': parseInt(id)});
        var thisLists = thisBoard.lists();
        var view = new Trellino.Views.ListsNew({collection: thisLists, model: thisBoard});
        var renderedView = view.render();
        $('#content').html(renderedView.$el);
      }
    });  
  }
});