/*
    Le Baron88 - June 2019
*/

$(document).ready(function(){
/*------------------Make sticky nav----------------------*/
  $('.js__save_the_date').waypoint(function(direction){
      if(direction == "down"){
        $('nav').addClass('sticky');
      }else{
        $('nav').removeClass('sticky');
      }
  }, {
      offset: '60px;'
  }) ;
/*------------------Navigation----------------------*/
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
/*------------------Animation on scroll----------------------*/ 
$('.js__wp_1').waypoint(function(direction){
    $('.js__wp_1').addClass('animated fadeIn');
},{
    offset: '60%'
});
$('.js__wp_2').waypoint(function(direction){
    $('.js__wp_2').addClass('animated fadeIn');
},{
    offset: '60%'
});
$('.js__wp_3').waypoint(function(direction){
    $('.js__wp_3').addClass('animated fadeIn');
},{
    offset: '60%'
});
/*------------------Mobile Navigation----------------------*/ 
 $('.js__nav_icon').click(function(){
     var nav = $('.js__main_nav');
     var icon = $('#icon');
      if(icon.hasClass('ion-ios-menu')){
          icon.addClass('ion-ios-close');
          icon.removeClass('ion-ios-menu');
          nav.show(500);
      }else{
          icon.addClass('ion-ios-menu');
          icon.removeClass('ion-ios-close');
          nav.hide(500);
      }
    });
});
// Make sure on screen resize the nav bar still displays
$(window).resize(function() {
  var nav = $('.js__main_nav');
  var icon = $('#icon');
  if($(window).width() > 767) {
    nav.show();
  }
  else if($(window).width() <= 767){
    if(icon.hasClass('ion-ios-menu')){
      nav.hide()
    }
    else{
      icon.addClass('ion-ios-menu');
      icon.removeClass('ion-ios-close');
    }
  }
});
$('.js__main_nav').click(function(){
  var icon = $('#icon');
  if($(window).width() <= 767){
    $('.js__main_nav').hide(500);
    icon.addClass('ion-ios-menu');
    icon.removeClass('ion-ios-close');
  }
});
/*------------------countdown----------------------*/ 
// Set the date we're counting down to
var weddingDate = new Date("Jul 27, 2019 15:0:0").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = weddingDate - now;

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
  }else {
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
  // Display the result in the element with id="demo"
  document.querySelector("#days").innerHTML = days;
  document.querySelector("#hours").innerHTML = hours;
  document.querySelector("#minutes").innerHTML = minutes;
  document.querySelector("#seconds").innerHTML = seconds;

}, 1000);
/*------------------Check Guests----------------------*/ 
//Load data from the json file
var xhttp = new XMLHttpRequest();
var json_data = [];
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		// Typical action to be performed when the document is ready
		json_data = JSON.parse(xhttp.responseText);
    console.log("guests's data loaded successfully");
	}
	else{
		console.log("Data not ready");
	}
};
xhttp.open("GET", "data/data.json", true);
xhttp.send();
//function to retrieve guest data
document.querySelector("#guest_check").addEventListener('click', function() {
    let code = document.querySelector("#guest_code");
    let guest = "";
    if (guest = json_data.find(obj => obj.CODE === code.value.toUpperCase())){
      let text = `Salut <strong> ${guest.Names} </strong>, vous serez sur la table <strong> ${guest.Table}</strong>.<br>Pour un autre invité, Entrez le code se trouvant sur son invitation.`;
      document.querySelector("#guest_data").innerHTML = text;
    }
    else {
      let text = "Malheureusement nous n'arrivons pas à retrouver ce code,";
      text += "<br>Veuillez réessayer en entrant le code sur votre invitation.";
      document.querySelector("#guest_data").innerHTML = text;
    }
});
/*------------------Launch zoom gallery----------------------*/ 
window.onload = function() {
  zoomwall.create(document.getElementById('gallery'));
};