angular.module('App', ['ionic'])
  .config ($stateProvider, $urlRouterProvider)->

    $stateProvider.state 'home',
      url:         '/home'
      controller:  'HomeController'
      templateUrl: 'views/home/home.html'

    # TODO: create an error page that captures the details
    #       of the errors and submits them to us for debugging
    $urlRouterProvider.otherwise('/home')

  .run ($ionicPlatform)->

    $ionicPlatform.ready  ->
      if window.cordova?.plugins?.Keyboard
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      StatusBar.styleDefault() if window.StatusBar
