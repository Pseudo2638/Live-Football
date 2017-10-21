
// This is the '$routeProvider' directive which defines the route and the view to be displayed //
// This has to be declared as a directive in angular module //

myApp.config(['$routeProvider',function($routeProvider){
  $routeProvider
  // Default Page or Home page //
  // This view will load first when the website url is hit //
  // '/' is the one which defines the route to be home page here //
  .when('/',{
    templateUrl : "views/index-view.html" , // Index page view //
    controller : "indexViewController",  // Controller for index view //
    controllerAs : "myIndexView" // Name for index ciew //
  })
  // When the url has 'filter' in the end //
  // Please note, first in when, we define the route name //
  // Then we define the view to be decalred when the route is called //
  // We specify the controller where the functions are executed for the view //
  // Then, we define the name of the controller by which controller is called in the view html //
  .when('/filter',{
    templateUrl : "views/filter-view.html" ,
    controller : "filterViewController",
    controllerAs : "myFilterView"
  })
  // Same goes as the above logic //
  .when('/stats',{
    templateUrl : "views/stats-view.html" ,
    controller : "statsViewController",
    controllerAs : "myStatsView"
  })
  // Same goes as the above logic but //
  // Here, parameters are passed from he html to the url when this route is called //
  // Note, this is used to get the parameters passed in url as data in the controller and store it as a variable //
  // You have to mention '$routeParams' as the directive in the controller to get the parameter values //
  .when('/single/:date/:team1/:team2/:code1/:code2/:key1/:key2/:matchday/:score1/:score2',{
    templateUrl : "views/single-data-view.html" ,
    controller : "singleViewController",
    controllerAs : "mySingleView"
  })
  // Same goes as the above logic //
  .when('/post/:postTitle/:postBody/:postAuthor/:postCreatedDate/:imageSrc',{
    templateUrl : "views/single-post-view.html" ,
    controller : "postViewController",
    controllerAs : "myPostView"
  })
  // If wrong route is called, This is displayed //
  .otherwise({
       template: '<h1> Not Found </h1>'  // If url is mistyped or wrongly configured, it prints not found in the ng-view //
     });
}]);
