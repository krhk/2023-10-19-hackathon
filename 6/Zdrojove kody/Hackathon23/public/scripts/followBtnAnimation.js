$(document).ready(function(){				

    $("#clubFollow").click(function(){
      if ($("#clubFollow").text() == "Follow"){
        // *** State Change: To Following ***      
        // We want the button to squish (or shrink) by 10px as a reaction to the click and for it to last 100ms    
        $("#clubFollow").animate({ width: '-=10px' }, 100, 'easeInCubic', function () {});
        
        // then now we want the button to expand out to it's full state
        // The left translation is to keep the button centred with it's longer width
        $("#clubFollow").animate({ width: '+=45px', left: '-=15px' }, 600, 'easeInOutBack', function () { 
          $("#clubFollow").css("color", "#fff");
          $("#clubFollow").text("Following");
  
          // Animate the background transition from white to green. Using JQuery Color
          $("#clubFollow").animate({
            backgroundColor: "#2EB82E",
            borderColor: "#2EB82E"
          }, 1000 );
        });
      }else{
        
        // *** State Change: Unfollow ***     
        // Change the button back to it's original state
        $("#clubFollow").animate({ width: '-=25px', left: '+=15px' }, 600, 'easeInOutBack', function () { 
          $("#clubFollow").text("Follow");
          $("#clubFollow").css("color", "#3399FF");
          $("#clubFollow").css("background-color", "#ffffff");
          $("#clubFollow").css("border-color", "#3399FF");
        });
      }
    }); 
  });