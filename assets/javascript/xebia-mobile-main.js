
// ******************************************************************************
// * Global variables
// ******************************************************************************

var db;
var dbName = "xebia";

var options;

var DEFAULT_OPTIONS = {
    cacheData: false
};

// ******************************************************************************
// * Events
// ******************************************************************************

function onMobileInit() {

    $.mobile.defaultPageTransition = 'fade';

    $('#homePage').live('pageshow', function(event, ui) { onHomePageShow(); });
    $('#recentPostPage').live('pageshow', function(event, ui){ onRecentPostPageShow(); });
    $('#categoryPage').live('pageshow', function(event, ui){ onCategoryPageShow(); });
    $('#categoryPage').live('pagebeforeshow', function(event, ui){ onCategoryPageBeforeShow(); });
    $('#authorPage').live('pageshow', function(event, ui){ onAuthorPageShow(); });
    $('#authorPage').live('pagebeforeshow', function(event, ui){ onAuthorPageBeforeShow(); });
    $('#logPage').live('pageshow', function(event, ui) { onLogPageShow(); });
    $('#tagOptionPage').live('pageshow', function(event, ui){ onTagOptionPageShow(); });
    $('#tagPage').live('pageshow', function(event, ui){ onTagPageShow(); });
    $('#tagPage').live('pagebeforeshow', function(event, ui){ onTagPageBeforeShow(); });
    $('#postDetailPage').live('pageshow', function(event, ui) { onPostDetailPageShow(); });
    $('#postByAuthorPage').live('pageshow', function(event, ui) { onPostByAuthorPageShow(); });
    $('#postByTagPage').live('pageshow', function(event, ui) { onPostByTagPageShow(); });
    $('#postByCategoryPage').live('pageshow', function(event, ui) { onPostByCategoryPageShow(); });
    $('#insightPage').live('pageshow', function(event, ui) { onInsightPageShow(); });


    db = Lawnchair({name: dbName}, function(e) {
   		info('Storage open');
   	});

    options = db.get("options", function(options) {
        if (!options) {
            options = DEFAULT_OPTIONS;
            db.save({ key: "options", value: options });
        }
    });
}

function onHomePageShow() {
    // Write some code
}

function onRecentPostPageShow() {
    loadPostsContent('#recentPosts', getFullUrl('/get_recent_posts/?callback=?'), function(data) { });
}

function onPostByAuthorPageShow() {
    $('#postByAuthorPageNav').hide();

    var authorId = parseInt(getParameterByName("author"));
    var page = parseInt(getParameterByName("page"));
    var pageSize = parseInt(getParameterByName("count"));

    if (isNaN(page)) { page = 1; }
    if (isNaN(pageSize)) { pageSize = DEFAULT_ITEM_BY_PAGE; }

    loadPostsContent('#postByAuthor', getFullUrl('/get_author_posts/?exclude=slug,description,parent,nickname,first_name,last_name,url&author_id=' + authorId + '&page=' + page + '&count=' + pageSize + DEFAULT_POST_PARAMS + '&callback=?'),
        function(data) {
            /* Set title */
            $('#postByAuthorTitleAuthor').text(data.author.name);

            /* page = data.page; */
            var pages = data.pages;
            var results = data.count;

            if (page > 1) {
                $('#postByAuthorPageNavPrev').show();
                $('#postByAuthorPageNavPrev a').attr('href', 'index.html?author=' + data.author.id + '&count=' + pageSize + '&page=' + (page - 1) + '#postByAuthorPage');
                $('#postByAuthorPageNavPrev a').attr('rel', 'external');
            }
            else {
                $('#postByAuthorPageNavPrev').hide();
                $('#postByAuthorPageNavPrev a').attr('href', '');
                $('#postByAuthorPageNavPrev a').attr('rel', '');
            }

            $('#postByAuthorPageNavTitle').text('Page ' + page + ' of ' + pages);


            if (page < pages) {
                $('#postByAuthorPageNavNext').show();
                $('#postByAuthorPageNavNext a').attr('href', 'index.html?author=' + data.author.id + '&count=' + pageSize + '&page=' + (page + 1) + '#postByAuthorPage');
                $('#postByAuthorPageNavNext a').attr('rel', 'external');
            }
            else {
                $('#postByAuthorPageNavNext').hide();
                $('#postByAuthorPageNavNext a').attr('href', '');
                $('#postByAuthorPageNavNext a').attr('rel', '');
            }

            $('#postByAuthorPageNav').show();
        });
}

