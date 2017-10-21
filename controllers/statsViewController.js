
// This the controller for the stats view, //
// Here, $http,$scope are passed as an inbuilt directive to use corresponding feature //
// But, FootballScorecardService is a service method which has all the API calls using '$http' //
myApp.controller('statsViewController',['$http','$scope','FootballScorecardService',function($http,$scope,FootballScorecardService){

  // Declaring ng-repeat values as array to hold the iterated data //
  this.statsTables = [];
  this.statsTables2 = [];
  this.rankings2 = [];
  this.rankings = [];

  // Store current context for future reference //
  var main = this;
  // Function to load stats data //
  this.loadStatsView = function()
  {
    FootballScorecardService.getRawResponse2015()
       .then(function successCallback(response){

         var data = response.data.rounds; // Getting Response //
         var matches = new Array();
         console.log(data);

         for (var i = 0; i < data.length; i++) {
            matches[i] = data[i].matches; // Further Iterating Inside the JSON for particular data //
         }

         console.log(matches);

         var whole = new Array() ;

         // Below loop is used to make the recieved 2D Array from the response into 1D Array which here makes task easier //
         for (var i = 0; i < matches.length; i++) {
            var tryMe = matches[i]; // Storing current element //
            for (var j = 0; j < tryMe.length; j++) {
              whole.push(tryMe[j]); // Pushes current data to new array //
            }
          }

        console.log(whole);

        // To store all teams goals match by match //
        var teamOneData = [];
        var teamTwoData = [];

        for (var i = 0; i < whole.length; i++) {

          // Pushes data in key value pair format into the array //
          // Format : ({ key1: value1,
          //            key2: value2 })

          teamOneData.push({
            name: whole[i].team1.name,
            score: whole[i].score1
          });
          teamTwoData.push({
            name: whole[i].team2.name,
            score: whole[i].score2
          });
        }

        console.log(teamOneData);
        console.log(teamTwoData);

        // Combine the team1 and team2 array with scores into one array //
        var totalData = teamOneData.concat(teamTwoData);
        console.log(totalData);


        var result = [];

        // This is a 'forEach' function which is used to iterate over an array of Objects //
        // Here, it is used to find duplicates and if found, increment the score by adding the duplicate element's score to it //
        totalData.forEach(function (a) {
            // If, duplicate is present //
            if (!this[a.name])
            {
            // Storing one for all duplicates and incrementing data to it by increasing score accordingly //
            // Here we create it as a key value pair //
            this[a.name] = { name: a.name, score: 0 };
            result.push(this[a.name]); // We push the key value created with current name and score as 0 to a new array //
            }
         // We increment or add the score by the duplicate's score and hence which gives us the total score for each team in a new array //
         // ie: we push data to the new array where current team name is '0' score if duplicates are found //
         //     and if duplicates are found, add the duplicate's score to the '0' score of the new array //
         this[a.name].score += a.score;
        },
        Object.create(null));

        console.log(result);

        // To sort the array object in ascending order //
        var sortedResult = result.sort(function(a,b){return a.score-b.score});
        console.log(sortedResult);



        // To get an array consisting of rank,name and score //
        var rankings = [];

        // Note: Here, decremental 'for' loop is used in order to get the reverse data for displaying ranking //
        // as, the sorted array is in ascending order //
        for (var i = sortedResult.length -1 ; i >=0 ; i--) {
          // Pushing as key value pair in new array //
          rankings.push({
            id: -(i - 20) , // To get the rank in reverse order (ie: instead of 20,19,18,17,16 ... we needed 1,2,3,4,5,6,7 ...) //
            name: sortedResult[i].name, // To get the team's name //
            goals: sortedResult[i].score // To get the team's score //
          });
        }

        main.rankings = rankings; // Passing data to html element for displaying rank array //



        // START : This is for the Team-Wise section on the stats-view-page //

        var teamFlow = []; // To store all winnings data //
        for (var i = 0; i < whole.length; i++) {
          if(whole[i].score1 > whole[i].score2) // If score1 is greater than score2 //
          {
            teamFlow.push({
              name : whole[i].team1.name, // Push Team1 name in new array //
              win : 1 // Push win key with value as 1 in new array //
            });
          }
          else
          {
            teamFlow.push({
              name : whole[i].team2.name, // Push Team2 name in new array //
              win : 1 // Push win key with value as 1 in new array //
            });

          }
        }

        console.log(teamFlow);

        var dataTeamFlow = []; // To hold iterated data for team-wise //

        // This is a 'forEach' function which is used to iterate over an array of Objects //
        // Here, it is used to find duplicates and if found, increment the score by adding the duplicate element's score to it //
        teamFlow.forEach(function (a) {
            if (!this[a.name]) {

            // Storing one for all duplicates and incrementing data to it by increasing score accordingly //
            // Here we create it as a key value pair //
            this[a.name] = { name: a.name, win: 0 };
            dataTeamFlow.push(this[a.name]); // We push the key value created with current name and score as 0 to a new array //
            }

         // We increment or add the score by the duplicate's score and hence which gives us the total score for each team in a new array //
         // ie: we push data to the new array where current team name is '0' score if duplicates are found //
         //     and if duplicates are found, add the duplicate's score to the '0' score of the new array //
         this[a.name].win += a.win;
        },
        Object.create(null));

        console.log(dataTeamFlow);

        var finalteamFlow = []; // To hold the main team-wise data //
        for (var i = 0; i < dataTeamFlow.length; i++) {
          finalteamFlow.push({
            name: dataTeamFlow[i].name , // Push name in new array //
            totalMatches : 38 , // Push 38 as total matches in all because, 38 is the constant for all teams //
            wins : dataTeamFlow[i].win , // Push wins in new array //
            loss : 38 - dataTeamFlow[i].win // Calulate loss and push loss in new array //
          });
        }


        var newTeamFlow = [];
        // Sorting teams in descending order //
        finalteamFlow.sort(function(a,b){ return b.wins - a.wins ;});

        // Id id as rank and storing it with the other key value pairs //
        for (var i = 0; i < finalteamFlow.length; i++) {
          newTeamFlow.push({
            id:i+1,
            name: finalteamFlow[i].name,
            totalMatches: finalteamFlow[i].totalMatches,
            wins: finalteamFlow[i].wins,
            loss: finalteamFlow[i].loss
          });

        }

        console.log(newTeamFlow);

        main.statsTables = newTeamFlow; // Pasiing data to ng-repeat table.
         // Passing data to the html element //


        // END of Team-Wise //

       }, function errorCallback(response){
            console.log(response);
            alert(response);
       });


       FootballScorecardService.getRawResponse2016()
          .then(function successCallback(response){

            var data = response.data.rounds; // Getting Response //
            var matches = new Array();
            console.log(data);

            for (var i = 0; i < data.length; i++) {
               matches[i] = data[i].matches; // Further Iterating Inside the JSON for particular data //
            }

            console.log(matches);

            var whole = new Array() ;

            // Below loop is used to make the recieved 2D Array from the response into 1D Array which here makes task easier //
            for (var i = 0; i < matches.length; i++) {
               var tryMe = matches[i]; // Storing current element //
               for (var j = 0; j < tryMe.length; j++) {
                 whole.push(tryMe[j]); // Pushes current data to new array //
               }
             }

           console.log(whole);

           // To store all teams goals match by match //
           var teamOneData = [];
           var teamTwoData = [];

           for (var i = 0; i < whole.length; i++) {

             // Pushes data in key value pair format into the array //
             // Format : ({ key1: value1,
             //            key2: value2 })

             teamOneData.push({
               name: whole[i].team1.name,
               score: whole[i].score1
             });
             teamTwoData.push({
               name: whole[i].team2.name,
               score: whole[i].score2
             });
           }

           console.log(teamOneData);
           console.log(teamTwoData);

           // Combine the team1 and team2 array with scores into one array //
           var totalData = teamOneData.concat(teamTwoData);
           console.log(totalData);


           var result = [];

           // This is a 'forEach' function which is used to iterate over an array of Objects //
           // Here, it is used to find duplicates and if found, increment the score by adding the duplicate element's score to it //
           totalData.forEach(function (a) {
               // If, duplicate is present //
               if (!this[a.name])
               {
               // Storing one for all duplicates and incrementing data to it by increasing score accordingly //
               // Here we create it as a key value pair //
               this[a.name] = { name: a.name, score: 0 };
               result.push(this[a.name]); // We push the key value created with current name and score as 0 to a new array //
               }
            // We increment or add the score by the duplicate's score and hence which gives us the total score for each team in a new array //
            // ie: we push data to the new array where current team name is '0' score if duplicates are found //
            //     and if duplicates are found, add the duplicate's score to the '0' score of the new array //
            this[a.name].score += a.score;
           },
           Object.create(null));

           console.log(result);

           // To sort the array object in ascending order //
           var sortedResult = result.sort(function(a,b){return a.score-b.score});
           console.log(sortedResult);



           // To get an array consisting of rank,name and score //
           var rankings = [];

           // Note: Here, decremental 'for' loop is used in order to get the reverse data for displaying ranking //
           // as, the sorted array is in ascending order //
           for (var i = sortedResult.length -1 ; i >=0 ; i--) {
             // Pushing as key value pair in new array //
             rankings.push({
               id: -(i - 20) , // To get the rank in reverse order (ie: instead of 20,19,18,17,16 ... we needed 1,2,3,4,5,6,7 ...) //
               name: sortedResult[i].name, // To get the team's name //
               goals: sortedResult[i].score // To get the team's score //
             });
           }

           main.rankings2 = rankings; // Passing data to html element for displaying rank array //



           // START : This is for the Team-Wise section on the stats-view-page //

           var teamFlow = []; // To store all winnings data //
           for (var i = 0; i < whole.length; i++) {
             if(whole[i].score1 > whole[i].score2) // If score1 is greater than score2 //
             {
               teamFlow.push({
                 name : whole[i].team1.name, // Push Team1 name in new array //
                 win : 1 // Push win key with value as 1 in new array //
               });
             }
             else
             {
               teamFlow.push({
                 name : whole[i].team2.name, // Push Team2 name in new array //
                 win : 1 // Push win key with value as 1 in new array //
               });

             }
           }

           console.log(teamFlow);

           var dataTeamFlow = []; // To hold iterated data for team-wise //

           // This is a 'forEach' function which is used to iterate over an array of Objects //
           // Here, it is used to find duplicates and if found, increment the score by adding the duplicate element's score to it //
           teamFlow.forEach(function (a) {
               if (!this[a.name]) {

               // Storing one for all duplicates and incrementing data to it by increasing score accordingly //
               // Here we create it as a key value pair //
               this[a.name] = { name: a.name, win: 0 };
               dataTeamFlow.push(this[a.name]); // We push the key value created with current name and score as 0 to a new array //
               }

            // We increment or add the score by the duplicate's score and hence which gives us the total score for each team in a new array //
            // ie: we push data to the new array where current team name is '0' score if duplicates are found //
            //     and if duplicates are found, add the duplicate's score to the '0' score of the new array //
            this[a.name].win += a.win;
           },
           Object.create(null));

           console.log(dataTeamFlow);

           var finalteamFlow = []; // To hold the main team-wise data //
           for (var i = 0; i < dataTeamFlow.length; i++) {
             finalteamFlow.push({
               name: dataTeamFlow[i].name , // Push name in new array //
               totalMatches : 38 , // Push 38 as total matches in all because, 38 is the constant for all teams //
               wins : dataTeamFlow[i].win , // Push wins in new array //
               loss : 38 - dataTeamFlow[i].win // Calulate loss and push loss in new array //
             });
           }


           var newTeamFlow = [];
           // Sorting teams in descending order //
           finalteamFlow.sort(function(a,b){ return b.wins - a.wins ;});

           // Id id as rank and storing it with the other key value pairs //
           for (var i = 0; i < finalteamFlow.length; i++) {
             newTeamFlow.push({
               id:i+1,
               name: finalteamFlow[i].name,
               totalMatches: finalteamFlow[i].totalMatches,
               wins: finalteamFlow[i].wins,
               loss: finalteamFlow[i].loss
             });

           }

           console.log(newTeamFlow);

           main.statsTables2 = newTeamFlow; // Pasiing data to ng-repeat table.
            // Passing data to the html element //


           // END of Team-Wise //

          }, function errorCallback(response){
               console.log(response);
               alert(response);
          });
  }
}]);
