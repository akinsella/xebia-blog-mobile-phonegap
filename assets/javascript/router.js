define( [ 'models/CollectionModel', 'text!templates/tag/collection.html', 'text!templates/category/collection.html', 'text!templates/author/collection.html' ],
    function( collectionModel, tagCollectionTpl, categoryCollectionTpl, authorCollectionTpl ) {

    console.log("Loaded router.js");

    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    return new $.mobile.Router({
        "#tagPage" : { handler : "onBeforeTagPageShow", events: "bs" },
        "#categoryPage" : { handler : "onBeforeCategoryPageShow", events: "bs" },
        "#authorPage" : { handler : "onBeforeAuthorPageShow", events: "bs" }
    },
    {
        onBeforeTagPageShow: function(type, match, ui) {
            var modelType = "Tag";
            if (!match) {
                return;
            }
            if (!collectionModel.views.tagView) {
                console.log("Loading " + modelType + " View");
                collectionModel.views.tagView = new collectionModel.EntryListView({
                    fetchUrl: '/get_tag_index/?exclude=slug,description,parent&callback=?',
                    el: "#tags",
                    collectionTemplate: tagCollectionTpl,
                    parse: function(data) {
                        return data.tags;
                    }
                });
            }
            if (collectionModel.views.tagView.collection.length === 0) {
                console.log("Fetch " + modelType + " Data");
                collectionModel.views.tagView.collection.fetch();
            }
            else {
                collectionModel.views.tagView.render();
            }
        },
        onBeforeCategoryPageShow: function(type, match, ui) {
            var modelType = "Categories";
            if (!match) {
                return;
            }
            if (!collectionModel.views.categoryView) {
                console.log("Loading " + modelType + " View");
                collectionModel.views.categoryView = new collectionModel.EntryListView({
                    fetchUrl: '/get_category_index/?exclude=slug,description,parent&callback=?',
                    el: "#categories",
                    collectionTemplate: categoryCollectionTpl,
                    parse: function(data) {
                        return data.categories;
                    }
                });
            }
            if (collectionModel.views.categoryView.collection.length === 0) {
                console.log("Fetch " + modelType + " Data");
                collectionModel.views.categoryView.collection.fetch();
            }
            else {
                collectionModel.views.categoryView.render();
            }
        },
        onBeforeAuthorPageShow: function(type, match, ui) {
            var modelType = "Authors";
            if (!match) {
                return;
            }
            if (!collectionModel.views.authorView) {
                console.log("Loading " + modelType + " View");
                collectionModel.views.authorView = new collectionModel.EntryListView({
                    fetchUrl: '/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?',
                    el: "#authors",
                    collectionTemplate: authorCollectionTpl,
                    parse: function(data) {
                        return data.authors;
                    }
                });
            }
            if (collectionModel.views.authorView.collection.length === 0) {
                console.log("Fetch " + modelType + " Data");
                collectionModel.views.authorView.collection.fetch();
            }
            else {
                collectionModel.views.authorView.render();
            }
        },
        options: function() {
            appMobile.utils.changePage( "#optionPage", "fade", false, false );
        },
        root: function() {
            appMobile.utils.changePage( "#homePage", "fade", false, false );
        }
    });

} );