function onPostByCategoryPageShow() {
    $('#postByCategoryPageNav').hide();

    var categoryId = parseInt(getParameterByName("category"));
    var page = parseInt(getParameterByName("page"));
    var pageSize = parseInt(getParameterByName("count"));

    if (isNaN(page)) { page = 1; }
    if (isNaN(pageSize)) { pageSize = DEFAULT_ITEM_BY_PAGE; }

    loadPostsContent('#postByCategory', getFullUrl('/get_category_posts/?exclude=slug,description,parent&category_id=' + categoryId + '&page=' + page + '&count=' + pageSize + DEFAULT_POST_PARAMS + '&callback=?'),
        function(data) {
            /* Set title */
            $('#postByCategoryTitleCategory').text(data.category.title);

            /* page = data.page; */
            var pages = data.pages;
            var results = data.count;

            if (page > 1) {
                $('#postByCategoryPageNavPrev').show();
                $('#postByCategoryPageNavPrev a').attr('href', 'index.html?category=' + data.category.id + '&count=' + pageSize + '&page=' + (page - 1) + '#postByCategoryPage');
                $('#postByCategoryPageNavPrev a').attr('rel', 'external');
            }
            else {
                $('#postByCategoryPageNavPrev').hide();
                $('#postByCategoryPageNavPrev a').attr('href', '');
                $('#postByCategoryPageNavPrev a').attr('rel', '');
            }

            $('#postByCategoryPageNavTitle').text('Page ' + page + ' of ' + pages);


            if (page < pages) {
                $('#postByCategoryPageNavNext').show();
                $('#postByCategoryPageNavNext a').attr('href', 'index.html?category=' + data.category.id + '&count=' + pageSize + '&page=' + (page + 1) + '#postByCategoryPage');
                $('#postByCategoryPageNavNext a').attr('rel', 'external');
            }
            else {
                $('#postByCategoryPageNavNext').hide();
                $('#postByCategoryPageNavNext a').attr('href', '');
                $('#postByCategoryPageNavNext a').attr('rel', '');
            }

            $('#postByCategoryPageNav').show();
        });
}

function onPostByTagPageShow() {
    $('#postByTagPageNav').hide();

    var authorId = parseInt(getParameterByName("tag"));
    var page = parseInt(getParameterByName("page"));
    var pageSize = parseInt(getParameterByName("count"));

    if (isNaN(page)) { page = 1; }
    if (isNaN(pageSize)) { pageSize = DEFAULT_ITEM_BY_PAGE; }

    loadPostsContent('#postByTag', getFullUrl('/get_tag_posts/?exclude=slug,description,parent&tag_id=' + authorId + '&page=' + page + '&count=' + pageSize + DEFAULT_POST_PARAMS + '&callback=?'),
        function(data) {
            /* Set title */
            $('#postByTagTitleTag').text(data.tag.title);

            /* page = data.page; */
            var pages = data.pages;
            var results = data.count;

            if (page > 1) {
                $('#postByTagPageNavPrev').show();
                $('#postByTagPageNavPrev a').attr('href', 'index.html?tag=' + data.tag.id + '&count=' + pageSize + '&page=' + (page - 1) + '#postByTagPage');
                $('#postByTagPageNavPrev a').attr('rel', 'external');
            }
            else {
                $('#postByTagPageNavPrev').hide();
                $('#postByTagPageNavPrev a').attr('href', '');
                $('#postByTagPageNavPrev a').attr('rel', '');
            }

            $('#postByTagPageNavTitle').text('Page ' + page + ' of ' + pages);


            if (page < pages) {
                $('#postByTagPageNavNext').show();
                $('#postByTagPageNavNext a').attr('href', 'index.html?tag=' + data.tag.id + '&count=' + pageSize + '&page=' + (page + 1) + '#postByTagPage');
                $('#postByTagPageNavNext a').attr('rel', 'external');
            }
            else {
                $('#postByTagPageNavNext').hide();
                $('#postByTagPageNavNext a').attr('href', '');
                $('#postByTagPageNavNext a').attr('rel', '');
            }

            $('#postByTagPageNav').show();
        });
}

function onCategoryPageBeforeShow() {
    $("#categories").empty();
}

