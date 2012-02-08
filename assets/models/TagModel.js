define( ['backbone', 'utils', 'jquery', 'underscore', 'app', 'text!templates/tag/list.html'],
    function( Backbone, utils, $, _, app, tagListTemplate ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    var tagModel = {
        models: {},
        collections: {},
        views: {}
    };

    tagModel.models.TagEntry = Backbone.Model.extend({});

    tagModel.collections.TagCollection = Backbone.Collection.extend({
        model: tagModel.models.TagEntry,
        parse : function(data) {
          return data.tags;
        },
        url: utils.getFullUrl('/get_tag_index/?exclude=slug,description,parent&callback=?')
    });

    tagModel.views.TagListView = Backbone.View.extend({
        el: $("#tags"),

        initialize: function() {
            this.collection.bind('reset', this.render, this);
            this.collection.bind('add', this.add, this);
        },

        render: function() {
            console.log("Rendering Tag View");
            var el = $("#tags");
            el.empty();
            var ulContent = _.template( tagListTemplate, { tags: this.collection.models } );
            el.html(ulContent);
            el.listview('refresh');

            return this;
        },

        add: function(item) {
           var tagsList = $('#tags-list'),
               template = this.template;

           tagsList.append(template(item.toJSON()));
           tagsList.listview('refresh');
        }

    });

    tagModel.initTagData = function() {
        console.log("Loading Tag View");
        tagModel.entries = new tagModel.collections.TagCollection();
        tagModel.view = new tagModel.views.TagListView({collection: tagModel.entries});
        tagModel.view.render();
        console.log("Fetch Tag Data");
        tagModel.entries.fetch();
    };

    return tagModel;

});
