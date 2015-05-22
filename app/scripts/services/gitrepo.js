'use strict';

/*
 * File loader service to load file from a URL or string
*/
SwaggerEditor.service('GitRepo', function GitRepo($http, defaults) {
	this.listFilesInRepo = function(callback) {
	    return $http({
	      method: 'GET',
	      url: defaults.saveRepoUrl,
	      headers: {
	        accept: 'application/json'
	      }
	    }).then(function(response) {callback(response)});
	}

	this.saveFileToRepo = function(repoFileName, editorValue) {
		var url = defaults.saveRepoUrl + '/' + repoFileName;
		return $http.put(url, editorValue);
	}

	this.commitFile = function(repoFileName, commitMessage) {
		var url = defaults.commitRepoUrl + '/' + repoFileName;

	}
});
