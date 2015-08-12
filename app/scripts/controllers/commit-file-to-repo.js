'use strict';

SwaggerEditor.controller('CommitFileToRepoCtrl', function CommitFileToRepoCtrl($scope,
  $modalInstance, $rootScope, $localStorage, GitRepo, Storage, Analytics, defaults) {
  var results;

  $scope.repoFileName = $rootScope.repoFileName;
  $scope.committer = $rootScope.committer;
  $scope.commitMessage = '';

  $scope.commit = function (commitmsg, committer) {
    $localStorage.committer = committer;
    $rootScope.committer = committer;
    GitRepo.commitFileToRepo($scope.repoFileName, commitmsg, committer).then(function(response) {
      $modalInstance.close();
      Storage.save('progress', 'success-file-commit-to-repo');
    }, $modalInstance.close());
    Analytics.sendEvent('save-commit-to-repo', 'save-commit-to-repo:' + repoFileName);
  };

  $scope.isCommitDataEntered = function() {
    var commitMessageLength = $scope.commitMessage.length;
    var committerLength = $scope.committer.length;
    var retvalue = commitMessageLength > 0 && committerLength > 0; 
    return !retvalue;
  }

  $scope.cancel = $modalInstance.close;
});
