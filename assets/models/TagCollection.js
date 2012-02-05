define( ['jquery', 'backbone', 'models/TagEntry', 'views/tagList'], function( $, Backbone, TagEntry, TagList ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return Backbone.Collection.extend( {
        model: TagEntry,
        parse: function( response ) {
            return response;
        },
        initialize: function() {
            this.tagList = new TagList;
            this.bind( "reset", this.tagList.renderList );
        }
    } );

});
            
