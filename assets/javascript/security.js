
	function enableCrossDomainAjaxRequestsOnFirefox() {
	    if (typeof netscape!="undefined") {
	        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
	    }
	}

