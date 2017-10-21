
// This the controller for the single data view, //
// Here, $http,$scope,$routeParams are passed as an inbuilt directive to use corresponding feature //
myApp.controller('singleViewController',['$http','$scope','$routeParams',function($http,$scope,$routeParams){

  // Store the parameters recieved from the html which was passed in the url //
  // Please note, we need to declare '$routeParams' as a dependecy to store the parameters recieved in the url //
  this.dateNew = $routeParams.date;
  this.team1New = $routeParams.team1;
  this.team2New = $routeParams.team2;
  this.code1New = $routeParams.code1;
  this.code2New = $routeParams.code2;
  this.key1New = $routeParams.key1;
  this.key2New = $routeParams.key2;
  this.matchdayNew = $routeParams.matchday;
  this.score1New = $routeParams.score1;
  this.score2New = $routeParams.score2;

    // Get current context //
  var main = this;

  // Function to pass post data to html //
  this.showSingleView = function()
  {
      // Passing the stored parameters from url to the html elements //
      main.dateCurrent = this.dateNew;
      main.team1Current = this.team1New;
      main.team2Current = this.team2New;
      main.code1Current = this.code1New;
      main.code2Current = this.code2New;
      main.key1Current = this.key1New;
      main.key2Current = this.key2New;
      main.matchdayCurrent = this.matchdayNew;
      main.score1Current = this.score1New;
      main.score2Current = this.score2New;
  }
}]);
