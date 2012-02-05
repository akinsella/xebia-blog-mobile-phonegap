define( ['jquery', 'backbone', 'models/CategoryEntry', 'views/tagList'], function( $, Backbone, CategoryEntry, CategoryList ) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    var CategoryCollection = Backbone.Collection.extend( {
        model: CategoryEntry,
        parse: function( response ) {
            return response;
        },
        initialize: function() {
            this.categoryList = new CategoryList;
            this.bind( "reset", this.categoryList.renderList );
        }
    } );

    return CategoryCollection;
});
            
