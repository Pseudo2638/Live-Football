
// This the controller for the filter view, //
// Here, $http,$scope,$route are passed as an inbuilt directive to use corresponding feature //
// But, FootballScorecardService is a service method which has all the API calls using '$http' //

myApp.controller('filterViewController',['$http','$scope','FootballScorecardService','$route', function($http,$scope,FootballScorecardService,$route){

// Since, in angualar.js, if the same url is called as the browser is on ; the page doesn't loads so, in order to refresh the page this method is used //
//  This is triggered on a button click of refresh on filter div //
$scope.reloadRoute = function() {
   $route.reload();
}

// This function is used to call the API for 2016-17 scores //
this.retriveAllData2016 = function(){

  // Service method's function for making $http request to 2016 api //
  FootballScorecardService.getRawResponse2016()
     // If the connection is successfull //
     .then(function successCallback(response){

          // Response is logged in the console //
          console.log(response);

          $scope.teams2=[]; // For iterating and passing data to the teams dropdown //
          $scope.matchdays2=[]; // For iterating and passing data to the matchday dropdown //
          $scope.filterViews2=[]; // For iterating and passing data to the ng-repeat for 2016 data //

          // To get the current context and store in a variable for future reference //
          var main = this;


          // To hold the main data of the json response //
          var mainData = response.data.rounds;

          // This is used to get all the teams in the json recieved //
          var allTeams = [];

          // Loop to iterate the main data and push the team names in the above array //
          // Since, the json data is a 2D array, we have used 1 inner loop to get the team name //
          for (var i = 0; i < mainData.length; i++) {
            var current = mainData[i].matches;
            for (var j = 0; j < current.length; j++) {
               // Pushes the Current name to the new array //
               allTeams.push(current[j].team1.name);
               allTeams.push(current[j].team2.name);
            }
          }

          console.log(allTeams);

          // To hold uniques team names from the previous array of team names //
          var uniqueNames = [];
          // '$.each()' function which selects each element and provides a method to access each element //
          // It is a sort of 'for' loop //
          // Here, It is used to find the unique values by checking for duplicacy //
          $.each(allTeams, function(i, el){
          if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
          })

          console.log(uniqueNames);

          $scope.teams2 = uniqueNames; // Passing Team data to the dropdown //

          var allMatchdays = []; // To hold all the matchdays held //

          // Loop to get all the matchdays and store it in the above variable //
          for (var i = 0; i < mainData.length; i++) {
            allMatchdays.push(mainData[i].name);
          }

          console.log(allMatchdays);

          // Here, We do this because the api had the Matchday 1 named as something else which was creating a conflict in the program //
          // So, here we change the name to Matchday1 //
          allMatchdays[0] = "Matchday 1"
          $scope.matchdays2 = allMatchdays;
          console.log(mainData);
          mainData[0].name = "Matchday 1";

          // To get the data requiered for 'ng-repeat' in an array //
          var iteratedData = [];

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
          $scope.filterViews2 = iteratedData; // Passing array of data to the 'ng-repeat' element //

          console.log(iteratedData);

          // This function is for the filter dropdown of teams //
          // This functions searches the selected dropdown item in the 'ng-repeat' and if present, only that particular block is passed //
          // Here, team1 and team2 are passed as parameter from 'data-ng-hide' //
          $scope.selectBlockToDisplay = function(team1,team2){
             // Currently sets all blocks to false //
             var selectBlockToDisplay = false;
             // Searches for the dropdown item that if it is equal to any item in the 'ng-repeat' blocks //
             angular.forEach($scope.activatedBlockTeam, function(blockTeam){
                if(blockTeam.team1 == team1 || blockTeam.team2 == team2 )
                {
                  selectBlockToDisplay = true;
                }
             });

          return selectBlockToDisplay;
          }

          // Filter function for matchday dropdown//
          $scope.selectBlockToDisplayMatchday = function(matchday){
             var selectBlockToDisplayMatchday = false;
             angular.forEach($scope.activatedBlockMatchday, function(blockMatchday){
                if(blockMatchday.matchday == matchday)
                {
                  selectBlockToDisplayMatchday = true;
                }
             });

          return selectBlockToDisplayMatchday;
          }

          // Filter function for date input //
          $scope.selectBlockToDisplayDate = function(date){
             var selectBlockToDisplayDate = false;
             angular.forEach($scope.activatedBlockDate, function(blockDate){
                if(blockDate.date == fullDate)
                {
                  console.log(blockDate.date);
                  console.log(fullDate);
                  selectBlockToDisplayDate = true;
                }
             });
           return selectBlockToDisplayDate;

          }


     },
     // If error in connection //
     function errorCallback(response){
          console.log(response);
          // Show error response //
          alert(response);
     });
}


// Below goes the same logic as above
// The only difference is of the api's which is delared in the services method //
// This is 2015 API function //
this.retriveAllData2015 = function(){

  FootballScorecardService.getRawResponse2015()
     .then(function successCallback(response){
          console.log(response);
          $scope.teams=[];
          $scope.matchdays=[];

          $scope.filterViews=[];

          var main = this;

          var mainData = response.data.rounds;

          var allTeams = [];

          for (var i = 0; i < mainData.length; i++) {
            var current = mainData[i].matches;
            for (var j = 0; j < current.length; j++) {
               allTeams.push(current[j].team1.name);
               allTeams.push(current[j].team2.name);
            }
          }

          console.log(allTeams);
          var uniqueNames = [];
          $.each(allTeams, function(i, el){
          if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
          })

          console.log(uniqueNames);

          $scope.teams = uniqueNames;
          var allMatchdays = [];
          for (var i = 0; i < mainData.length; i++) {
            allMatchdays.push(mainData[i].name);
          }
          console.log(allMatchdays);
          allMatchdays[0] = "Matchday 1"
          $scope.matchdays = allMatchdays;

          console.log(mainData);
          mainData[0].name = "Matchday 1";

          var iteratedData = [];

          for (var i = 0; i < mainData.length; i++) {
            var current = mainData[i].matches;
             for (var j = 0; j < current.length; j++) {

               var takeDate = new Date(current[j].date);
               takeDate.toDateString();
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
          $scope.filterViews = iteratedData;

          console.log(iteratedData);

          $scope.selectBlockToDisplay = function(team1,team2){
             var selectBlockToDisplay = false;
             angular.forEach($scope.activatedBlockTeam, function(blockTeam){
                if(blockTeam.team1 == team1 || blockTeam.team2 == team2 )
                {
                  selectBlockToDisplay = true;
                }
             });

          return selectBlockToDisplay;
          }

          $scope.selectBlockToDisplayMatchday = function(matchday){
             var selectBlockToDisplayMatchday = false;
             angular.forEach($scope.activatedBlockMatchday, function(blockMatchday){
                if(blockMatchday.matchday == matchday)
                {
                  selectBlockToDisplayMatchday = true;
                }
             });

          return selectBlockToDisplayMatchday;
          }

          $scope.selectBlockToDisplayDate = function(date){
             var selectBlockToDisplayDate = false;
             angular.forEach($scope.activatedBlockDate, function(blockDate){
                if(blockDate.date == fullDate)
                {
                  console.log(blockDate.date);
                  console.log(fullDate);
                  selectBlockToDisplayDate = true;
                }
             });
           return selectBlockToDisplayDate;

          }


     }, function errorCallback(response){
          console.log(response);
          alert(response);
     });
}

}]);
