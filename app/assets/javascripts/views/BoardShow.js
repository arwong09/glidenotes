Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  render: function() {
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  initialize: function() {
    this.listenTo(this.model.lists(), "cardAdded", this.render);
    this.listenTo(this.model.lists(), "cardDestroyed", this.render);
    // this.listenTo(this, "renderFinished", this.handleSorting);
  },
  handleSorting: function() {
    var view = this;
    
    $( ".sortable-cards" ).sortable({
      connectWith: ".sortable-cards",
      start: function(event, ui) {
        $(ui.item).toggleClass("dragging");
        ui.placeholder.height(ui.item.height());
      },
      stop: function(event, ui) {
        $(ui.item).toggleClass("dragging");
      },
      update: function() {
        var newRank = 1;
        $('.card-li').each(function() {
          var cardID = $(this).attr('data-id');
          var listID = $(this).attr('data-listid');
          var list = view.model.get('lists').findWhere({id: parseInt(listID)});
          var card = list.cards().findWhere({id: parseInt(cardID)});
          card.set({rank: newRank});
          card.save();
          newRank++;
        });
      },
      placeholder: "placeholder"
    });
    
    $( ".sortable-cards" ).disableSelection();
    
    $( ".sortable-lists").sortable({
      start: function(event, ui) {
        $(ui.item).toggleClass("dragging");
        ui.placeholder.height(ui.item.height());
      },
      stop: function(event, ui) {
        $(ui.item).toggleClass("dragging");
      },
      placeholder: "placeholder" 
    });
    $( ".sortable-lists").disableSelection();
  },
  events: {
    'submit #member-form' : "submit",
    'click .glyphicon-plus' : "newCardView",
    'click .trash-hover' : 'destroyCard'
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
    $('#add-card-' + listID).html(view.render().$el);
  },
  destroyCard: function(event) {
    event.preventDefault();
    var listID = $(event.currentTarget).attr("data-listid");

    var list = this.model.lists().findWhere({id: parseInt(listID)});
    
    var cardID = $(event.currentTarget).attr("data-id");
    var card = list.cards().findWhere({id: parseInt(cardID)});
    card.destroy();
    list.trigger('cardDestroyed');
  }
});
