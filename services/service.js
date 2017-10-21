// This is the service method of angular.js //
// In angular.js, our main aim is to simplify the procedure and provide dynamic nature to the website //
// In order to make api call, we make Service method which has functions in itself according to different api's to interact with //
// Please note, you have to pass the service name to the controller in order to use the service's functions //
myApp.service('FootballScorecardService', function ($http){

    // 2016-17 API //
    this.baseUrl2016 = "https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json";
    // 2015-16 API //
    this.baseUrl2015 = "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json";

    // Function for 2016-17 Year Api to get the response through $http request //
    this.getRawResponse2016 = function()
    {
      return $http.get(this.baseUrl2016);
    }

    // Function for 2015-16 Year Api to get the response through $http request //
    this.getRawResponse2015 = function()
    {
      return $http.get(this.baseUrl2015);
    }

    // Function for Post Sections to get/read the local custom json file //
    // Note, making posts is not compulsary //
    // It is here done for UI and Educational causes //
    this.getPostDetails = function()
    {
      return $http.get("custom-json/custom-json.txt");
    }


});
