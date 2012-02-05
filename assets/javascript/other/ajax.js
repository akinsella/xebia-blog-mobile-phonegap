
    function getXmlAuthenticated(url, username, password, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            username: username,
            password: password,
            //                  beforeSend: function(jqXHR) {
            //                	jqXHR.setRequestHeader('Authorization', 'Basic ' + base64.encode(username + ':' + password));
            //                  },
            success: successCallback,
            error: errorCallback
        });
    }

    function getXml(url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            //                  beforeSend: function(jqXHR) {
            //                	jqXHR.setRequestHeader('Authorization', 'Basic ' + base64.encode(username + ':' + password));
            //                  },
            success: successCallback,
            error: errorCallback
        });
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

    function getXmlAuthenticatedAndStoreAsJson(storeKey, url, username, password, successCallBack, errorCallback) {
        getXmlAuthenticated(
        url,
        username,
        password, function(data) {
            json = $.xml2json(data);
            store(storeKey, JSON.stringify(json));
            successCallBack(json);
        },
        errorCallback);
    }

    function getXmlAndStoreAsJson(storeKey, url, successCallBack, errorCallback) {
        getXml(
        url, function(data) {
            json = $.xml2json(data);
            store(storeKey, JSON.stringify(json));
            successCallBack(json);
        },
        errorCallback);
    }

    function defaultAjaxErrorCallback(jqXHR, textStatus, errorThrown) {
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + jqXHR.responseText);
        var err = eval("(" + jqXHR.responseText + ")");
        alert("Error thrown: " + errorThrown + ", status: " + textStatus + ", text: " + err.message);
    }
