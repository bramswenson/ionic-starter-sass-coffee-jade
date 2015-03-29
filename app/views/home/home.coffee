angular.module('App')
  .controller 'HomeController', ($scope)->
    $scope.content =
      heading: 'App Home'
      tagline: 'Here is the home screen'
