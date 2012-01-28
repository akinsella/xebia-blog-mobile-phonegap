
// ******************************************************************************
// * Utils functions
// ******************************************************************************

    function linkify(inputText) {
        //URLs starting with http://, https://, or ftp://
        var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

        //URLs starting with www. (without // before it, or it'd re-link the ones done above)
        var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

        //Change email addresses to mailto:: links
        var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
        var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    }

    function decodeHtmlEntities(encodedContent) {
        var decodedContent = $("<div/>").html(encodedContent).text();

        return decodedContent;
    }

    function stripTags(content) {

        var result = content.replace(/(<([^>]+)>)/ig,"").replace(/\r\n/g, '<br>').replace(/\r/g, '<br>').replace(/\n/g, '<br>');

        return linkify(result);
    }

    function sortAuthorByName(author1, author2) {
         return author1.name > author2.name ? 1 : -1;
    }

    function sortTagByName(tag1, tag2) {
         return tag1.name > tag2.name ? 1 : -1;
    }

    function sortCategoryByName(cat1, cat2) {
         return cat1.name > cat2.name ? 1 : -1;
    }

    function fixLinkIssue() {
        $('[data-role=content] a').addClass("ui-link");
    }

    function getParameterByName( name ) {
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" );
        var results = regex.exec( window.location.href );
        if( results == null ) {
            return "";
        }
        else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }

    function getFullUrl(relativeUrl) {
        return JSON_API_BASE_URL + relativeUrl;
    }

    function getJson(url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            //                  beforeSend: function(jqXHR) {
            //                	jqXHR.setRequestHeader('Authorization', 'Basic ' + base64.encode(username + ':' + password));
            //                  },
            success: successCallback,
            error: errorCallback
        });
    }

    function defaultAjaxErrorCallback(jqXHR, textStatus, errorThrown) {
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + jqXHR.responseText);
        var err = eval("(" + jqXHR.responseText + ")");
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + err.message);
    }

    function fetch(key) {
        return localStorage.getItem(key);
    }

    function store(key, content) {
        return localStorage.setItem(key, content);
    }
