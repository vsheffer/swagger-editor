'use strict';

window.SwaggerEditor = angular.module('SwaggerEditor', [
  'ngSanitize',
  'ui.router',
  'ui.ace',
  'ui.bootstrap',
  'ngStorage',
  'ngSanitize',
  'jsonFormatter',
  'hc.marked',
  'ui.layout',
  'mohsen1.json-schema-view',
  'mohsen1.schema-form',
  'ngFileUpload'
]).config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, $rootScope, $localStorage) {
      return {
        'response': function(response) {
          var username = response.headers('X-Basic-Auth-Username');
          if (username != null) {
            $localStorage.committer = username;
            $rootScope.commiter = username;
          }

          return response;
        }
      };
    });
  });
