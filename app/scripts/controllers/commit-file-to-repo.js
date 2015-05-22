'use strict';

SwaggerEditor.controller('CommitFileToRepoCtrl', function CommitFileToRepoCtrl($scope,
  $modalInstance, $rootScope, $localStorage, GitRepo, Storage, Analytics, defaults) {
  var results;

  $scope.repoFileName = $rootScope.repoFileName;
  $scope.commitMessage = '';

  $scope.commit = function (commitmsg) {
    GitRepo.commitFileToRepo($scope.repoFileName, commitmsg).then(function(response) {
      $modalInstance.close();
      Storage.save('progress', 'success-file-commit-to-repo');
    }, $modalInstance.close());
    Analytics.sendEvent('save-commit-to-repo', 'save-commit-to-repo:' + repoFileName);
  };

  $scope.isCommitMessageEntered = function() {
  	return $scope.commitMessage.length > 0;
  }

  $scope.cancel = $modalInstance.close;
});
