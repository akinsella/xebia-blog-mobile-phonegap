define( ['jquery', 'backbone', 'underscore','text!templates/author-item.html'], function( $, Backbone, _ , authorTemplate) {

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return Backbone.View.extend( {
        el: $( "#authors" ),

        initialize: function() {},

        renderList: function( collection ) {
            var compiledTemplate = _.template(authorTemplate);

            xebiaMobile.utils.loadPrompt( "Loading authors ..." );
            $( '#authorPage .ui-title' ).html( 'Author view' );
            collection.authorList.el.html( compiledTemplate( { results: collection.models } ) );

            setTimeout( function() { collection.authorList.el.listview('refresh'); }, 0 );
        }
    } );

} );
