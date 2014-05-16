window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Trellino.Collections.boards = new Trellino.Collections.Boards();
    Trellino.router = new Trellino.Routers.BoardRouter();
    Backbone.history.start();
  }
}

$(Trellino.initialize);
