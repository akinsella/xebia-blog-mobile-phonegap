define( ['jquery', 'backbone', 'underscore','text!templates/category-item.html'], function( $, Backbone, _ , categoryTemplate) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return Backbone.View.extend( {
        el: $( "#categories" ),

        initialize: function() {},

        renderList: function( collection ) {
            var compiledTemplate = _.template(categoryTemplate);

            xebiaMobile.utils.loadPrompt( "Loading categories ..." );
            $( '#categoryPage .ui-title' ).html( 'Category view' );
            collection.categoryList.el.html( compiledTemplate( { results: collection.models } ) );

            setTimeout( function() { collection.categoryList.el.listview('refresh'); }, 0 );
        }
    } );

} );
