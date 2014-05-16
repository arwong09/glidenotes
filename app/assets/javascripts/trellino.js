window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Trellino.Collections.boards = new Trellino.Collections.Boards();
    new Trellino.Routers.BoardRouter();
    Backbone.history.start();
  }
}

$(Trellino.initialize);
