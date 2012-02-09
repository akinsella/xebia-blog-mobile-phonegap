define( [ 'utils'],
    function( utils ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    console.log("Loading CollectionModel.js");

    var collectionModel = {
        views: {}
    };

    collectionModel.EntryModel = Backbone.Model.extend({});

    collectionModel.EntryCollection = Backbone.Collection.extend({
        model: collectionModel.EntryModel,
        initialize: function(models, options) {
            console.log("Initializing Entry Collection");
            this.url = options.url;
            this.parse = options.parse;
        }
    });

    collectionModel.EntryListView = Backbone.View.extend({
        initialize: function() {
            console.log("Initializing Entry List View");
            this.el = $(this.options.el);
            this.collection = new collectionModel.EntryCollection([], {
                url: utils.getFullUrl(this.options.fetchUrl),
                parse : this.options.parse
            });
            this.collection.bind('reset', this.render, this);
            this.collection.bind('add', this.add, this);
        },

        render: function() {
            console.log("Rendering List View");
            var el = $(this.options.el);
            el.empty();
            var content = _.template( this.options.collectionTemplate, { entries: this.collection.models } );
            el.html(content);
            el.listview('refresh');

            return this;
        }

    });

    return collectionModel;

});
