Trellino.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],
  render: function() {
    this.model.lists().sort();
    var renderedContent = this.template({model: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  initialize: function() {
    this.listenTo(this.model.lists(), "cardAdded", this.render);
    this.listenTo(this.model.lists(), "cardDestroyed", this.render);
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
      update: function(event, ui) {
        var newRank = 1;
        $('.card-li').each(function() {
          var cardID = $(this).attr('data-id');
          var oldListID = $(this).attr('data-listid');
          var newListID = $(this).parent().attr('data-listid');
          var list = view.model.get('lists').findWhere({id: parseInt(oldListID)});
          var card = list.cards().findWhere({id: parseInt(cardID)});
          card.set({rank: newRank, list_id: parseInt(newListID)});
          card.save();
          newRank++;
        });
      },
      tolerance: 'pointer',
      placeholder: "placeholder"
    });
    
    $( ".sortable-cards" ).disableSelection();
    
    $( ".sortable-lists").sortable({
      connectWith: ".sortable-lists",
      start: function(event, ui) {
        $(ui.item).toggleClass("dragging");
        ui.placeholder.height(ui.item.height());
        ui.placeholder.width(ui.item.width());
        // $(ui.placeholder).toggleClass('custom');
      },
      stop: function(event, ui) {
        $(ui.item).toggleClass("dragging");
      },
      update: function(event, ui) {
        var newRank = 1;
        $('.list-panel').each(function() {
          var listID = $(this).attr('data-id');
          var list = view.model.get('lists').findWhere({id: parseInt(listID)});
          list.set({rank: newRank});
          list.save();
          newRank++;
        });
      },
      tolerance: 'pointer',
      // placeholder: "placeholder" 
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