function onCategoryPageShow() {
    loadCategoriesContent('#categories', getFullUrl('/get_category_index/?exclude=slug,description,parent&callback=?'));
}

function onTagPageBeforeShow() {
    $("#tags").empty();
}

function onTagOptionPageShow() {
    info("Loading tag option page");
}

function onTagPageShow() {
    loadContent( '#tags',
        'tags',
        getFullUrl('/get_tag_index/?exclude=slug,description,parent&callback=?'),
        function(data) { return buildHtmlTagsContent(selectMoreReadTags(data, MAX_VIEW_ITEMS), false) },
        function(data) { return data.tags },
        options);
}

function onAuthorPageBeforeShow() {
    $("#authors").empty();
}

function onAuthorPageShow() {
    loadAuthorsContent('#authors', getFullUrl('/get_author_index/?exclude=slug,description,parent,nickname,first_name,last_name,url&callback=?'));
}

function onPostDetailPageShow() {
    var postId = getParameterByName("post");
    loadPostDetailContent(getFullUrl('/get_post/?post_id=' + postId + '&callback=?'));
}

function onInsightPageShow() {
    loadInsightContent();
}

function onLogPageShow() {
    loadLogContent('#logs');
}


// ******************************************************************************
// * Functions
// ******************************************************************************

// ******************************************************************************
// * Tags
// ******************************************************************************

//function refreshTagListByLetters(start, _tags, letters, element) {
//    var itemsContent = buildHtmlTagsContent(start, selectByLetters(_tags, letters), false);
//    refreshTagList(start, itemsContent, element);
//}
//
//function selectByLetters(tags, letters) {
//    return _.sortBy(_.filter(tags,
//                    function(tag) { return tag.name.length > 0 && _.include(tag.name[0], letters); }),
//                    function(tag) { return tag.name; });
//}

function selectMoreReadTags(tags, max) {
    return _.sortBy(tags, function(tag) { return tag.post_count; }).reverse().slice(0, max);
}

function buildHtmlTagsContent(tags, dividers) {
    var start = new Date();
    info("Building HTML content: " + showInterval(start));
    var itemsContent = '';
    var currentFirstLetter = '';
    $.each(tags, function (i, tag) {
        var firstLetter = tag.title.substr(0, 1).toUpperCase();
        var currentFirstLetterChanged = firstLetter != currentFirstLetter;
        currentFirstLetter = firstLetter;
        if (currentFirstLetterChanged && dividers) {
            itemsContent += '<li data-role="list-divider">' + currentFirstLetter + '</li>';
        }
        var title = '<h3>' + tag.title + '</h3>';
        var bubble = '<span class="ui-li-count">' + tag.post_count + '</span>';
        var link = 'index.html?tag=' + tag.id + '#postByTagPage';

        itemsContent += '<li><a href="' + link + '" rel="external">' + title + bubble + '</a></li>\n';
    });
    info("HTML content built: " + showInterval(start));
    return itemsContent;
}

// ******************************************************************************
// * Categories
// ******************************************************************************

function loadCategoriesContent(element, url) {
    $.mobile.showPageLoadingMsg();
    $.getJSON( url, function( data ) {
        $(element).empty();
        var itemsContent = '';
        var categories = _.sortBy(data.categories, function(category){ return category.name; });
        $.each(categories, function(i, category) {
            var title = '<h3>' + category.title + '</h3>';
            var subtitle = '<p><em>' + category.description + '</em></p>';
            var bubble = '<span class="ui-li-count">' + category.post_count + '</span>';
            var link = 'index.html?category=' + category.id + '#postByCategoryPage';
            itemsContent += '<li><a href="' + link + '" rel="external">' + title + subtitle + bubble + '</a></li>';
        });

        $(element).append(itemsContent);
        $(element).listview("refresh");
        $.mobile.hidePageLoadingMsg();
    });
}

function loadAuthorsContent(element, url) {
    $.mobile.showPageLoadingMsg();
    $.getJSON( url, function( data ) {
        $(element).empty();
        var itemsContent = '';
        var authors = _.sortBy(data.authors, function(author){ return author.name; });
        $.each(authors, function(i, author) {
            var title = '<h3>' + author.name + '</h3>';
            var link = 'index.html?author=' + author.id + '#postByAuthorPage';
            itemsContent += '<li><a href="' + link + '" rel="external">' + title + '</a></li>';
        });

        $(element).append(itemsContent);
        $(element).listview("refresh");
        $.mobile.hidePageLoadingMsg();
    });
}

