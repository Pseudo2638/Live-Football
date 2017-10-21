
// This the controller for the post view, //
// Here, $http,$scope,$routeParams are passed as an inbuilt directive to use corresponding feature //
// But, FootballScorecardService is a service method which has all the API calls using '$http' //

myApp.controller('postViewController',['$http','$scope','$routeParams','FootballScorecardService', function ($http,$scope,$routeParams,FootballScorecardService){

  // Store the parameters recieved from the html which was passed in the url //
  // Please note, we need to declare '$routeParams' as a dependecy to store the parameters recieved in the url //
  this.postTitleData = $routeParams.postTitle;
  this.postBodyData = $routeParams.postBody;
  this.postAuthorData = $routeParams.postAuthor;
  this.imageSrcData = $routeParams.imageSrc;
  this.postCreatedDateData = $routeParams.postCreatedDate;

  // Get current context //
  var main = this;

  // Function to pass post data to html //
  this.getPostData = function()
  {
    // Passing the stored parameters from url to the html elements //
    main.postCreatedDateView= this.postCreatedDateData;
    main.postTitleView = this.postTitleData;
    main.postBodyView= this.postBodyData;
    main.postAuthorView= this.postAuthorData;
    main.imageSrcView= this.imageSrcData;
  }
}]);
