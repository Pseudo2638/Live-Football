// This is a custom directive //
// It is used here to apply show() and hide() effect of jQuery //
// In order to use jQuery wih Angular.js, you have to declare jQuery code seperately and then called on to the element to be displayed on //
// Normal javascript file for jQuery doesn't shows any effect //
myApp.directive('jquery',function(){
    return {
          link: function(scope, element, attribute){

            $(document).ready(function()
            {
              // Hide elements when the view is displayed on which the directive is called //
              $('.block15').hide();
              $('.block16').hide();
              $('.titleMain').hide();

              // These are the onClick functions which are triggered when the particular html element is clicked //
              // Below are few same functions to trigger which element is clicked and act accordingly //
              // Ie; for here, hide() and show() functionality //

              $('.select15').on('click',function()
              {
                // Change font color of 2015 year button //
                $(this).css('color','white');
                // Change font color of 2016 year button //
                $('.select16').css('color','black');
                $('.blockTeamWise').hide();
                $('.block16').hide();
                $('.titleMain').hide();
                $('.titleMain').show(1000); // 1000 = 1 sec //
                $('.block15').show(500);  // 500 = 0.5 sec //
              });

              $('.select16').on('click',function()
              {
                // Change font color of 2016 year button //
                $(this).css('color','white');
                // Change font color of 2015 year button //
                $('.select15').css('color','black');
                $('.blockTeamWise').hide();
                $('.block15').hide();
                $('.titleMain').hide();
                $('.titleMain').show(1000); // 1000 = 1 sec //
                $('.block16').show(500); // 500 = 0.5 sec //
              });

            });

          },

    };

});
