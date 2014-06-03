Trellino.Views.CardsNew = Backbone.View.extend({
  template: JST['cards/new'],
  render: function() {
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  events: {
    "submit #new-submit": "submit"
  },
  initialize: function() {
    this.listenTo(this.model.cards(), 'add', this.cardAdded)
  },
  cardAdded: function() {
    this.model.trigger('cardAdded')
  },
  submit: function(event) {
    var view = this;
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var newCard = new Trellino.Models.Card(params["card"]);
    newCard.save({}, {
      success: function() {
        view.model.cards().add(newCard);
        $('#content').html(view.render().$el); 
        view.delegateEvents();
      }
    });
  }
});