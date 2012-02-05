define( ['jquery', 'backbone', 'underscore','text!templates/tag-item.html'], function( $, Backbone, _ , tagTemplate) {

            // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
            "use strict";

            var TagList = Backbone.View.extend( {
                el: $( "#tags" ),

                initialize: function() {},

                renderList: function( collection ) {
                    var compiledTemplate = _.template(tagTemplate);

                    xebiaMobile.utils.loadPrompt( "Loading tags ..." );
                    $( '#tagPage .ui-title' ).html( 'Tag view' );
                    collection.tagList.el.html( compiledTemplate( { results: collection.models } ) );

                    setTimeout( function() { collection.tagList.el.listview('refresh'); }, 0 );
                }
            } );

            return TagList;
        } );
