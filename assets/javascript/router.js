define( [ 'models/CollectionModel', 'text!templates/tag/collection.html', 'text!templates/category/collection.html', 'text!templates/author/collection.html' ],
    function( collectionModel, tagCollectionTpl, categoryCollectionTpl, authorCollectionTpl ) {

    console.log("Loaded router.js");

//    var options = {
//        name: "Authors",
//        view: "author",
//        url: '/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?',
//        el: "#authors",
//        template: authorCollectionTpl,
//        parse: function(data) { return data.authors; }
//    };
    var onBeforeListPageShow = function(type, match, ui, options) {
        if (!match) {
            return;
        }
        if (!collectionModel.views[options.view]) {
            console.log("Loading " + name + " View");
            collectionModel.views[options.view] = new collectionModel.EntryListView({
                fetchUrl: options.url,
                el: options.el,
                collectionTemplate: options.template,
                parse: options.parse
            });
        }
        if (collectionModel.views[options.view].collection.length === 0) {
            console.log("Fetch " + name + " Data");
            collectionModel.views[options.view].collection.fetch();
        }
        else {
            collectionModel.views[options.view].render();
        }
    };


    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return new $.mobile.Router({
        "#tagPage" : { handler : "onBeforeTagPageShow", events: "bs" },
        "#categoryPage" : { handler : "onBeforeCategoryPageShow", events: "bs" },
        "#authorPage" : { handler : "onBeforeAuthorPageShow", events: "bs" }
    },
    {
        onBeforeTagPageShow: function(type, match, ui) {
            onBeforeListPageShow(type, match, ui, {
                title: "Tags", el: "#tags", view: "tags", template: tagCollectionTpl,
                url: '/get_tag_index/?exclude=slug,description,parent&callback=?',
                parse: function(data) { return data.tags; }
            });
        },
        onBeforeCategoryPageShow: function(type, match, ui) {
            onBeforeListPageShow(type, match, ui, {
                title: "Categories", el: "#categories", view: "categories", template: categoryCollectionTpl,
                url: '/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?',
                parse: function(data) { return data.categories; }
            });
        },
        onBeforeAuthorPageShow: function(type, match, ui) {
            onBeforeListPageShow(type, match, ui, {
                title: "Authors", el: "#authors", view: "authors", template: authorCollectionTpl,
                url: '/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?',
                parse: function(data) { return data.authors; }
            });
        },
        options: function() {
            appMobile.utils.changePage( "#optionPage", "fade", false, false );
        },
        root: function() {
            appMobile.utils.changePage( "#homePage", "fade", false, false );
        }
    });

} );
