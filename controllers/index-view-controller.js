
// This the controller for the index view, //
// Here, $http,$scope are passed as an inbuilt directive to use corresponding feature //
// But, FootballScorecardService is a service method which has all the API calls using '$http' //

myApp.controller('indexViewController',['$http','$scope','FootballScorecardService','$sce', function($http,$scope,FootballScorecardService,$sce){

this.retriveAllData2016 = function(){

  FootballScorecardService.getRawResponse2016()
     .then(function successCallback(response){
          console.log(response);

          // To get the data requiered for 'ng-repeat' in an array //
          var iteratedData = [];

          // To hold the main data from the json response //
          var mainData = response.data.rounds;

          // Loop for 2D Array //
          for (var i = 0; i < mainData.length; i++) {
            // Holding current row (which is an array) //
            var current = mainData[i].matches;

            // Second loop to iterate through the current row //
             for (var j = 0; j < current.length; j++) {
               // Converting date to another format //
               var takeDate = new Date(current[j].date);
               takeDate.toDateString();

               // Storing iterated items in a new array //
               iteratedData.push({
                 matchday: mainData[i].name,
                 team1: mainData[i].matches[j].team1.name,
                 team2: mainData[i].matches[j].team2.name,
                 score1: mainData[i].matches[j].score1,
                 score2: mainData[i].matches[j].score2,
                 code1: mainData[i].matches[j].team1.code,
                 code2: mainData[i].matches[j].team2.code,
                 key1: mainData[i].matches[j].team1.key,
                 key2: mainData[i].matches[j].team2.key,
                 date: takeDate
               });
             }
          }
          console.log(iteratedData);
          $scope.indexStyles = iteratedData; // Passing data to 'ng-repeat' as array //

          

     },
     // If error in connection //
     function errorCallback(response){
          console.log(response);
          alert(response);
     });

     // Serice method called to get the custom json text file locally //
     // This is been done to make the UI better and to understand the topic better //
     // Including this is not required //
     FootballScorecardService.getPostDetails()
         // If successfull connection //
        .then(function successCallback(response){
             console.log(response.data);
             var mainData = response.data;
             $scope.postDetails = mainData; // Passing data to the ng-repeat of posts block //

        },
        // If error in connection //
        function errorCallback(response){
             console.log(response);
             alert(response);
        });

}

}]);
