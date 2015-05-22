'use strict';

SwaggerEditor.controller('SaveFileToRepoCtrl', function SaveFileToRepoCtrl($scope,
  $modalInstance, $rootScope, $localStorage, GitRepo, Storage, Analytics, defaults) {
  var results;

  var repoFileName = $rootScope.repoFileName;

  $scope.save = function (file) {
    GitRepo.saveFileToRepo(file, $rootScope.editorValue).then(function(response) {
      $rootScope.repoFileName = file;
      $localStorage.repoFileName = file;
      $modalInstance.close();
      Storage.save('progress', 'success-file-saved-to-repo');
    }, $modalInstance.close());
    Analytics.sendEvent('save-file-to-repo', 'save-file-to-repo:' + file);
  };


  $scope.cancel = $modalInstance.close;
});
