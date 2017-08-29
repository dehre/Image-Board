//set up Handlebars
Handlebars.templates = Handlebars.templates || {};
const templates = document.querySelectorAll('template');
Array.prototype.slice.call(templates).forEach(function(tmpl) {
    Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
});


//create Model to handle data for home page
const HomeModel = Backbone.Model.extend({
  initialize: function(){
    this.fetch();
  },
  url: '/images'
});

//create View for home page
const HomeView = Backbone.View.extend({
  initialize: function(){
    var view = this;
    //re-render the view whenever model changes
    this.model.on('change', function(){
      view.render();
    })
  },
  render: function(){
    const html = Handlebars.templates.home(this.model.toJSON());
    this.$el.html(html);
  }
});

//create View for uploading images to server
const UploadView = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  render: function(){
    const html = Handlebars.templates.upload({});
    this.$el.html(html);
  },
  events: {
    'click button': function(e){
      console.log('button clicked in BAckbone');
    }
  }
});


const homeView = new HomeView({
  model: new HomeModel(),
  el: '#main'
});
const uploadView = new UploadView({
  el: '#uploadField'
});


//create basic router
const Router = Backbone.Router.extend({
  routes: {
    '': 'home'
  },
  home:function(){
    homeView.render();
  }
});
