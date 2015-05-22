'use strict';

SwaggerEditor.controller('LoadFromRepoCtrl', function LoadFromRepoCtrl($scope,
  $modalInstance, $rootScope, $localStorage, GitRepo, Storage, FileLoader, ASTManager, Analytics, defaults) {
  var results;

  GitRepo.listFilesInRepo(function(response) {
  	$scope.files = response.data.fileList;	
    $scope.selectedFile = $scope.files[0];
  });

  $scope.open = function (file) {
  	$rootScope.repoFileName = file;
  	$localStorage.repoFileName = file;
  	var url = defaults.saveRepoUrl + '/' + file;
    FileLoader.loadFromUrl(url).then(function (value) {
      Storage.save('yaml', value);
      ASTManager.refresh(value);
      $rootScope.editorValue = value;
      $modalInstance.close();
    }, $modalInstance.close);

    Analytics.sendEvent('load-from-repo', 'load-from-repo:' + file);
  };


  $scope.cancel = $modalInstance.close;
});
