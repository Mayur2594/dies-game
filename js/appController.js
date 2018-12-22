var App = angular.module('App', []);
App.controller('AppController',function($scope,$window){

  $scope.membersList =[{}];
 

 


    $scope.addNewRoe = function()
    {
      if($scope.membersList.length < 20)
      {
        $scope.membersList.push({})
      }
    };
    $scope.RemoveRow = function(index)
    {
      $scope.membersList.splice(index,1);
    };


$scope.SearchWinner = function(resultnumber)
{
  $scope.resultednumber = resultnumber;
  $scope.result = 'And it`s Number......: '+resultnumber;
  $scope.winnermenmber = [];
  $scope.membersList.map((value) =>{
      if(value.number === String(resultnumber))
      {
        $scope.winnermenmber.push(value);
      }
  });
  if($scope.winnermenmber.length <= 0)
  {
	  responsiveVoice.speak('No one won this round.');
    Swal({
      type: 'error',
      title: 'Oops...!',
      text: 'No one won this round.',
    })
  }
  else
  {
    $scope.winnername =  'CONGRATULATIONS '+$scope.winnermenmber[0].membername+' \n \n \n \n \n \n \n \n YOU ARE THE WINNER!!!';
	
	responsiveVoice.speak(String($scope.winnername+" and thank you to all for participating in this game"));
	
	
    $('.demo').fireworks({ sound: true, opacity: 0.9, width: '100%', height: '100%' });

   
  }
};

$scope.CheckNumberValidation = function(number,indx)
{
  if(number > 20 || number <= 0)
  {
    Swal({
      type: 'error',
      title: 'Oops...',
      text: 'Number should be between 1 to 20',
    })
    $scope.membersList[indx].number = '';  
  }
 else
  {
    $scope.membersList.map((value,index) =>{
      if(value.number === number && index != indx)
      {
        Swal({
          type: 'error',
          title: 'Oops...',
          text: 'Number already choosen by someone else, Choose another number',
        })
          $scope.membersList[indx].number = '';  
      }
  });
  }
};

  var $die = $('.die'),
      sides = 20,
      initialSide = 1,
      lastFace,
      timeoutId,
      transitionDuration = 500,
      animationDuration = 6000;

    $('ul > li > a').click(function () {
      reset();
      rollTo($(this).attr('href'));

      return false;
    });

    function randomFace() {
      var face = Math.floor(Math.random() * sides) + initialSide;
      lastFace = face == lastFace ? randomFace() : face;
      return face;
    }

    function rollTo(face) {
      clearTimeout(timeoutId);
      $scope.SearchWinner(face);
      $scope.$apply();
      $('#' + face).addClass('result');
      $('ul > li > a').removeClass('active');
      $('[href=' + face + ']').addClass('active');

      $die.attr('data-face', face);
    }

    function reset() {
      $die.attr('data-face', null).removeClass('rolling');
    }

    $('.randomize, .die').click(function () {
     
      clearInterval(welcomsound);
      responsiveVoice.speak(String("IP team welcomes all the participents.\n\n this round will start shortly.\n\n\n all the best for all the participents."));
     var welcomsound = setTimeout(function () {
        $die.addClass('rolling');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        $die.removeClass('rolling');

        rollTo(randomFace());
      }, animationDuration);
    }, 7500);
      return false;
    });

});