function loadPostsContent(element, url, callback) {
    $.mobile.showPageLoadingMsg();
    $.getJSON( url, function( data ) {
        $(element).empty();

        callback(data);

        var itemsContent = '';
        $.each(data.posts, function(i, post) {
            var title = '<h3>' + post.title_plain + '</h3>';
            var subtitle = '<p><em>' + post.date.substr(0, 10) + ' - ' + post.author.name + '</em></p>';
            var link = 'index.html?post=' + post.id + '#postDetailPage';
            var aside = '<p class="ui-li-aside"><em>' + post.date + '</em></p>';
            var bubble = '<span class="ui-li-count">' + post.comment_count + '</span>';
            itemsContent += '<li><a href="' + link + '" rel="external">' + title + subtitle + bubble + '</a></li>';
            /* itemsContent += '<li>' + title + subtitle + aside + bubble + '</li>'; */
        });
        $(element).append(itemsContent);
        $(element).listview("refresh");
        $.mobile.hidePageLoadingMsg();
    });
}

function loadPostDetailContent(url, postId) {

    $.mobile.showPageLoadingMsg();
    $.getJSON( url, function( data ) {

        var post = data.post;

        store('insightTitle', post.title);
        store('insightContent', stripTags(post.content));
        store('insightUrl', post.url);

         /* Set post title */
        $('#postDetailTitle').empty();
        $('#postDetailTitle').append(post.title_plain);


        /* Set author */
        $('#postDetailAuthor').empty();
        $('#postDetailAuthor').append('<a href="index.html?author=' + post.author.id + '#postByAuthorPage" rel="external">' + post.author.name + '</a>');

        /* Show post date */
        $('#postDetailDate').empty();
        $('#postDetailDate').append(post.date.substr(0, 16));


        /* Set categories */
        var categories = '';
        $.each(post.categories, function(i, category) {
            categories += '<a href="index.html?category=' + category.id + '#postByCategoryPage" rel="external">' + category.title + '</a>';
            if (i + 1 < post.categories.length) {
                categories += ', ';
            }
        });
        $('#postCategoriesItems').empty();
        $('#postCategoriesItems').append(categories);


        /* Set tags */
        var tags = '';
        $.each(post.tags, function(i, tag) {
            tags += '<a href="index.html?tag=' + tag.id + '#postByTagPage" rel="external">' + tag.title + '</a>';
            if (i + 1 < post.tags.length) {
                tags += ', ';
            }
        });
        $('#postTagsItems').empty();
        $('#postTagsItems').append(tags);

        /* Set excerpt */
        $('#postExcerptContent').empty();
        $('#postExcerptContent').append(post.excerpt);


        /* Set post comments */
        var itemsContent = '';

        $('#postCommentsCount').empty();
        $('#postCommentsCount').append(post.comments.length);

        $.each(post.comments, function(i, comment) {
            var title = '<p></p><a href="' + comment.url + '" rel="external">' + comment.name + '</a></p>';
            var subtitle = '<p class="postCommentsItemContent"><em>' + decodeHtmlEntities(comment.content) + '</em></p>';
            var aside = '<div class="postCommentsItemAside"><p><em>' + comment.date.substr(0, 10) + '</em></p></div>';
            itemsContent += '<div class="postCommentsItem">' + aside + title + subtitle + '</div>';
        });

        $('#postCommentsList').empty();
        $('#postCommentsList').append(itemsContent);

        $.mobile.hidePageLoadingMsg();
    });
}

function loadInsightContent() {

    var insightTitle = fetch('insightTitle');
    var insightContent = decodeHtmlEntities(fetch('insightContent'));
    var insightUrl = fetch('insightUrl');


    /* Set insight title */
    $('#insightTitle').empty();
    $('#insightTitle').append(insightTitle);

    /* Set insight content */
    $('#insightContent').empty();
    $('#insightContent').append(insightContent);

    /* Set insight url */
    $('#insightUrl').attr("href", insightUrl);
}


function loadLogContent(element) {
    $(element).empty();

    var itemsContent = '';
    $.each(logContent, function(i, log) {
        itemsContent += '<li>' + log + '</li>';
    });
    $(element).append(itemsContent);
    $(element).listview("refresh");
}
